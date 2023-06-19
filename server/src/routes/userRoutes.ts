import { Router } from "express";
import { addUser, deleteUser, getUserById, getUsers, loginUser, updateUser } from "../controllers/userController";

// initialize router
const userRoutes = Router();
// routes
//gets all users
userRoutes.get('', getUsers);  
//adds a new user             
userRoutes.post('', addUser);              
//gets user by id    
userRoutes.get('/:userId', getUserById);    
//deletes a specific user
userRoutes.delete('/:userId', deleteUser);  
//updates a users
userRoutes.put('/:userId', updateUser);   
//logs in a user
userRoutes.post('/login',loginUser)
// exports
export default userRoutes;
