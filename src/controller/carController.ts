import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

/** create an object of Prisma */
const prisma = new PrismaClient()


const createCar = async (request: Request, response: Response) => {
    try {
        /** read a request from body */
        const nopol = request.body.nopol
        const merk_mobil = request.body.merk_mobil
        const harga_perhari = Number(request.body.harga_perhari)

        /** insert to events table using prisma */
        const newData = await prisma.car.create({
            data: {
                nopol: nopol,
                merk_mobil: merk_mobil,
                harga_perhari: harga_perhari
            }
        })

        return response.status(200).json({
            status: true,
            message: `Car has been added`,
            data: newData
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

/** create fuction to READ events */
const readCar = async (request: Request, response: Response) => {
    try {
        const page = Number(request.query.page) || 1;
        const qty = Number(request.query.qty) || 5;
        const keyword = request.query.keyword?.toString() || "";

        const dataCar = await prisma.car.findMany({
            take: qty, // mendefisinikan jmlh data yang diambil
            skip: (page - 1) * qty,
            where: {
                OR: [
                    {nopol: {contains: keyword } },
                    {merk_mobil: {contains: keyword } }
                ]
            },
            orderBy: { nopol: "asc" }
        })
        return response.status(200).json({
            status: true,
            message: `Cars has been loaded`,
            data: dataCar
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const updateCar = async (request: Request, response: Response) => {
    try {
        /** read id that sent from URL */
        const id = Number(request.params.id)
        /** read data perubahan */
        const nopol = request.body.nopol
        const merk_mobil = request.body.merk_mobil
        const harga_perhari = Number(request.body.harga_perhari)

        /** make sure that the data exists */
        const findCar = await prisma.car.findFirst({ where: { id: id } })
        if (!findCar) {
            /** give a response when event not found */
            return response.status(400).json({
                status: false,
                message: `Data event not found`
            })
        }

        const dataCar = await prisma.car.update({ where: { id: id },
            data: {
                nopol: nopol || findCar.nopol,
                merk_mobil: merk_mobil || findCar.merk_mobil,
                harga_perhari: harga_perhari || findCar.harga_perhari
            }
        })

        return response.status(200).json({
            status: true,
            message: 'Data Car has been updated',
            data: dataCar
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}


const deleteCar = async (request: Request, response: Response) => {
    try {
        /** read id from URL */
        const id = Number(request.params.id)

        /** make sure that the data exists */
        const findCar = await prisma.car.findFirst({ where: { id: id } })
        if (!findCar) {
            /** give a response when event not found */
            return response.status(400).json({
                status: false,
                message: `Data Car not found`
            })
        }

        /** execute for delete event */
        const dataCar = await prisma.car.delete({ where: { id: id }})

        return response.status(200).json({
            status: true,
            message: `Data Car has been deleted`
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

export { createCar, readCar, updateCar, deleteCar }