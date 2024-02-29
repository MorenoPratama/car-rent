import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import md5 from "md5";
import { sign } from "jsonwebtoken";

/** create an object of Prisma */
const prisma = new PrismaClient()

const createAdmin = async (request: Request, response: Response) => {
    try {
        /** read a request from body */
        const nama_admin = request.body.nama_admin
        const email = request.body.email
        const password = md5(request.body.password)
        
        /** insert to admin table using prisma */
        const newData = await prisma.admin.create({
            data: {
                nama_admin: nama_admin,
                email: email,
                password: password
            }
        })
        
        return response.status(200).json({
            status: true,
            message: `admin has been created`,
            data: newData
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

/** create fuction to READ admin */
const readAdmin = async ( request: Request, response: Response) => {
    try {
        const page = Number(request.query.page) || 1;
        const qty = Number(request.query.qty) || 5;
        const keyword = request.query.keyword?.toString() || "";
        
        const dataAdmin = await prisma.admin.findMany()
        return response.status(200).json({
            status :true ,
            message: `Admin has been loaded`,
            data: dataAdmin
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}


const updateAdmin = async (request: Request, response: Response) => {
    try {
        /** read id that sent from URL */
        const id = Number(request.params.id)
        /** read data perubahan */
        const nama_admin = request.body.nama_admin
        const email = request.body.email
        const password = md5(request.body.password)
        
        /** make sure that the data exists */
        const findAdmin = await prisma.admin.findFirst({ where: { id: id } })
        if (!findAdmin) {
            /** give a response when admin not found */
            return response.status(400).json({
                status: false,
                message: `Data admin not found`
            })
        }
        
        const dataAdmin = await prisma.admin.update({ where: { id: id },
            data: {
                nama_admin: nama_admin || findAdmin.nama_admin,
                email: email || findAdmin.email,
                password: password || findAdmin.password
            }
        })
        
        return response.status(200).json({
            status: true,
            message: 'Data admin has been updated',
            data: dataAdmin
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}


const deleteAdmin = async (request: Request, response: Response) => {
    try {
        /** read id that sent from URL */
        const id = Number(request.params.id)
        
        /** make sure that the data exists */
        const findAdmin = await prisma.admin.findFirst({ where: { id: id } })
        if (!findAdmin) {
            /** give a response when admin not found */
            return response.status(400).json({
                status: false,
                message: `Data admin not found`
            })
        }
        
        /** execute for delete admin */
        const dataAdmin = await prisma.admin.delete({ where: { id: id }})
        
        return response.status(200).json({
            status: true,
            message: `Data admin has been deleted`
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}


const Login = async (request: Request, response: Response) => {
    try {
        const email = request.body.email
        const password = md5(request.body.password)

        const admin = await prisma.admin.findFirst({where: {email: email, password: password}})

        if (admin) {
            const payload = admin
            const secretkey = 'rental mobil'
            const token = sign(payload, secretkey)
            return response.status(200).json({
                status :true,
                message:"Login Success",
                token: token
            })
        }
        else {
            return  response.status(200).json({
                status: false,
                message:"Login Failed"
            })
        }

    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}
export { createAdmin, readAdmin, updateAdmin, deleteAdmin, Login }