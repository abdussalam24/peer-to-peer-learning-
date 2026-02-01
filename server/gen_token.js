const jwt = require('jsonwebtoken');
require('dotenv').config();

const payload = {
    user: {
        id: "65f1a2b3c4d5e6f7a8b9c0d1", // Dummy ID just to see if it hits the null check
        role: "mentor"
    }
};

const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
console.log(token);
