const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({message : "Access denied"})
        }
        next();
    }
};

module.exports =authorizeRoles;// Auto edit at 2025-11-26T17:47:27.150Z
// Auto edit at 2025-11-26T17:51:00.824Z
// Auto edit at 2025-11-26T17:51:01.222Z
// Auto edit at 2025-11-26T17:51:02.105Z
// Auto edit at 2025-11-26T17:56:32.313Z
