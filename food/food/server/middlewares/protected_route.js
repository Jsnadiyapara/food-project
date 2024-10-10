import jwt from "jsonwebtoken";
import UserModel from '../models/userModel.js'

const protect = (async (req, res, next) => {
    try{
        let backend_token;
        backend_token = req.cookies.backend_token;
        console.log(backend_token)
    
        if (backend_token) {
            try {
                const decoded = jwt.verify(backend_token, process.env.JWT_SECRET_KEY);
                req.user = await UserModel.findById(decoded.userID).select("-password");
                next();
            } catch (err) {
                res.status(401);
                throw new Error("Invalid Token");
            }
        } else {
            res.status(401);
            throw new Error("Token not found");
        }
    }
    catch(e){
        res.status(500).send(e.message)
    }
});

export default  protect;