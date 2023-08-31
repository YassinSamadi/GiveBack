import {db} from "../db.js"
import bcrypt from "bcryptjs";
import fs from 'fs';
import jwt from "jsonwebtoken";


export const updateUser = (req, res) => {
    const { first_name, last_name, password, profile_pic, inNeed } = req.body;

    const token = req.cookies.useraccess_token;

    if (!token) return res.status(401).json("Not authorized");

    jwt.verify(token, "JWT", (err, decoded) => {
        if (err) return res.status(401).json("Not authorized");

        const user_id = decoded.id;

        try {
            db.query('SELECT profile_pic FROM user WHERE id = ?', [user_id], (selectErr, selectResult) => {
                if (selectErr) {
                    console.error("Error retrieving current profile picture:", selectErr);
                    return res.status(500).json({ error: "An error occurred while updating the user." });
                }

                const currentProfilePic = selectResult[0].profile_pic;

                if (currentProfilePic) {
                    fs.unlink(`../client/public/assets/uploads/profilepic/${currentProfilePic}`, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error("Error deleting existing profile picture:", unlinkErr);
                        }
                    });
                }

                let updateQuery = `
                    UPDATE user 
                    SET 
                        first_name = ?, 
                        last_name = ?`;

                const values = [first_name, last_name];

                if (password) {
                    updateQuery += `, password = ?`;
                    const hashedPassword = bcrypt.hashSync(password, 10);
                    values.push(hashedPassword);
                }

                updateQuery += `, profile_pic = ?, inNeed = ? WHERE id = ?`;
                values.push(profile_pic, inNeed, user_id);

                db.query(updateQuery, values, (updateErr, updateResult) => {
                    if (updateErr) {
                        console.error("Error updating user:", updateErr);
                        return res.status(500).json({ error: "An error occurred while updating the user." });
                    }
                    return res.status(200).json({ message: "User updated successfully" });
                });
            });
        } catch (error) {
            console.error("Caught an exception:", error);
            return res.status(500).json({ error: "An internal server error occurred." });
        }
    });
};




export const getUser = (req, res) => {
    const token = req.cookies.useraccess_token;

    if (!token) return res.status(401).json("Not authorized");

    jwt.verify(token, "JWT", (err, decoded) => {
        if (err) return res.status(401).json("Not authorized");

        const user_id = decoded.id;
        
        const selectQuery = "SELECT * FROM user where id = ?";
        
        db.query(selectQuery, [user_id], (err, results) => {
            if (err) return res.status(500).json(err);
        
            return res.status(200).json(results);
        });
    });
};


