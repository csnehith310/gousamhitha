const db = require('../db');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);



const exchangeCodeForUserInfo = async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ error: 'Authorization code is required' });
        }
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);
        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        res.json({
            success: true,
            user: {
                sub: payload.sub,
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
                email_verified: payload.email_verified
            }
        });
    } catch (error) {
        console.error('Google token exchange error:', error);
        res.status(500).json({ error: 'Failed to authenticate with Google' });
    }
};



const googleSignIn = async (req, res) => {
    try {
        const { email, name, googleId, picture } = req.body;
        if (!email || !googleId) {
            return res.status(400).json({ error: 'Email and Google ID are required' });
        }
        const userResult = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        if (userResult.rows.length === 0) {
            return res.status(404).json({ 
                error: 'Account not found. Please sign up first.',
                needsSignup: true 
            });
        }
        const user = userResult.rows[0];
        if (!user.google_id) {
            await db.query(
                'UPDATE users SET google_id = $1, picture = $2 WHERE id = $3',
                [googleId, picture, user.id]
            );
        }
        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                name: name
            }
        });
    } catch (error) {
        console.error('Google sign in error:', error);
        res.status(500).json({ error: 'Failed to sign in with Google' });
    }
};



const googleSignUp = async (req, res) => {
    try {
        const { email, name, googleId, picture } = req.body;
        if (!email || !googleId) {
            return res.status(400).json({ error: 'Email and Google ID are required' });
        }
        const existingUser = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ 
                error: 'Account already exists. Please sign in instead.',
                needsSignin: true 
            });
        }
        const result = await db.query(
            'INSERT INTO users (email, password, role, google_id, picture, name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [email, 'GOOGLE_AUTH', 'customer', googleId, picture, name]
        );
        const newUser = result.rows[0];
        res.status(201).json({
            success: true,
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
                name: name
            }
        });
    } catch (error) {
        console.error('Google sign up error:', error);
        res.status(500).json({ error: 'Failed to sign up with Google' });
    }
};
module.exports = {
    exchangeCodeForUserInfo,
    googleSignIn,
    googleSignUp
};
