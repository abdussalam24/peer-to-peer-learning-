require('dotenv').config();
const googleMeetService = require('./services/googleMeetService');

const testMeeting = async () => {
    console.log('Testing Meeting Generation...');
    try {
        const meeting = await googleMeetService.createMeeting({
            subject: 'Test Meeting',
            description: 'This is a test',
            startTime: new Date(),
            duration: 60,
            attendees: ['test@example.com']
        });

        console.log('Meeting Created!');
        console.log('Link:', meeting.meetingLink);

        if (meeting.meetingLink.includes('meet.jit.si')) {
            console.log('✅ SUCCESS: Fallback to Jitsi link confirmed.');
        } else if (meeting.meetingLink.includes('meet.google.com') && !meeting.meetingLink.includes('mock')) {
            console.log('✅ SUCCESS: Real Google Meet link created.');
        } else {
            console.log('❌ FAILURE: Link is still invalid or mock.');
        }
    } catch (err) {
        console.error('Error:', err);
    }
    process.exit(0);
};

testMeeting();
