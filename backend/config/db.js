const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.error(`💡 Make sure MongoDB is running or update MONGODB_URI in .env file`);
        // Don't exit process - allow server to run without DB for now
        // process.exit(1);
    }
};

module.exports = connectDB;
