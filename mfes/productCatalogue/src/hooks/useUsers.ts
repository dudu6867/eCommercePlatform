import { useEffect, useState } from "react";
import { User } from "../types/Users";
import userService from "../services/UserService";

const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const userId = Number(new URLSearchParams(window.location.search).get("userId"));
                const data = await userService.getUserById(userId);
                setUser(data);
            } catch (err: any) {
                setError(err.message || "Failed to load user");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error };
};

export default useUser;