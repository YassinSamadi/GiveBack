import {db} from "../db.js"

export const updateUser = (req, res) => {
    const { first_name, last_name, date_of_birth, profile_pic, inNeed } = req.body;
    const {id} = req.query;
    try {
        

        const updateQuery = `
            UPDATE user 
            SET 
                first_name = ?, 
                last_name = ?, 
                date_of_birth = ?, 
                profile_pic = ?, 
                inNeed = ?
            WHERE 
                id = ?`;
        const values = [first_name, last_name, date_of_birth, profile_pic, inNeed, id];

        db.query(updateQuery, values, (err, data) => {
            if (err) {
                console.error("Error updating user:", err);
                return res.status(500).json({ error: "An error occurred while updating the user." });
            }
            return res.status(200).json({ message: "User updated successfully" });
        });
    } catch (error) {
        console.error("Caught an exception:", error);
        return res.status(500).json({ error: "An internal server error occurred." });
    }
};
export const getUser = (req, res) => {
    const { id } = req.query;
    
    const selectQuery = "SELECT * FROM user where id = ?";
    
    db.query(selectQuery,[id], (err, results) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(results);
    });
};

