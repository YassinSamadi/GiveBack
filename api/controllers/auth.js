import {db} from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = (req, res) => {
  const { first_name,last_name, email, password, profile_pic, inNeed } = req.body;


    const selectQuery = "SELECT * FROM user WHERE email = ?";
    
    db.query(selectQuery, [email], (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length) return res.status(409).json("Email already exists");
    
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
    
      const insertQuery = "INSERT INTO user (first_name, last_name, email, password,profile_pic, inNeed ) VALUES (?,?,?,?,?,?)";
      const values = [first_name,last_name, email, hash, profile_pic, inNeed];
    
      db.query(insertQuery, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json("User created successfully");
      });
    });
  };


  export const login = (req, res) => {
    const q = "SELECT * FROM user WHERE email = ?";
  
    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
  
      if (data.length === 0 || !bcrypt.compareSync(req.body.password, data[0].password)) {
        return res.status(401).json("Invalid email or password");
      }
  
      const token = jwt.sign({ id: data[0].id }, "JWT");
  
      const { password, id, ...other } = data[0];
  
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 24);
  
      res.cookie("useraccess_token", token, {
        httpOnly: true,
        expires: expirationDate,
      }).status(200).json(other);
    });
  };
  

export const logout = (req, res) => {
    res.clearCookie("useraccess_token", {sameSite:"none", secure: true}).status(200).json("Logged out successfully")
}