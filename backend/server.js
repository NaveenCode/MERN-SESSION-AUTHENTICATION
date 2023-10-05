const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const connectDB = require('./connection');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));

connectDB();

app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});
