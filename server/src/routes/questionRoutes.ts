import { Router } from "express";
import { addQuestion, deleteQuestion, getQuestionById, getQuestions, updateQuestion } from "../controllers/questionsContoller";
import { verifyToken } from "../Middlewares/verifyToken";

// initialize router
const questionRoutes = Router();
// routes
//gets all questions
questionRoutes.get('',verifyToken,getQuestions);  
//adds a new question       
questionRoutes.post('',verifyToken,addQuestion);              
//gets question by id    
questionRoutes.get('/:questionId',verifyToken,getQuestionById);    
//deletes a specific question
questionRoutes.delete('/:questionId',verifyToken,deleteQuestion);  
//updates a specific question
questionRoutes.put('/:questionId',verifyToken,updateQuestion);   
// exports
export default questionRoutes;
