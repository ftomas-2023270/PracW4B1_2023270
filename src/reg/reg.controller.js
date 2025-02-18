import regModel from "./reg.model.js";
import Usuario from "../user/user.model.js"
import Class from "../class/class.model.js";

export const saveReg = async (req,res) => {
    try {
        const data = req.body;
        const user= await Usuario.findOne({email: data.email});
        const cls = await Class.findOne({id :data.cls})

        if(!user){
            return res.status(404).json({
                success: false,
                msg: "Student not found"
            })    
        }
        if(!cls){
            return res.status(404).json({
                success: false,
                msg: "Class not found"
            })    
        }

        const clss = new Class({
            ...data,
            cls: cls._id,
            student: user._id
        });

        await clss.save();

        res.status(200).json({
            success: true,
            clss
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error saving the class",
            error: error.message
        })
    }
}