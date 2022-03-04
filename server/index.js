import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import viewRoutes from './routes/routes.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors({
    origin: "*",
}));
app.use(express.json());
// const CONNECTION_URL = process.env.DATABASE;

app.use('/', viewRoutes);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));




const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`)))    
.catch((error) => console.log(error.message));

app.get('/', (req, res)=>{
    res.send('Hello World');
});
