import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid"; // Import v4 function from uuid
import bcrypt from "bcrypt";
import { DatabaseHelper } from "../databaseHelper/index";
import moment from "moment";
import { registrationSchema } from "../Helpers/validations";
import { User } from "../interfaces/userInterface";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Controller to add a new user
export const addUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password,isAdmin } = req.body;

    //validate first
    const { error } = registrationSchema.validate(req.body);

    if (error) {
      return res.status(404).json(error.details[0].message);
    }

    // Generate a unique ID for the user
    const userId = uuidv4();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    

    const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");

    // Execute the stored procedure to add the user
    await DatabaseHelper.exec("addUser", {
      userId,
      userName,
      email,
      password: hashedPassword,
      createdAt: currentDateTime,
      isAdmin:isAdmin || false
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
    const user = await (
      await DatabaseHelper.exec("getUserById", {
        userId,
      })
    ).recordset[0];

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
    const users = await (await DatabaseHelper.exec("getUsers")).recordset;

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

    const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");

    // Execute the stored procedure to update the user
    await DatabaseHelper.exec("updateUser", {
      userId,
      userName,
      email,
      password: hashedPassword,
      updatedAt: currentDateTime,
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

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    // Retrieve the user from the database based on the email
    const user = await DatabaseHelper.exec('GetUserByEmail', { email });

    if (!user.recordset || user.recordset.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = user.recordset[0] as User;
    const { password: hashedPassword, isAdmin, ...payload } = userData;

    // Compare the provided password with the hashed password
    const validPassword = await bcrypt.compare(password, hashedPassword);
    if (!validPassword) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate the JWT token
    const token = jwt.sign({ ...payload, isAdmin }, process.env.SECRET_KEY as string, {
      expiresIn: '360000s',
    });

    return res.json({ message: 'Login Successful!', token, isAdmin });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};


