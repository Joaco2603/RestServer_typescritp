
import { Request,Response, json } from "express"
import User from "../models/user"

export const getUsers = async(req:Request,res:Response) =>{

    const users = await User.findAll();
    
    res.json(users)
}


export const getUser = async(req:Request,res:Response) =>{

    const { id } = req.params;

    const user = await User.findByPk( id );

    if(!user)
    {
        return res.status(404).json({
            msg:"No existe un usuario con este ID"
        })
    }

    res.json(user)
}

export const postUser = async(req:Request,res:Response) =>{

    
    const { body } = req;

    try {

        const existeEmail = await User.findOne({
            where:{
                email:body.email
            }
        })

        if(existeEmail)
        {
            return res.status(400).json({
                msg:`Ya existe un usuario con el email ` + body.email
            })
        }

        const user = await User.create(body);

        res.json(user)
    } catch (error:unknown) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}


export const putUser = async(req:Request,res:Response)=>{
    const { id }    = req.params;
    const { name,email }  = req.body;

    try {

        const user = await User.findByPk(id);
        if(!user)
        {
            return res.status(404).json({
                msg:`No existe un usuario con el id ` + id
            })
        }

        await user.update({name,email});

        res.json(user)
    } catch (error:unknown) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}


export const deleteUser = async(req:Request,res:Response)=>{
    const { id } = req.params;

    const user = await User.findByPk(id);
    if(!user)
    {
        return res.status(404).json({
            msg:`No existe un usuario con el id ` + id
        })
    }

    await user.update({state:false});

    // await user.destroy();

    res.json(user)
}