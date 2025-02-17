import { hash,verify } from "argon2";
import Usuario from "../user/user.model.js";

export const register = async(req,res)=>{
    try {
        const data = req.body;

        let phone = req.phone ? req.phone: null;
        const encryptedPassword = await hash(data.password);

        const user = await Usuario.create({
            name: data.name,
            surname: data.surname,
            username: data.username,
            email: data.email,
            phone,
            password: encryptedPassword,
            role: data.role
        })

        return res.status(201).json({
            message: "User registred succefully",
            userDetails:{
                user: 
                    user.email
                
            }
        })
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "User registration failed",
            error: error.message
        });
    }
}