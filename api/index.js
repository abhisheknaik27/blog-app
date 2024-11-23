import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

await mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('db connected'))
    .catch((er) => console.log('db connection issue'));

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    res.json({ username, password });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`))