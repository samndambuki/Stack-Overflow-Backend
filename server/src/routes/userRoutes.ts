import { Router } from "express";
import { addUser, deleteUser, getUserById, getUsers, loginUser, updateUser } from "../controllers/userController";
import { verifyToken } from "../Middlewares/verifyToken";

// initialize router
const userRoutes = Router();
// routes
//gets all users
userRoutes.get('',verifyToken,getUsers);  
//adds a new user             
userRoutes.post('',addUser);              
//gets user by id    
userRoutes.get('/:userId',verifyToken,getUserById);    
//deletes a specific user
userRoutes.delete('/:userId',verifyToken,deleteUser);  
//updates a users
userRoutes.put('/:userId', verifyToken,updateUser);   
//logs in a user
userRoutes.post('/login',loginUser)
// exports
export default userRoutes;
