import { Router } from "express";
import { addComment, deleteComment, getCommentById, getCommentsByAnswerId, getCommentsByQuestionId, updateComment } from "../controllers/commentsController";

// initialize router
const commentsRoutes = Router();
// routes
//gets all comments
commentsRoutes.get('', );  
//adds a new comment  
commentsRoutes.post('', addComment);              
//gets comment by id    
commentsRoutes.get('/:commentId', getCommentById);    
//get comment by question id
commentsRoutes.get('/:questionId', getCommentsByQuestionId);    
//get comment by answer id
commentsRoutes.get('/:answerId', getCommentsByAnswerId);  
//deletes a specific comment
commentsRoutes.delete('/:commentId', deleteComment);  
//updates a specific comment
commentsRoutes.put('/:commentId', updateComment);   
// exports
export default commentsRoutes;
