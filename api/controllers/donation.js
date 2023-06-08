import {db} from "../db.js"

export const getAllDonations = (req, res) => {
    const selectQuery = "SELECT * FROM donation";
    
    db.query(selectQuery, (err, results) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(results);
    });
};

export const userDonation = (req, res) => {
    const { quantity_donated, donation_date, user_id, need_id } = req.body;
    
    try {
        const insertQuery = "INSERT INTO donation (quantity_donated, donation_date, user_id, need_id) VALUES (?, ?, ?, ?)";
        const values = [quantity_donated, donation_date, user_id, need_id];

        db.query(insertQuery, values, (err, data) => {
            if (err) return res.status(500).json(err);
            console.log('Donation inserted');

            const updateQuery = "UPDATE need SET quantity_fulfilled = IFNULL(quantity_fulfilled, 0) + ? WHERE id = ?";
            const updateValues = [quantity_donated, need_id];
            
            db.query(updateQuery, updateValues, (err, data) => {
                if (err) return res.status(500).json(err);
                if (data.affectedRows === 0) {
                    return res.status(404).json("No matching Need found for updating");
                }
                console.log('Need updated');
                return res.status(201).json("Donation made successfully and Need updated successfully");
            });
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json(error);
    }
};


export const getAllDonationsByUser = (req, res) => {
    const { user_id } = req.query;

    const selectQuery = `
        SELECT d.quantity_donated, d.donation_date, n.title, o.name as organization, p.name as product
        FROM donation d
        INNER JOIN need n ON d.need_id = n.id
        INNER JOIN organization o ON n.org_id = o.id
        INNER JOIN product p ON n.product_id = p.id
        WHERE d.user_id = ?
        ORDER BY d.donation_date DESC
    `;

    db.query(selectQuery, [user_id], (err, results) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(results);
    });
};

export const getHighestDonation = (req, res) => {
    const { user_id } = req.query;

    const selectQuery = `
        SELECT MAX(quantity_donated) as highest 
        FROM donation 
        WHERE user_id = ?
    `;

    db.query(selectQuery, [user_id], (err, results) => {
        if (err) return res.status(500).json(err);

        // results[0] should be an object like { highest: 10 }
        return res.status(200).json(results[0]);
    });
};

export const getTotalDonations = (req, res) => {
    const { user_id } = req.query;

    const selectQuery = `
        SELECT SUM(quantity_donated) as total 
        FROM donation 
        WHERE user_id = ?
    `;

    db.query(selectQuery, [user_id], (err, results) => {
        if (err) return res.status(500).json(err);

        // results[0] should be an object like { total: 50 }
        return res.status(200).json(results[0]);
    });
};

export const getDonationsToOrganization = (req, res) => {
    const { org_id } = req.query;

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
            o.id = ?
        ORDER BY 
            d.donation_date DESC`;

    db.query(selectQuery, [org_id], (err, results) => {
        if (err) return res.status(500).json(err);
        
        return res.status(200).json(results);
    });
};

export const getTotalDonationsReceivedByOrg = (req, res) => {
    const { org_id } = req.query;

    const selectQuery = `
        SELECT 
            SUM(d.quantity_donated) as total_donations
        FROM 
            donation d
        INNER JOIN 
            need n ON d.need_id = n.id
        WHERE 
            n.org_id = ?`;

    db.query(selectQuery, [org_id], (err, results) => {
        if (err) return res.status(500).json(err);
        
        return res.status(200).json(results[0]);
    });
};

export const getTopDonatorToOrg = (req, res) => {
    const { org_id } = req.query;

    const selectQuery = `
        SELECT 
            u.first_name as user_name,
            SUM(d.quantity_donated) as total_donations
        FROM 
            donation d
        INNER JOIN 
            need n ON d.need_id = n.id
        INNER JOIN 
            user u ON d.user_id = u.id
        WHERE 
            n.org_id = ?
        GROUP BY 
            u.id
        ORDER BY 
            total_donations DESC
        LIMIT 1`;

    db.query(selectQuery, [org_id], (err, results) => {
        if (err) return res.status(500).json(err);
        
        return res.status(200).json(results[0]);
    });
};






