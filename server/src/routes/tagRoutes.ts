import { Router } from "express";
import { addTag, deleteTag, getTagById, getTags, updateTag } from "../controllers/tagController";
import { verifyToken } from "../Middlewares/verifyToken";

// initialize router
const tagRoutes = Router();
// routes
//gets all tags
tagRoutes.get('',verifyToken,getTags);  
//adds a new tag         
tagRoutes.post('',verifyToken,addTag);              
//gets tag by id    
tagRoutes.get('/:tagId',verifyToken,getTagById);    
//deletes a specific tag
tagRoutes.delete('/:tagId',verifyToken,deleteTag);  
//updates a specific tag
tagRoutes.put('/:tagId',verifyToken,updateTag);   
// exports
export default tagRoutes;
