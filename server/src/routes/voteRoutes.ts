import { Router } from "express";
import { verifyToken } from "../Middlewares/verifyToken";
import { downvoteAnswer, upvoteAnswer } from "../controllers/votesController";

// initialize router
const voteRoutes = Router();
// routes
//upvote an answer   
voteRoutes.post('/upvote/:answerId',verifyToken, upvoteAnswer);              
//downvote an answer
voteRoutes.post('/downvote/:answerId',verifyToken, downvoteAnswer);     
// exports
export default voteRoutes;
