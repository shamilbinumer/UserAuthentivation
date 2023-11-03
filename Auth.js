import pkg from 'jsonwebtoken';
const {verify}=pkg;
export default async function Auth(req,res,next){
    try {
        const key=req.headers.authorization;
        if(!key) return res.status(404).send("Unotherised access");
        const token=key.split(" ")[1];
        console.log(token);
        const auth=await verify(token,proccess.env.JWT_KEY);
        console.log(auth);
        req.user=auth
        next();
    } catch (error) {
        
    }
}