import jwt from "jsonwebtoken"
const secret = "Satyam1234"
// token bana raha hai ye functions 
export function setUser(user){
    // payload mein ham id se zayda user ka use kar rahe hai 
    return jwt.sign(user,secret);
}

export function getUser(token){
    if(!token) return null
    return jwt.verify(token , secret);
}