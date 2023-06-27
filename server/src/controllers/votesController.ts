import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseHelper } from '../databaseHelper';
import { User } from '../interfaces/userInterface';
import { ExtendedRequest } from '../interfaces/ExtendedRequest';

// Upvote an answer
export const upvoteAnswer = async (req: ExtendedRequest, res: Response) => {
  try {
    const { answerId } = req.params;

    const userId  = req.info?.userId as string;

    // Check if the user has already upvoted
    const existingVote = await DatabaseHelper.exec('getVoteByAnswerAndUser', { answerId, userId });
    if (existingVote.recordset.length > 0) {
      return res.status(400).json({
        message: 'User has already upvoted this answer.',
      });
    }

    // Create a new upvote record
    const voteId = uuidv4();
    await DatabaseHelper.exec('addVote', {
      voteId,
      userId,
      answerId,
      upVote: 1,
      downVote: 0,
    });

     // Increment the upvotes count in the Answers table
     await DatabaseHelper.exec('incrementUpvotes', { answerId });

    return res.status(200).json({
      message: 'Answer upvoted successfully.',
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Error: ${error.message}`,
    });
  }
};

// Downvote an answer
export const downvoteAnswer = async (req: ExtendedRequest, res: Response) => {
  try {
    const { answerId} = req.params;

    const userId  = req.info?.userId as string;

    // Check if the user has already downvoted
    const existingVote = await DatabaseHelper.exec('getVoteByAnswerAndUser', { answerId, userId });
    if (existingVote.recordset.length > 0) {
      return res.status(400).json({
        message: 'User has already downvoted this answer.',
      });
    }

    // Create a new downvote record
    const voteId = uuidv4();
    await DatabaseHelper.exec('addVote', {
      voteId,
      userId,
      answerId,
      upVote: 0,
      downVote: 1,
    });


    // Increment the downvotes count in the Answers table
    await DatabaseHelper.exec('incrementDownvotes', { answerId });

    return res.status(200).json({
      message: 'Answer downvoted successfully.',
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Error: ${error.message}`,
    });
  }
};
