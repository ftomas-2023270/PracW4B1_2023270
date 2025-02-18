import Usuario from "../user/user.model.js";
import Class from "./class.model.js";

export const saveClass = async (req,res) => {
    try {
        const data = req.body;
        const user= await Usuario.findOne({email: data.email});

        if(!user){
            return res.status(404).json({
                success: false,
                msg: "Teacher not found"
            })    
        }

        const clss = new Class({
            ...data,
            teacher: user._id
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

export const getClass = async (req, res) =>{

    const {limite = 10, desde = 0} = req.query;

    const query = {status: true};

    try {
        
        const classes = await Class.find(query)
        .skip(Number(desde))
        .limit(Number(limite));

        const classTeacher = await Promise.all(classes.map(async (clss)=>{
            const tchr = await User.findById(clss.teacher);
            return {
                ...clss.toObject(),
                teacher: tchr ? tchr.name : "Teacher not found"
            }
        }));

        const total = await Class.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            clss: classTeacher
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error getting class',
            error: error.message
        })
    }
}

export const searchClass = async (req, res) =>{

    const {id}= req.params;

    try {
        
        const clss = await Class.findById(id);

        if(!clss){
            return res.status(404).json({
                success: false,
                message: 'Class not found'
            })
        }

        const tchr = await User.findById(clss.teacher);

        res.status(200).json({
            success: true,
            clss:{
                ...clss.toObject(),
                teacher: tchr ? tchr.name : "Teacher not found"
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error finding the class',
            error
        })
    }
}


export const deletePet = async (req,res ) =>{

    const {id}= req.params;
    try {
        
        await Class.findByIdAndUpdate(id,{estado: false});

        res.status(200).json({
            success: true,
            message: 'Class delete succesfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting the class',
            error: error.message
        })
    }
}

export const updateClass = async (req, res) => {
    
    const {id} = req.params;
    const {_id,...data} = req.body;

    try {
    
        const cls = await Class.findByIdAndUpdate(id,data,{new: true});
        
        res.status(200).json({
            success: true,
            message: 'Class update successfully',
            cls
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Cannot update class',
            error: error.message
        })
    }
}