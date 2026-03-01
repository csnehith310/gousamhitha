const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.error(`💡 Make sure MongoDB is running or update MONGO_URI in .env file`);
        // Don't exit process - allow server to run without DB for now
        // process.exit(1);
    }
};

module.exports = connectDB;
