
import schema from "./user.model.js";
import bcrypt from 'bcrypt';
import pkg from "jsonwebtoken";
const {sign}=pkg
export async function addUser(req,res)
{
  try {
    const {user,password,name}=req.body;
    const usr=await schema.findOne({user})
    if(usr)
    return res.status(404).send("Username already exist")
  if(!(user && password && name))
  return res.status(404).send("Feilds are empty")
 bcrypt
 .hash(password,10)
 .then((hashedPwd)=>{
 return res.status(201).send(schema.create({name,user,password:hashedPwd}));
 })
 .catch((error)=>{
  console.log(error);
  res.status(500).send(error)
 })
  } catch (error) {
    console.log(error);
  }
}




export async function login(req,res)
{
  const{user,password}=req.body;
  const usr=await schema.findOne({user});
  console.log(usr);
  if(usr===null)
   {return res.status(404).send("username or password does not exist");}
  const success=await bcrypt.compare(password,usr.password)
  if(success!==true)
   return res.status(404).send("username or password does not exist");
  const token=await sign({usr},process.env.JWT_KEY,{expiresIn:"24h"})
  console.log(token);
  res.status(200).send({msg:"succesfully Login",token});
  res.end();
}

// export async function home(req,res)
// {
//   try {
//     console.log(req.user);
//     const username=req.user.user
//     console.log(username);
//     res.status(200).send({msg:`hellow ${username}`})
//   } catch (error) {
//     res.status(404).send(error)
//   }
// }
