// require('dotenv').config();
// const express = require('express');
// const chalk = require('chalk');
// const cors = require('cors');
// const helmet = require('helmet');

// const keys = require('./config/keys');
// const routes = require('./routes');
// const socket = require('./socket');
// const setupDB = require('./utils/db');

// const { port } = keys;
// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//     frameguard: true
//   })
// );
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ status: 'ok', timestamp: Date.now() });
// });
// app.use(cors());

// setupDB();
// require('./config/passport')(app);
// app.use(routes);

// const server = app.listen(port, () => {
//   console.log(
//     `${chalk.green('✓')} ${chalk.blue(
//       `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
//     )}`
//   );
// });

// socket(server);

require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');

const keys = require('./config/keys');
const routes = require('./routes');
const socket = require('./socket'); // ❌ Will not work on Vercel (see below)
const setupDB = require('./utils/db');

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true
  })
);
app.use(cors());

// DB and auth
setupDB();
require('./config/passport')(app);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: Date.now() });
});

// Routes
app.use(routes);

// ✅ Instead of listening, export the app:
module.exports = app;
