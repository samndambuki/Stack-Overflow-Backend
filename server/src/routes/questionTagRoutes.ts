import { Router } from "express";
import { addQuestionTag, deleteQuestionTag, getQuestionTagsByQuestionId, getQuestionTagsByTagId, updateQuestionTag } from "../controllers/questionTagController";
import { verifyToken } from "../Middlewares/verifyToken";


// initialize router
const questionTagRoutes = Router();
// routes

//adds a new question tag 
questionTagRoutes.post('',verifyToken,addQuestionTag);        

// GET request to get a specific question tag by question ID
questionTagRoutes.get('/:questionId',verifyToken, getQuestionTagsByQuestionId);

// GET request to get question tags by tag ID
questionTagRoutes.get('/:tagId',verifyToken,getQuestionTagsByTagId);

// PUT request to update a question tag
questionTagRoutes.put('/:questionId/:tagId',verifyToken, updateQuestionTag);

// DELETE request to delete a question tag
questionTagRoutes.delete('/:questionId/:tagId',verifyToken,deleteQuestionTag);



// exports
export default questionTagRoutes;
