import {v4 as uuidv4} from "uuid";
import User from "../models/user.model.js"

export async function handleUserSignup(req , res) {
    const { name , email , password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}



export async function handleUserLogin(req , res) {
    const { email , password} = req.body;
    const user = await User.findOne({email , password});
    if(!user){
        return res.render("login" , {
            error : "Invalid username or password",
        })
    }
    const seesionId = uuidv4();
    return res.redirect("/");
}


