const axios = require('axios');

const testLogin = async () => {
    try {
        console.log('Attempting login...');
        const res = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'sarah.johnson@university.edu',
            password: 'password123'
        });
        console.log('Login Successful!');
        console.log('Token:', res.data.token ? 'Received' : 'Missing');
        console.log('User:', res.data.user);
    } catch (err) {
        console.error('Login Failed:', err.response ? err.response.data : err.message);
    }
};

// Wait for server to start (simple timeout for this script)
setTimeout(testLogin, 8000);
