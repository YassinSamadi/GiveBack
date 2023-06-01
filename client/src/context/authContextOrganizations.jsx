import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const OrganizationAuthContext = createContext();

export const OrganizationAuthContextProvider = ({ children }) => {
    const [organization, setOrganization] = useState(JSON.parse(localStorage.getItem("organization")) || null) ;

    const login = async(inputs) => {
        const res = await axios.post("/authorganizations/loginOrganization", inputs);
        setOrganization(res.data);
    }
    const logout = async(inputs) => {
        await axios.post("/authorganizations/logoutOrganization");
        setOrganization(null);
    }

    useEffect(() => {
        localStorage.setItem("organization", JSON.stringify(organization));
    }, [organization]);
    return (
        <OrganizationAuthContext.Provider value={{ organization, login, logout }}>
            {children}
        </OrganizationAuthContext.Provider>
    )
}
