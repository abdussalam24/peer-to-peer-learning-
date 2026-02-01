require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
    const uri = process.env.MONGO_URI;
    console.log('Testing connection to:', uri);
    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('Successfully connected to MongoDB Atlas!');
        process.exit(0);
    } catch (err) {
        console.error('Connection failed:', err.message);
        process.exit(1);
    }
};

testConnection();
