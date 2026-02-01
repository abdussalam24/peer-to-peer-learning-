const { google } = require('googleapis');
const readline = require('readline');

// Replace these with your credentials from Google Cloud Console
const CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE';
const REDIRECT_URI = 'http://localhost:5000/api/auth/google/callback';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

// Scopes for Google Calendar API
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// Generate authentication URL
const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent' // Force to get refresh token
});

console.log('\n🔐 Google OAuth Token Generator\n');
console.log('📋 Steps to get your refresh token:\n');
console.log('1. Open this URL in your browser:');
console.log('\n' + authUrl + '\n');
console.log('2. Sign in with your Google account');
console.log('3. Grant permissions');
console.log('4. Copy the authorization code from the URL\n');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('5. Paste the authorization code here: ', async (code) => {
    try {
        const { tokens } = await oauth2Client.getToken(code);

        console.log('\n✅ Success! Here are your tokens:\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\nAdd these to your .env file:\n');
        console.log(`GOOGLE_CLIENT_ID=${CLIENT_ID}`);
        console.log(`GOOGLE_CLIENT_SECRET=${CLIENT_SECRET}`);
        console.log(`GOOGLE_REDIRECT_URI=${REDIRECT_URI}`);
        console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('⚠️  IMPORTANT: Keep your refresh token secret!\n');

    } catch (error) {
        console.error('\n❌ Error getting tokens:', error.message);
    }

    rl.close();
});
