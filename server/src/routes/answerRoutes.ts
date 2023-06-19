import { Router } from "express";
import { addAnswer, deleteAnswer, getAnswerById, getAnswers, updateAnswer } from "../controllers/answersController";
import { verifyToken } from "../Middlewares/verifyToken";

// initialize router
const answerRoutes = Router();
// routes
//gets all answers
answerRoutes.get('',verifyToken,getAnswers);  
//adds a new answer    
answerRoutes.post('',verifyToken, addAnswer);              
//gets answer by id    
answerRoutes.get('/:answerId',verifyToken, getAnswerById);    
//deletes a specific answer
answerRoutes.delete('/:answerId',verifyToken,deleteAnswer);  
//updates a specific answer
answerRoutes.put('/:answerId',verifyToken,updateAnswer);   
// exports
export default answerRoutes;
