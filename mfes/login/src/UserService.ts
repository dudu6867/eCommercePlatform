import axios from "axios";

export interface User {
  id: number;
  name: string;
  address: string;
  email: string;
  role: string;
}

const USER_SERVICE_URL = "http://localhost:3000/bff/users";

/**
 * Find a user by email via BFF API.
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await axios.get<User>(`${USER_SERVICE_URL}/email`, {
      params: { email },
    });
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.status === 404) {
      return null;
    }
    throw err;
  }
}

/**
 * Add a new user via BFF API.
 */
export async function addUser(user: {
  name: string;
  address: string;
  email: string;
  role: string;
}): Promise<User> {
  const response = await axios.post<User>(USER_SERVICE_URL, user, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}
