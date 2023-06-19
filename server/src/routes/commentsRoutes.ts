import { Router } from "express";
import { addComment, deleteComment, getCommentById, getCommentsByAnswerId, getCommentsByQuestionId, updateComment } from "../controllers/commentsController";
import { verifyToken } from "../Middlewares/verifyToken";

// initialize router
const commentsRoutes = Router();
// routes
//gets all comments
commentsRoutes.get('',verifyToken );  
//adds a new comment  
commentsRoutes.post('',verifyToken,addComment);              
//gets comment by id    
commentsRoutes.get('/:commentId',verifyToken,getCommentById);    
//get comment by question id
commentsRoutes.get('/:questionId',verifyToken,getCommentsByQuestionId);    
//get comment by answer id
commentsRoutes.get('/:answerId',verifyToken,getCommentsByAnswerId);  
//deletes a specific comment
commentsRoutes.delete('/:commentId',verifyToken,deleteComment);  
//updates a specific comment
commentsRoutes.put('/:commentId',verifyToken,updateComment);   
// exports
export default commentsRoutes;
