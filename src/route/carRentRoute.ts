import express from "express"
import { verifyAdmin } from "../middleware/verifyAdmin"
import { Login, createAdmin, deleteAdmin, readAdmin, updateAdmin } from "../controller/adminController"
import { createCar, deleteCar, readCar, updateCar } from "../controller/carController"
import { createRent, deleteRent, readRent, updateRent } from "../controller/rentController"
const app = express()


/** allow to read a json from body */
app.use(express.json())



/** address for get admin data */
app.get(`/admin`, verifyAdmin, readAdmin)
/** address for add new admin */
app.post(`/admin`, createAdmin)
/** address for update admin */
app.put(`/admin/:id`, verifyAdmin, updateAdmin)
/** address for delete admin */
app.delete(`/admin/:id`, verifyAdmin, deleteAdmin)

/** address for login admin */
app.post('/admin/login', Login)



/** address for get car data */
app.get(`/car`, readCar)
/** address for add new car */
app.post(`/car`, createCar)
/** address for update car */
app.put(`/car/:id`, updateCar)
/** address for delete car */
app.delete(`/car/:id`, deleteCar)



/** address for get rent data */
app.get(`/rent`, readRent)
/** address for add new rent */
app.post(`/rent`, createRent)
/** address for update rent */
app.put(`/rent/:id`, updateRent)
/** address for delete rent */
app.delete(`/rent/:id`, deleteRent)




export default app