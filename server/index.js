const express = require('express');
const cors = require('cors');  // Import the CORS middleware
const Connection = require('./src/config/db');
const userRouter = require('./src/routes/user.routes');
const todoRouter = require('./src/routes/todo.routes');

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};


app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use("/api/users", userRouter);
app.use("/api/todo", todoRouter);

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(2345, () => {
    try {
        Connection();
        console.log('Listening on port 2345');
    } catch (error) {
        console.error(error.message);
    }
});
