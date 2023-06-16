import { Router } from "express";
import { addTag, deleteTag, getTagById, getTags, updateTag } from "../controllers/tagController";

// initialize router
const tagRoutes = Router();
// routes
//gets all tags
tagRoutes.get('', getTags);  
//adds a new tag         
tagRoutes.post('', addTag);              
//gets tag by id    
tagRoutes.get('/:tagId', getTagById);    
//deletes a specific tag
tagRoutes.delete('/:tagId', deleteTag);  
//updates a specific tag
tagRoutes.put('/:tagId', updateTag);   
// exports
export default tagRoutes;
