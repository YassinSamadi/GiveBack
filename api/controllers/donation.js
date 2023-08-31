import {
    db
} from "../db.js"
import jwt from "jsonwebtoken";

export const getAllDonations = (req, res) => {
    const selectQuery = "SELECT * FROM donation";

    db.query(selectQuery, (err, results) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(results);
    });
};

export const userDonation = (req, res) => {
    const {
        quantity_donated,
        donation_date,
        need_id
    } = req.body;

    const token = req.cookies.useraccess_token;

    if (!token) return res.status(401).json("Not authorized");

    jwt.verify(token, "JWT", (err, decoded) => {
        if (err) return res.status(401).json("Not authorized");

        const user_id = decoded.id;

        try {
            const insertQuery = "INSERT INTO donation (quantity_donated, donation_date, user_id, need_id) VALUES (?, ?, ?, ?)";
            const values = [quantity_donated, donation_date, user_id, need_id];

            db.query(insertQuery, values, (err, data) => {
                if (err) return res.status(500).json(err);

                const updateQuery = "UPDATE need SET quantity_fulfilled = IFNULL(quantity_fulfilled, 0) + ? WHERE id = ?";
                const updateValues = [quantity_donated, need_id];

                db.query(updateQuery, updateValues, (err, data) => {
                    if (err) return res.status(500).json(err);
                    if (data.affectedRows === 0) {
                        return res.status(404).json("No matching Need found for updating");
                    }
                    return res.status(201).json("Donation made successfully and Need updated successfully");
                });
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    });
};



export const getAllDonationsByUser = (req, res) => {
    const token = req.cookies.useraccess_token;

    if (!token) return res.status(401).json("Not authorized");

    jwt.verify(token, "JWT", (err, decoded) => {
        if (err) return res.status(401).json("Not authorized");

        const user_id = decoded.id;

        const selectQuery = `
            SELECT d.quantity_donated, d.donation_date, n.title, o.name as organization, p.name as product
            FROM donation d
            INNER JOIN need n ON d.need_id = n.id
            INNER JOIN organization o ON n.org_id = o.id
            INNER JOIN product p ON n.product_id = p.id
            WHERE d.user_id = ? AND d.confirmation_date IS NOT NULL
            ORDER BY d.donation_date DESC
        `;

        db.query(selectQuery, [user_id], (err, results) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(results);
        });
    });
};





export const getHighestDonation = (req, res) => {
    const token = req.cookies.useraccess_token;

    if (!token) return res.status(401).json("Not authorized");

    jwt.verify(token, "JWT", (err, decoded) => {
        if (err) return res.status(401).json("Not authorized");

        const user_id = decoded.id;

        const selectQuery = `
            SELECT MAX(quantity_donated) as highest 
            FROM donation 
            WHERE user_id = ? AND confirmation_date IS NOT NULL
        `;

        db.query(selectQuery, [user_id], (err, results) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(results[0]);
        });
    });
};



export const getTotalDonations = (req, res) => {
    const token = req.cookies.useraccess_token;

    if (!token) return res.status(401).json("Not authorized");

    jwt.verify(token, "JWT", (err, decoded) => {
        if (err) return res.status(401).json("Not authorized");

        const user_id = decoded.id;

        const selectQuery = `
            SELECT SUM(quantity_donated) as total 
            FROM donation 
            WHERE user_id = ? AND confirmation_date IS NOT NULL
        `;

        db.query(selectQuery, [user_id], (err, results) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(results[0]);
        });
    });
};


export const getDonationsToOrganization = (req, res) => {
    const token = req.cookies.organizationaccess_token;

    if (!token) return res.status(401).json("Not authorized");

    jwt.verify(token, "JWT", (err, decoded) => {
        if (err) return res.status(401).json("Not authorized");

        const org_id = decoded.id;

        const selectQuery = `
            SELECT 
                d.quantity_donated,
                d.donation_date,
                n.title,
                p.name as product_name,
                u.first_name as user_name
            FROM 
                donation d
            INNER JOIN 
                need n ON d.need_id = n.id
            INNER JOIN 
                organization o ON n.org_id = o.id
            INNER JOIN 
                product p ON n.product_id = p.id
            INNER JOIN 
                user u ON d.user_id = u.id
            WHERE 
                o.id = ? AND confirmation_date IS NOT NULL
            ORDER BY 
                d.donation_date DESC`;

        db.query(selectQuery, [org_id], (err, results) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(results);
        });
    });
};


