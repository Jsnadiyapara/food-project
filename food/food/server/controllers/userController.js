import UserModel from '../models/userModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class UserController {
    static userRegistration = async (req, res) => {
        console.log(req.body)
        const { username, email, password} = req.body
        const user = await UserModel.findOne({ email: email })
        if (user) { //find user 
            res.send({ "status": "failed", "message": "Email already exists" })
        } else {
            if (username && email && password) {
                try {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password, salt)
                    const doc = new UserModel({
                        username:username,
                        email:email,
                        password: hashPassword,
                        
                    })
                    await doc.save()
                    res.send({ "status": "sucess", "message": "Register Successfull" })
                } catch (error) {
                    res.send({ "status": "failed", "message": "Unable to Register" })

                }

            } else {
                res.send({ "status": "failed", "message": "All fields are required" })
            }
        }
    }
    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body
            if (email && password ) {
                const user = await UserModel.findOne({ email: email })
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password)
                    if ((user.email === email) && isMatch) {
                        // Genrate JWT Token
                        const token = jwt.sign({ userID: user._id },
                            process.env.SECRET_KEY, { expiresIn: '11d' })
                        const role=user.role;
                        res.cookie("backend_token", token,role, {
                            maxAge: 30 * 24 * 60 * 60 * 1000,//30 d
                        });
                        
                        
                        res.send({ "status": "success", "message": "Login Success", "token": token,"role":role })

                    } else {
                        res.send({ "status": "failed", "message": "Email or Password is not Valid" })
                    }
                } else {
                    res.status(500).send({ "status": "failed", "message": "You are not a Registered User" })

                }
            } else {
                res.send({ "status": "failed", "message": "All Fields are Required" })
            }
        } catch (error) {
            res.send({ "status": "failed", "message": "Unable to Login" })

        }
    }

    static testController = (req,res)=>{
        try {
            res.send({ "status": "success", "message": "You are Admin" })
           
        } catch (error) {
           res.send({"status": "failed", "message": "Unable to Login" })
        }
    }
    
     

    


}
export default UserController


