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
    const { userName, email, password } = req.body;

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

//login operation
export const loginUser = async (req: Request, res: Response) => {
  try {
    //get request from body and strong type
    const { email, password } = req.body as { email: string; password: string };
    console.log(email);
    console.log(password);

    //check if email provided is correct - yes - user exists - no- user doesnt exist
    let user = await (
      await DatabaseHelper.exec("GetUserByEmail", { email })
    ).recordset;

    console.log("OUTPUT", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let validPassword = await bcrypt.compare(password, user[0].password);

    // console.log(user[0].password)

    console.log(validPassword);

    if (!validPassword) {
      return res.status(404).json({ message: "User not found" });
    }

    const payload = user.map(
      (users) => {
        const {
          password,
          isDeleted,
          emailSent,
          createdAt,
          updatedAt,
          ...rest
        } = users;
        return rest;
      }
    );

    //token
    const token = jwt.sign(payload[0], process.env.SECRET_KEY as string, {
      expiresIn: "360000s",
    });

    return res.json({ message: "Login Successful!!", token });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};


