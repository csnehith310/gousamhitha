





SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'ruthvik@blockfortrust.com';


INSERT INTO profiles (id, email, role, created_at)
VALUES (
    'YOUR-USER-ID-HERE',  
    'ruthvik@blockfortrust.com',
    'admin',
    NOW()
)
ON CONFLICT (id) DO UPDATE 
SET role = 'admin', email = 'ruthvik@blockfortrust.com';

SELECT * FROM profiles WHERE email = 'ruthvik@blockfortrust.com';




INSERT INTO profiles (id, email, role, created_at)
SELECT id, email, 'admin', NOW()
FROM auth.users
WHERE email = 'ruthvik@blockfortrust.com'
ON CONFLICT (id) DO UPDATE 
SET role = 'admin';

SELECT p.*, u.email as auth_email
FROM profiles p
JOIN auth.users u ON p.id = u.id
WHERE u.email = 'ruthvik@blockfortrust.com';
