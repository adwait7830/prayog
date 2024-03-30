const express = require('express');
const cors = require('cors')
require('dotenv').config();

const connect = require('./db');
connect();

const app = express();
app.use(express.json())

const allowedOrigins = [`${process.env.APP_URL}`,`${process.env.FRONTEND_URL}`];
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback('Not allowed by CORS');
        }
    },
}))

const port = process.env.BACKEND_PORT;
app.listen(port, () => console.log(`Backend listening on port ${port}`))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/institute', require('./routes/institute'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/workshops', require('./routes/workshops'))
app.use('/api/projects', require('./routes/projects'))