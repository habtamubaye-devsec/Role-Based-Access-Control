const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "defaultsecret");
            req.user = decoded;
            console.log("Decoded user:", req.user);
            next(); 
        } catch (err) {
            return res.status(400).json({ message: "Token is not valid" });
        }
    } else {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
};

module.exports = verifyToken;
 