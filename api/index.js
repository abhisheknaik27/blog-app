import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import UserModel from './models/User.js';


dotenv.config();
const app = express();

const salt = bcrypt.genSaltSync(10);
const SECRET_KEY = "dsknndsncdbiuwebcjkbjkbdcsdckl";

app.use(cookieParser());
app.use(cors({credentials: true, origin:'http://localhost:5173'}));
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

app.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    const passResult = bcrypt.compareSync(password, user.password);
    
    if(passResult){
        //logedin
        const token = jwt.sign({username, id:user._id}, SECRET_KEY);
        res.cookie('token', token).json({
            id: user._id,
            username
        });
    } else{
        res.status(400).json( 'Wrong Credentials' );
    }
})

app.get('/profile', (req, res) => {
    try{
        const {token} = req.cookies;
    const verified = jwt.verify(token, SECRET_KEY);
    if (verified) {
        return res.send(verified);
    } else {
        // Access Denied
        return res.status(401).send("error");
    }
    }catch(err){
        console.log('error');
    }
    
    
})

app.post('/logout', (req, res) => {
    try{
        res.cookie('token', '', { expires: new Date(0) }).json('ok');
    }catch(err){
        console.log('error');
    }
    
})
app.listen(PORT, () => console.log(`Server running on ${PORT}`))