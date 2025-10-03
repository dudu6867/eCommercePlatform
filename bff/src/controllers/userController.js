import userService from '../services/userService.js';
import { handleError } from '../utils/handleError.js';

export const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.status(201).json(user);
  } catch (err) {
    return handleError(res, err, 'An error occurred while creating the user.');
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    return handleError(res, err, 'An error occurred while fetching users.');
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.json(user);
  } catch (err) {
    return handleError(res, err, 'An error occurred while fetching the user.');
  }
};

export const getUserByEmail = async (req, res, next) => {
  console.log('Query params:', req.query); // Debugging line
  try {
    const { email } = req.query;
    const user = await userService.getUserByEmail(email);
    res.json(user);
  } catch (err) {
    return handleError(res, err, 'An error occurred while fetching the user by email.');
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const updated = await userService.updateUser(id, userData);
    res.json(updated);
  } catch (err) {
    return handleError(res, err, 'An error occurred while updating the user.');
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.json(result);
  } catch (err) {
    return handleError(res, err, 'An error occurred while deleting the user.');
  }
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser
};
