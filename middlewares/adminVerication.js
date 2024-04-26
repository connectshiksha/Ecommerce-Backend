const jwt = require('jsonwebtoken');


const AdminVerification = (req, res, next) => {

    const token = req.header('admintoken');
    if (!token) {
        return res.status(401).json({
            status: false,
            message: "No token found"
        });
    }
    try {
        const decoded = jwt.verify(token, 'secret')
        if (decoded.role === "admin") {
            next()
        }else{
            return res.status(401).json({
                status: false,
                message: "Invalid token"
            });
        }

    } catch (error) {
        console.log(error.message);
        return res.status(401).json({
            status: false,
            message: "Invalid Token"
        });
    }

}

module.exports = AdminVerification;