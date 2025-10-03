import { User } from "../types/Users";

const BASE_URL = "http://localhost:3000/bff/users";

const userService = {
  getUserById: async (id: number): Promise<User> => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch user with id ${id}`);
    return res.json();
  } 
};

export default userService;