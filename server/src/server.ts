import express, {json} from 'express'
import cors from 'cors';
import userRoutes from './routes/userRoutes'

const app=express()
app.use(cors({
    origin: "*"
}));
app.use(json())// middleware
app.use('/users',userRoutes)
app.listen(4000, ()=>{
    console.log("Server Running...")
})
