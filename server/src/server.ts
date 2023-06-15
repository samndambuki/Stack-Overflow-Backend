import express, {json} from 'express'
import router from './routes'


const app=express()
app.use(json())// middleware
app.use('/',router)
app.listen(4000, ()=>{
    console.log("Server Running...")
})
