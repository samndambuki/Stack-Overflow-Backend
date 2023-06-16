import express, {json} from 'express'
import cors from 'cors';
import userRoutes from './routes/userRoutes'
import tagRoutes from './routes/tagRoutes';

const app=express()
app.use(cors({
    origin: "*"
}));
app.use(json())// middleware
app.use('/users',userRoutes)
app.use('/tags',tagRoutes)
app.listen(4000, ()=>{
    console.log("Server Running...")
})
