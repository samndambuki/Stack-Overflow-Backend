import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
import { NextFunction, Response } from 'express'
import { ExtendedRequest } from '../interfaces/ExtendedRequest'
import { decodedata } from '../interfaces/decodedData'
dotenv.config({path:path.resolve(__dirname, '../../.env')})


export const verifyToken = (req:ExtendedRequest,res:Response,next:NextFunction) =>{
    try {

        const token = req.headers['token'] as string

        if(!token){
           return res.status(401).json({message:'unauthorized'})
        }
        //token - check two things: is it expired, is it valid token
        const decodedata = jwt.verify(token,process.env.SECRET_KEY as string) as decodedata
        req.info = decodedata


    } catch (error:any) {
        return res.status(403).json({message:error.message})
    }
    next()
}