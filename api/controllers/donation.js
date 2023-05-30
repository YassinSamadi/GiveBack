import {db} from "../db.js"

export const getAllDonationsByUser = (req, res) => {
    const selectQuery = "SELECT * FROM donation";
    
    db.query(selectQuery, (err, results) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(results);
    });
};
