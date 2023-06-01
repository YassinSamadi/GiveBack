import {db} from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = (req, res) => {
    const { email, password, address_id } = req.body; // Now also getting the address_id from the request body
  
    const selectQuery = "SELECT * FROM organization WHERE email = ?";
  
    db.query(selectQuery, [email], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length) return res.status(409).json("Email already exists");
  
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
  
      const insertQuery = "INSERT INTO organization (email, password, address_id) VALUES (?, ?, ?)"; // Now also inserting the address_id
      const values = [email, hash, address_id]; // Including the address_id in the values array
  
      db.query(insertQuery, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json("Organization created successfully");
      });
    });
  };
  

export const login = (req, res) => {
    const q = "SELECT * FROM organization WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json(err);
        if(data.length === 0) return res.status(404).json("Organization not found");

        const isValid = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isValid) return res.status(401).json("Invalid credentials");

        const token = jwt.sign({id: data[0].id}, "JWT");

        const{password, ...other} = data[0]

        res.cookie("token", token, {
            httpOnly: true,
        }).status(200).json(other)
    })
}

export const logout = (req, res) => {
    res.clearCookie("token", {sameSite:"none", secure: true}).status(200).json("Logged out successfully")
}
