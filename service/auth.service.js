import jwt from "jsonwebtoken"
const secret = "Blah1234"
    // token bana raha hai ye functions 
export function setUser(user){
        // payload mein ham id se zayda user ka use kar rahe hai 
    return jwt.sign({_id: user._id , email:user.email , role:user.role} , secret);
}

export function getUser(token){
    if(!token) return null
    try {
        return jwt.verify(token , secret);
    } catch (error) {
        return null;
    }        
        
}    