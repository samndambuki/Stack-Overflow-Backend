import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid"; // Import v4 function from uuid
import bcrypt from "bcrypt";
import { DatabaseHelper } from "../databaseHelper/index";
import moment from 'moment';


// Controller to add a new user
export const addUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    // Generate a unique ID for the user
    const userId = uuidv4();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');

    // Execute the stored procedure to add the user
    await DatabaseHelper.exec("addUser", {
      userId,
      userName,
      email,
      password: hashedPassword,
      createdAt:currentDateTime,
    });

    res.status(201).json({
      message: "User added successfully!",
    });
  } catch (error: any) {
    res.status(500).json(`ERROR: ${error.message}`);
  }
};

// Controller to get a user by ID
export const getUserById = async (
  req: Request<{ userId: string }>,
  res: Response
) => {
  try {
    const { userId } = req.params;

    // Execute the stored procedure to get the user by ID
    const user = await (await DatabaseHelper.exec("getUserById", {
      userId,
    })).recordset[0];

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json(`ERROR: ${error.message}`);
  }
};

// Controller to get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    // Execute the stored procedure to get all users
    const users = (await DatabaseHelper.exec("getUsers")).recordset;

    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json(`ERROR: ${error.message}`);
  }
};

// Controller to update a user
export const updateUser = async (
  req: Request<{ userId: string }>,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const { userName, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');


    // Execute the stored procedure to update the user
    await DatabaseHelper.exec("updateUser", {
      userId,
      userName,
      email,
      password: hashedPassword,
      updatedAt:currentDateTime
    });

    res.status(200).json({
      message: "User updated successfully!",
    });
  } catch (error: any) {
    res.status(500).json(`ERROR: ${error.message}`);
  }
};

// Controller to delete a user
export const deleteUser = async (
  req: Request<{ userId: string }>,
  res: Response
) => {
  try {
    const { userId } = req.params;

    // Execute the stored procedure to delete the user
    await DatabaseHelper.exec("deleteUser", {
      userId,
    });

    res.status(200).json({
      message: "User deleted!",
    });
  } catch (error: any) {
    res.status(500).json(`ERROR: ${error.message}`);
  }
};
