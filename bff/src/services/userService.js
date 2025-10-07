import httpClient from './httpClient.js';
import { config } from '../config.js';

const USER_SERVICE_URL = config.userServiceUrl;

const userService = {
  createUser: async (dto) => {
    const response = await httpClient.post(`${USER_SERVICE_URL}`, dto);
    return response.data;
  },
  getAllUsers: async () => {
    console.log('Fetching users from:', USER_SERVICE_URL);
    const response = await httpClient.get(`${USER_SERVICE_URL}`);
    return response.data;
  },
  getUserById: async (id) => {
    const response = await httpClient.get(`${USER_SERVICE_URL}/${id}`);
    return response.data;
  },
  getUserByEmail: async (email) => {
    const response = await httpClient.get(`${USER_SERVICE_URL}/email`, {
      params: { email }
    });
    return response.data;
  },
  updateUser: async (id, dto) => {
    const response = await httpClient.put(`${USER_SERVICE_URL}/${id}`, dto);
    return response.data;
  },
  deleteUser: async (id) => {
    await httpClient.delete(`${USER_SERVICE_URL}/${id}`);
    return { message: `User ${id} deleted successfully` };
  }
};

export default userService;
