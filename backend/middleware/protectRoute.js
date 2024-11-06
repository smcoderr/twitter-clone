import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({error: "Unautorized: No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(400).json({error: "Unautorized: Invalid Token"})
        }

        const user = await User.findOne({_id: decoded.userId}).select("-password");

        if (!user) {
            return res.status(400).json({error: "User not found"})
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(`Error in protectRoute middleware: ${error}`);
        res.status(500).json({error: "Internal Server Error"});
    }
}
export default protectRoute;