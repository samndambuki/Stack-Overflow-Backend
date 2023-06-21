import { Router } from "express";
import { verifyToken } from "../Middlewares/verifyToken";
import { downvoteAnswer, upvoteAnswer } from "../controllers/votesController";

// initialize router
const voteRoutes = Router();
// routes
//upvote an answer   
voteRoutes.post('/upvote/:answerId/:userId',verifyToken, upvoteAnswer);              
//downvote an answer
voteRoutes.post('/downvote/:answerId/:userId',verifyToken, downvoteAnswer);     
// exports
export default voteRoutes;
