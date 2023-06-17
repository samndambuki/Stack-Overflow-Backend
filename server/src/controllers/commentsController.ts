import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseHelper } from '../databaseHelper';
import moment from 'moment';

// Add Comment
export const addComment = async (req: Request, res: Response) => {
  try {
    const commentId = uuidv4();
    const { userId, questionId, answerId, body } = req.body;


    const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');

    await DatabaseHelper.exec('addComment', {
      commentId,
      userId,
      questionId,
      answerId,
      body,
      createdAt:currentDateTime,
    });

    return res.status(201).json({
      message: 'Comment added successfully!',
    });
  } catch (error: any) {
    return res.status(500).json(`ERROR: ${error.message}`);
  }
};

// Delete Comment
export const deleteComment = async (req: Request<{ commentId: string }>, res: Response) => {
  try {
    const { commentId } = req.params;

    const comment = (await DatabaseHelper.exec('getCommentById', { commentId })).recordset[0];

    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found!',
      });
    }

    await DatabaseHelper.exec('deleteComment', { commentId });

    return res.status(200).json({
      message: 'Comment deleted successfully!',
    });
  } catch (error: any) {
    return res.status(500).json(`ERROR: ${error.message}`);
  }
};

// Update Comment
export const updateComment = async (req: Request<{ commentId: string }>, res: Response) => {
  try {
    const { commentId } = req.params;
    const { body} = req.body;

    const comment = (await DatabaseHelper.exec('getCommentById', { commentId })).recordset[0];


    const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');

    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found!',
      });
    }

    await DatabaseHelper.exec('updateComment', {
      commentId,
      body,
      updatedAt:currentDateTime,
    });

    return res.status(200).json({
      message: 'Comment updated successfully!',
    });
  } catch (error: any) {
    return res.status(500).json(`ERROR: ${error.message}`);
  }
};

// Get All Comments
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = (await DatabaseHelper.exec('getAllComments')).recordset;

    if (!comments) {
      return res.status(404).json({
        message: 'No comments found!',
      });
    }

    return res.status(200).json(comments);
  } catch (error: any) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
};


// Get Comment by ID
export const getCommentById = async (req: Request<{ commentId: string }>, res: Response) => {
  try {
    const { commentId } = req.params;
    const comment = (await DatabaseHelper.exec('getCommentById', { commentId })).recordset[0];

    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found!',
      });
    }

    return res.status(200).json(comment);
  } catch (error: any) {
    return res.status(500).json(`ERROR: ${error.message}`);
  }
};

// Get Comments by Question ID
export const getCommentsByQuestionId = async (req: Request<{ questionId: string }>, res: Response) => {
  try {
    const { questionId } = req.params;
    const comments = (await DatabaseHelper.exec('getCommentsByQuestionId', { questionId })).recordset;

    return res.status(200).json(comments);
  } catch (error: any) {
    return res.status(500).json(`ERROR: ${error.message}`);
  }
};

// Get Comments by Answer ID
export const getCommentsByAnswerId = async (req: Request<{ answerId: string }>, res: Response) => {
  try {
    const { answerId } = req.params;
    const comments = (await DatabaseHelper.exec('getCommentsByAnswerId', { answerId })).recordset;

    return res.status(200).json(comments);
  } catch (error: any) {
    return res.status(500).json(`ERROR: ${error.message}`);
  }
};


