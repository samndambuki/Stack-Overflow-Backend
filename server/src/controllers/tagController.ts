import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseHelper } from '../databaseHelper';

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
export const addTag = async (req: Request, res: Response) => {
  try {
    const { tagName } = req.body;

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
export const updateTag = async (req: Request<{ tagId: string }>, res: Response) => {
  try {
    const { tagId } = req.params;
    const { tagName } = req.body;

    if (!tagName) {
      return res.status(400).json({ message: 'tagName is required' });
    }

    const tag = await DatabaseHelper.exec('getTagById', { tagId });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    await DatabaseHelper.exec('updateTag', {
      tagId,
      tagName,
    });

    res.status(200).json({ message: 'Tag updated successfully!', tagId });
  } catch (error: any) {
    res.status(500).json(`ERROR: ${error.message}`);
  }
};

// DELETE /tags/:tagId
export const deleteTag = async (req: Request<{ tagId: string }>, res: Response) => {
  try {
    const { tagId } = req.params;

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
