require('dotenv').config();
const express = require('express');
const connectDb = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();

app.use(cors({
    credentials:true,
    origin:['http://localhost:5173']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

connectDb();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.json({ message: "Hello from POS server!" });
});

app.use('/api/user', require('./routes/userRouter'));
app.use('/api/order', require('./routes/orderRoutes'));
app.use('/api/table', require('./routes/tableRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
