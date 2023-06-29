import { Router } from "express";
import { addAnswer, deleteAnswer, getAnswerById, getAnswers, getAnswersByQuestionId, updateAnswer } from "../controllers/answersController";
import { verifyToken } from "../Middlewares/verifyToken";

// initialize router
const answerRoutes = Router();
// routes
//gets all answers
answerRoutes.get('',verifyToken,getAnswers);  
//adds a new answer    
answerRoutes.post('/:questionId',verifyToken, addAnswer);              
//gets answer by answer id    
answerRoutes.get('/:answerId',verifyToken, getAnswerById);    
//gets answers by  question Id
answerRoutes.get('/question/:questionId',verifyToken, getAnswersByQuestionId);    
//deletes a specific answer
answerRoutes.delete('/:answerId',verifyToken,deleteAnswer);  
//updates a specific answer
answerRoutes.put('/:answerId',verifyToken,updateAnswer);   
// exports
export default answerRoutes;
