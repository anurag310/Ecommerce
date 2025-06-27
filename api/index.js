const serverless = require('serverless-http');
const app = require('../server/index'); // points to your Express app

module.exports = serverless(app);
