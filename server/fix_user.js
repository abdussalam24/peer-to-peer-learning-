require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const fixUser = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected!');

        const email = 'sarah.johnson@university.edu';
        let user = await User.findOne({ email });

        if (user) {
            console.log('User found. Updating password...');
            user.password = await bcrypt.hash('password123', 10);
            await user.save();
            console.log('Password updated to: password123');
        } else {
            console.log('User NOT found. Creating user...');
            const hashedPassword = await bcrypt.hash('password123', 10);
            user = new User({
                name: 'Sarah Johnson',
                email: email,
                password: hashedPassword,
                role: 'mentor',
                gender: 'female',
                isVerified: true
            });
            await user.save();
            console.log('User created successfully!');
        }

        console.log('Verifying...');
        const verifyUser = await User.findOne({ email });
        console.log('Verification found user:', verifyUser.email);

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

fixUser();
