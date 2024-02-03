import express from 'express'
import {person} from './models/schema.js'
import { connectDB } from './config/db.js';
import {config} from "dotenv"

config({
    path:'./config/config.env'
})
const app = express();

connectDB()
app.use(express.json()) 
app.get('/',(req,res)=>{
    res.send('hello')
})
//create
app.post('/',async(req,res)=>{
    let{name,company}=req.body
    
    await person.create(
        {name,company}
    )
    res.send(`user created name ${name}  company ${company}`)
})

//read
app.get('/:id',async(req,res)=>{
   
    let user=await person.findById(req.params.id)
   console.log("user ",user)

    if(!user){
        res.status(400).json({
            message:"User not found"
        })
        return
    }

    res.status(200).json({
        user,
    })


})

//update
app.post('/:id',async(req,res)=>{
    let{name,company}=req.body
    let user=await person.findById(req.params.id)
   console.log("user ",user,person)

    if(!user){
        res.status(400).json({
            message:"user not found"
        })
        return
    }

    user.name=name
    user.company=company
    await user.save();
    

    res.status(200).json({
        user,
        message:"updated successfully"
    })

})


//delete
app.delete('/:id',async(req,res)=>{
    let {id}=req.params;
    let user=await person.findById(id);
    if(!user) res.status(400).send({message:"user not found"})
    let name=user.name
    await person.deleteOne({_id:id})

    res.status(200).send({
        message:`user ${name} deleted successfully`
    })
})


app.listen(2000,()=>{
    console.log('started')
})


