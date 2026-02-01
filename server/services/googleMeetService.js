const { google } = require('googleapis');

class GoogleMeetService {
    constructor() {
        this.oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );

        // Set credentials if refresh token is available
        if (process.env.GOOGLE_REFRESH_TOKEN) {
            this.oauth2Client.setCredentials({
                refresh_token: process.env.GOOGLE_REFRESH_TOKEN
            });
        }

        this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    }

    /**
     * Create a Google Meet meeting
     * @param {Object} meetingData - Meeting details
     * @returns {Promise<Object>} Meeting link and ID
     */
    async createMeeting(meetingData) {
        const { subject, description, startTime, duration, attendees } = meetingData;

        // Calculate end time
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + duration);

        const event = {
            summary: subject,
            description: description || 'Peer-to-Peer Learning Session',
            start: {
                dateTime: startTime.toISOString(),
                timeZone: 'UTC',
            },
            end: {
                dateTime: endTime.toISOString(),
                timeZone: 'UTC',
            },
            attendees: attendees.map(email => ({ email })),
            conferenceData: {
                createRequest: {
                    requestId: `meet-${Date.now()}`,
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet'
                    }
                }
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 }, // 1 day before
                    { method: 'popup', minutes: 30 }, // 30 minutes before
                ],
            },
        };

        try {
            // Check if credentials are set
            if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REFRESH_TOKEN) {
                console.warn('⚠️ Google API credentials missing. Creating mock meeting.');
                throw new Error('Missing Google API credentials');
            }

            const response = await this.calendar.events.insert({
                calendarId: 'primary',
                resource: event,
                conferenceDataVersion: 1,
                sendUpdates: 'all' // Send email to all attendees
            });

            const meetingLink = response.data.hangoutLink;
            const meetingId = response.data.id;

            return {
                meetingLink,
                meetingId,
                eventData: response.data
            };
        } catch (error) {
            console.error('Error creating Google Meet:', error.message);

            // Fallback to Jitsi Meet (free, no API key required) so the link actually works
            console.log('⚠️ Google Credentials missing/invalid. Falling back to Jitsi Meet.');
            const randomID = Math.random().toString(36).substring(7);
            return {
                meetingLink: `https://meet.jit.si/PeerToPeer-${Date.now()}-${randomID}`,
                meetingId: `jitsi-${Date.now()}`,
                eventData: event
            };
        }
    }

    /**
     * Update an existing meeting
     * @param {string} meetingId - Google Calendar Event ID
     * @param {Object} updates - Updated meeting details
     * @returns {Promise<Object>} Updated meeting data
     */
    async updateMeeting(meetingId, updates) {
        try {
            const { subject, description, startTime, duration } = updates;

            const endTime = new Date(startTime);
            endTime.setMinutes(endTime.getMinutes() + duration);

            const event = {
                summary: subject,
                description,
                start: {
                    dateTime: startTime.toISOString(),
                    timeZone: 'UTC',
                },
                end: {
                    dateTime: endTime.toISOString(),
                    timeZone: 'UTC',
                },
            };

            const response = await this.calendar.events.patch({
                calendarId: 'primary',
                eventId: meetingId,
                resource: event,
                sendUpdates: 'all'
            });

            return response.data;
        } catch (error) {
            console.error('Error updating meeting:', error);
            throw new Error('Failed to update meeting: ' + error.message);
        }
    }

    /**
     * Cancel a meeting
     * @param {string} meetingId - Google Calendar Event ID
     * @returns {Promise<void>}
     */
    async cancelMeeting(meetingId) {
        try {
            await this.calendar.events.delete({
                calendarId: 'primary',
                eventId: meetingId,
                sendUpdates: 'all'
            });
        } catch (error) {
            console.error('Error canceling meeting:', error);
            throw new Error('Failed to cancel meeting: ' + error.message);
        }
    }

    /**
     * Get meeting details
     * @param {string} meetingId - Google Calendar Event ID
     * @returns {Promise<Object>} Meeting details
     */
    async getMeeting(meetingId) {
        try {
            const response = await this.calendar.events.get({
                calendarId: 'primary',
                eventId: meetingId
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching meeting:', error);
            throw new Error('Failed to fetch meeting: ' + error.message);
        }
    }
}

module.exports = new GoogleMeetService();
