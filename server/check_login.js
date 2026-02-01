const axios = require('axios');

async function testLogin() {
    try {
        console.log('Testing login for sarahjohnson@university.edu...');
        const res = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'sarahjohnson@university.edu',
            password: 'password123'
        });
        console.log('Login Successful!');
        console.log('User:', JSON.stringify(res.data.user, null, 2));
    } catch (err) {
        console.error('Login Failed:', err.response?.data || err.message);
    }
}

testLogin();
