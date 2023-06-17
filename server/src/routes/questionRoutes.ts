import { Router } from "express";
import { addQuestion, deleteQuestion, getQuestionById, getQuestions, updateQuestion } from "../controllers/questionsContoller";

// initialize router
const questionRoutes = Router();
// routes
//gets all questions
questionRoutes.get('', getQuestions);  
//adds a new question       
questionRoutes.post('', addQuestion);              
//gets question by id    
questionRoutes.get('/:questionId', getQuestionById);    
//deletes a specific question
questionRoutes.delete('/:questionId', deleteQuestion);  
//updates a specific question
questionRoutes.put('/:questionId', updateQuestion);   
// exports
export default questionRoutes;
