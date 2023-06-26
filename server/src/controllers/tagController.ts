import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseHelper } from '../databaseHelper';
import { ExtendedRequest } from '../interfaces/ExtendedRequest';

// GET /tags
export const getTags = async (req: Request, res: Response) => {
  try {
    const tags =  await (await DatabaseHelper.exec('getTags')).recordset;
    res.status(200).json(tags);
  } catch (error: any) {
    res.status(500).json(`ERROR: ${error.message}`);
  }
};

// POST /tags
export const addTag = async (req: ExtendedRequest, res: Response) => {
  try {
    const { tagName } = req.body;


    const role = req.info?.isAdmin as boolean
    
    if (!role) {
      return res.status(401).json({
        message: "Only admins can add tags.",
      });
    }

    if (!tagName) {
      return res.status(400).json({ message: 'tagName is required' });
    }

    const tagId = uuidv4();

    await DatabaseHelper.exec('addTag', {
      tagId,
      tagName,
    });

    res.status(201).json({ message: 'Tag added successfully!', tagId });
  } catch (error: any) {
    res.status(500).json(`ERROR: ${error.message}`);
  }
};

// GET /tags/:tagId
export const getTagById = async (req: Request<{ tagId: string }>, res: Response) => {
  try {
    const { tagId } = req.params;

    const tag = (await (DatabaseHelper.exec('getTagById', { tagId }))).recordset[0];

    //checks if tag exists
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.status(200).json(tag);
  } catch (error: any) {
    res.status(500).json(`ERROR: ${error.message}`);
  }
};

// PUT /tags/:tagId
export const updateTag = async (req: ExtendedRequest, res: Response) => {
  try {
    const { tagId } = req.params;
    const { tagName } = req.body;

     // Check if the user is an admin
     if (!req.info?.isAdmin) {
      return res.status(401).json({
        message: 'Only admins can update tags.',
      });
    }

    if (!tagName) {
      return res.status(400).json({ message: 'tagName is required' });
    }

    const tag = await DatabaseHelper.exec('getTagById', { tagId });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    await DatabaseHelper.exec('updateTag', {
      tagId,
      newtagName:tagName,
    });

    res.status(200).json({ message: 'Tag updated successfully!', tagId });
  } catch (error: any) {
    res.status(500).json(`ERROR: ${error.message}`);
  }
};

// DELETE /tags/:tagId
export const deleteTag = async (req: ExtendedRequest, res: Response) => {
  try {
    const { tagId } = req.params;


     // Check if the user is an admin
     if (!req.info?.isAdmin) {
      return res.status(401).json({
        message: 'Only admins can update tags.',
      });
    }

    const tag = await DatabaseHelper.exec('getTagById', { tagId });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    await DatabaseHelper.exec('deleteTag', { tagId });

    res.status(200).json({ message: 'Tag deleted successfully!', tagId });
  } catch (error: any) {
    res.status(500).json(`ERROR: ${error.message}`);
  }
};

// GET /tags
export const getDistinctTags = async (_req: Request, res: Response) => {
  try {
    const distinctTags = await DatabaseHelper.exec('getDistinctTags');

    // Extract the tag names from the fetched data
    const tags = distinctTags.recordset.map((tag: any) => tag.tagName);

    res.status(200).json(tags);
  } catch (error: any) {
    res.status(500).json(`ERROR: ${error.message}`);
  }
};

export const getQuestionsByTag = async (req: Request<{ tagId: string }>, res: Response) => {
  try {
    const { tagId } = req.params;

    const questions = await DatabaseHelper.exec('getQuestionsByTag', { tagId });

    res.status(200).json(questions.recordset);
  } catch (error: any) {
    res.status(500).json(`ERROR: ${error.message}`);
  }
};

