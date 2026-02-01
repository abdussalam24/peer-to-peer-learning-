require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const viewUsers = async () => {
    try {
        console.log('Connecting to MongoDB...');
        // Reuse the same connection logic as server.js to ensure we hit the right DB (likely in-memory or local)
        // Since we can't easily hook into the running in-memory instance from a separate process if it's strictly in-memory per process, 
        // this script might only work if we are connected to Local or Atlas.
        // However, the user is likely on the in-memory fallback since Atlas failed.
        // If it's in-memory, a separate process won't see the data.

        // Let's try connecting to the URI in .env first (Atlas)
        // If that fails, we can't show the in-memory data of the *running* server process from *this* process.
        // BUT, I can try to connect to the local fallback if that's what's running.

        // Actually, if the server is running an In-Memory DB, that DB resides in the memory of the `node server.js` process. 
        // A separate `node view_users.js` process CANNOT access it.

        // SO, instead of a separate script, I should create a TEMPORARY ROUTE in the server to dump the DB.
        // That is the only way to see the data of the *running* in-memory application.

        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/p2p-learning');
        console.log('Connected. Fetching users...');

        const users = await User.find({});
        console.log('\n--- Current Users in Database ---');
        users.forEach(u => {
            console.log(`\nName: ${u.name}`);
            console.log(`Email: ${u.email}`);
            console.log(`Role: ${u.role}`);
            console.log(`Password (HASHED): ${u.password}`);
        });
        console.log('\n---------------------------------');

        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

viewUsers();
