import { Router } from "express";
import { deleteQuestionTag, getQuestionTagsByQuestionId, getQuestionTagsByTagId, updateQuestionTag } from "../controllers/questionTagController";
import { verifyToken } from "../Middlewares/verifyToken";


// initialize router
const questionTagRoutes = Router();
// routes
//gets all question tags
questionTagRoutes.get('',verifyToken );  
//adds a new question tag 
questionTagRoutes.post('',verifyToken );        

// GET request to get a specific question tag by question ID
questionTagRoutes.get('/questionTag/:questionId',verifyToken, getQuestionTagsByQuestionId);

// GET request to get question tags by tag ID
questionTagRoutes.get('/questionTag/:tagId',verifyToken,getQuestionTagsByTagId);

// PUT request to update a question tag
questionTagRoutes.put('/questionTag/:questionId/:tagId',verifyToken, updateQuestionTag);

// DELETE request to delete a question tag
questionTagRoutes.delete('/questionTag/:questionId/:tagId',verifyToken,deleteQuestionTag);



// exports
export default questionTagRoutes;
