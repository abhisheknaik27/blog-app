import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import UserModel from './models/User.js';
dotenv.config();
const app = express();

const salt = bcrypt.genSaltSync(10);


app.use(cors());
app.use(express.json());

const PORT = 4000;

await mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('db connected'))
    .catch((er) => console.log('db connection issue'));

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try{
        const user = await UserModel.create({
            username, 
            password: bcrypt.hashSync(password, salt)
        })
        res.json(user);
    }catch(err){
        res.status(400).json({err});
    }
    
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`))