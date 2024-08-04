import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/dbconn.js';
import authroutes from './routes/authroutes.js';
import userroutes from './routes/userroutes.js';
import auth from './middleware/authmiddleware.js';
import validate from './middleware/validationMiddleware.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', validate ,authroutes);
app.use('/api/user', auth, userroutes);

app.get('/', (req, res) => {
    res.send('Welcome to the API');
})

connectDB();
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