export const getTotalDonationsReceivedByOrg = (req, res) => {
    const token = req.cookies.organizationaccess_token;

    if (!token) return res.status(401).json("Not authorized");

    jwt.verify(token, "JWT", (err, decoded) => {
        if (err) return res.status(401).json("Not authorized");

        const selectQuery = `
            SELECT 
                SUM(d.quantity_donated) as total_donations
            FROM 
                donation d
            INNER JOIN 
                need n ON d.need_id = n.id
            WHERE 
                n.org_id = ? AND confirmation_date IS NOT NULL`;

        db.query(selectQuery, [decoded.id], (err, results) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(results[0]);
        });
    })
};

export const getTopDonatorToOrg = (req, res) => {

    const token = req.cookies.organizationaccess_token;

    if (!token) return res.status(401).json("Not authorized");

    jwt.verify(token, "JWT", (err, decoded) => {
        if (err) return res.status(401).json("Not authorized");

        const selectQuery =
            `SELECT 
                u.first_name as user_name,
                SUM(d.quantity_donated) as total_donations
            FROM 
                donation d
            INNER JOIN 
                need n ON d.need_id = n.id
            INNER JOIN 
                user u ON d.user_id = u.id
            WHERE 
                n.org_id = ? AND confirmation_date IS NOT NULL
            GROUP BY 
                u.id
            ORDER BY 
                total_donations DESC 
            LIMIT 1 `;

        db.query(selectQuery, [decoded.id], (err, results) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(results[0]);
        });
    })
};

export const getAllDonationsNoConfirmation = (req, res) => {
    const token = req.cookies.organizationaccess_token;

    if (!token) return res.status(401).json("Not authorized");

    jwt.verify(token, "JWT", (err, decoded) => {
        if (err) return res.status(401).json("Not authorized");

        const organization_id = decoded.id;

        const selectQuery = `
            SELECT d.id, d.quantity_donated, d.donation_date, d.confirmation_date, u.first_name, u.last_name, n.id AS need_id, n.title AS need_title
            FROM donation AS d
            INNER JOIN user AS u ON d.user_id = u.id
            INNER JOIN need AS n ON d.need_id = n.id
            WHERE d.confirmation_date IS NULL AND d.delete_date IS NULL
            AND n.org_id = ?
            ORDER BY d.donation_date DESC;
        `;



        db.query(selectQuery, [organization_id], (err, results) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(results);
        });
    });
};

export const deleteDonation = (req, res) => {
    const id = req.query.id;
    try {
        const updateQuery =
            `UPDATE need AS n
            JOIN donation AS d ON n.id = d.need_id
            SET n.quantity_fulfilled = n.quantity_fulfilled + d.quantity_donated
            WHERE d.id = ?`;

        db.query(updateQuery, id, (err, data) => {
            if (err) return res.status(500).json(err);

            const donationUpdateQuery = `UPDATE donation
                            SET delete_date = NOW()
                            WHERE id = ?`

            db.query(donationUpdateQuery, id, (err, data) => {
                if (err) {
                    console.error("Error updating transaction:", err);
                    return res.status(500).json({
                        error: "An error occurred while updating the donation."
                    });
                }

                return res.status(200).json({
                    message: "Donation deleted successfully"
                });
            });
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const confirmDonation = (req, res) => {
    const id = req.query.id;
    try {
        const updateQuery = `UPDATE donation SET confirmation_date = NOW() WHERE id = ?`;

        db.query(updateQuery, id, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("donation confirmed successfully");
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};