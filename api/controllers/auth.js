import {db} from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = (req, res) => {
    const selectQuery = "SELECT * FROM user WHERE email = ?";
    
    db.query(selectQuery, [req.body.email], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length) return res.status(409).json("Email already exists");
    
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
    
      const insertQuery = "INSERT INTO user (email, password) VALUES (?, ?)";
      const values = [req.body.email, hash];
    
      db.query(insertQuery, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json("User created successfully");
      });
    });
  };
  

export const login = (req, res) => {
    const q = "SELECT * FROM user WHERE email = ?";

    db.query(q,[req.body.email], (err, data) => {
        if (err) return res.json(err);
        if(data.length === 0) return res.status(404).json("User not found");

        const isValid = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isValid) return res.status(401).json("Invalid credentials");
        
        const token = jwt.sign({id:data[0].id}, "JWT")

        const{password, ...other} = data[0]

        res.cookie("token", token, {
            httpOnly: true,
        }).status(200).json(other)
    })
}

export const logout = (req, res) => {
    
}