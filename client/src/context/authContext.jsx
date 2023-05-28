import { createContext, useEffect, useState } from "react";
import axios
 from "axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null) ;

    const login = async(inputs) => {
        const res = await axios.post("/auth/login", inputs);
        setUser(res.data);
    }
    const logout = async(inputs) => {
        const res = await axios.post("/auth/logout", inputs);
        setUser(null);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}