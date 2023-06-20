import express, {json} from 'express'
import cors from 'cors';
import userRoutes from './routes/userRoutes'
import tagRoutes from './routes/tagRoutes';
import answerRoutes from './routes/answerRoutes';
import questionRoutes from './routes/questionRoutes';
import commentsRoutes from './routes/commentsRoutes';
import voteRoutes from './routes/voteRoutes';

const app=express()
app.use(cors({
    origin: "*"
}));
app.use(json())// middleware
app.use('/users',userRoutes)
app.use('/tags',tagRoutes)
app.use('/answers',answerRoutes)
app.use('/questions',questionRoutes)
app.use('/comments',commentsRoutes)
app.use('/votes',voteRoutes)
app.listen(4000, ()=>{
    console.log("Server Running...")
})
