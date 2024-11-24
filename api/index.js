import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import UserModel from './models/User.js';
import PostModel from './models/Post.js';
import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const uploadMiddleware = multer({ dest: 'uploads/' });

dotenv.config();
const app = express();

const salt = bcrypt.genSaltSync(10);
const SECRET_KEY = "dsknndsncdbiuwebcjkbjkbdcsdckl";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(cors({credentials: true, origin:'http://localhost:5173'}));
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
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
        if (!token) {
            return res.status(401).json({ error: "No token provided, user is not logged in" });
        }
        jwt.verify(token, SECRET_KEY, {}, (err, info) => {
            if(err) throw err;
            res.json(info);
        });
    } catch(err){
        console.log(err);
    }
})

app.post('/logout', (req, res) => {
    try{
        res.cookie('token', '', { expires: new Date(0) }).json('ok');
    }catch(err){
        console.log('error');
    }
    
})


app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    try {
        
        if (!req.file) {
            return res.status(400).json({ error: 'File is required' });
        }

        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = `${path}.${ext}`;
        
        try {
            fs.renameSync(path, newPath);
        } catch (err) {
            return res.status(500).json({ error: 'Failed to process file' });
        }

        // Validate token
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        jwt.verify(token, SECRET_KEY, {}, async (err, info) => {
            if (err) return res.status(401).json({ error: 'Invalid token' });

            const { title, summary, content } = req.body;
            const post = await PostModel.create({
                title,
                summary,
                content,
                cover: newPath,
                author: info.id,
            });
            res.json(post);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/post', uploadMiddleware.single('file'), async(req, res) => {

    try{
        let newPath = null;
    if(req.file){ 
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = `${path}.${ext}`;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
        
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, SECRET_KEY, {}, async (err, info) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        const { id, title, summary, content } = req.body;
        const post = await PostModel.findById(id);

        const isAuthor = JSON.stringify(post.author) === JSON.stringify(info.id);
        
        if(!isAuthor) {
            res.status(400).json('You are not Author');
        }
        await post.updateOne({
            title,
            summary,
            content,
            cover: newPath? newPath : post.cover,
        });
        
        res.json(post);
    });
    } catch(err){
        console.log('server error in updating')
    }
})


app.get('/posts', async (req, res) => {
    try{
        const posts = await PostModel.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20);
    res.json(posts);
    }catch(err){
        console.log('err');
    }  
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const post = await PostModel.findById(id).populate('author', ['username']);
    res.json(post);
})
app.listen(PORT, () => console.log(`Server running on ${PORT}`))