import { Router } from "express";
import { deleteQuestionTag, getQuestionTagsByQuestionId, getQuestionTagsByTagId, updateQuestionTag } from "../controllers/questionTagController";


// initialize router
const questionTagRoutes = Router();
// routes
//gets all question tags
questionTagRoutes.get('', );  
//adds a new question tag 
questionTagRoutes.post('', );        

// GET request to get a specific question tag by question ID
questionTagRoutes.get('/questionTag/:questionId', getQuestionTagsByQuestionId);

// GET request to get question tags by tag ID
questionTagRoutes.get('/questionTag/:tagId', getQuestionTagsByTagId);

// PUT request to update a question tag
questionTagRoutes.put('/questionTag/:questionId/:tagId', updateQuestionTag);

// DELETE request to delete a question tag
questionTagRoutes.delete('/questionTag/:questionId/:tagId', deleteQuestionTag);



// exports
export default questionTagRoutes;
