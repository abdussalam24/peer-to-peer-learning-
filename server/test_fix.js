const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { getMe } = require('./controllers/profileController');

async function testFix() {
    let mongod;
    try {
        console.log('Testing getMe fix with MongoMemoryServer...');

        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        await mongoose.connect(uri);
        console.log('Connected to Memory DB');

        // Mock req/res
        const req = {
            user: { id: new mongoose.Types.ObjectId() } // Random ID that definitely won't exist
        };
        const res = {
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.data = data;
                console.log(`Response Code: ${this.statusCode || 200}`);
                console.log('Response Data:', JSON.stringify(this.data, null, 2));
            }
        };

        await getMe(req, res);

        await mongoose.connection.close();
        await mongod.stop();
        console.log('Test completed successfully');
        process.exit(0);
    } catch (err) {
        console.error('Test Failed:', err);
        if (mongod) await mongod.stop();
        process.exit(1);
    }
}

testFix();
