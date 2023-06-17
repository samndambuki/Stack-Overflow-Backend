import { Router } from "express";
import { addAnswer, deleteAnswer, getAnswerById, getAnswers, updateAnswer } from "../controllers/answersController";

// initialize router
const answerRoutes = Router();
// routes
//gets all answers
answerRoutes.get('', getAnswers);  
//adds a new answer    
answerRoutes.post('', addAnswer);              
//gets answer by id    
answerRoutes.get('/:answerId', getAnswerById);    
//deletes a specific answer
answerRoutes.delete('/:answerId', deleteAnswer);  
//updates a specific answer
answerRoutes.put('/:answerId', updateAnswer);   
// exports
export default answerRoutes;
