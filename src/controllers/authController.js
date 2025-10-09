const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
   try {
        const { username, password, role } = req.body;
        if (!username || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword, role})
        await newUser.save();
        res.status(201).json({ message: `User registered with username ${username}` });  

   } catch (err) {
        res.status(500).json({ message: "Something went wrong"}); 
   }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await User.findOne({ username });
        if (!user){
            return res.status(404).json({ message: `User with username ${username} not found` });  
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch ){
            return res.status(400).json({ message : `invalid creditials`});
        }

        const token =  jwt.sign(
            {id: user._id, role: user.role},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h"}
        )


        res.status(200).json({ token, username: user.username, role: user.role });
    } catch (err) {
         res.status(500).json({ message: "Something went wrong"});    
    }
};


module.exports = {register, login }