import express from "express"
import carRent_route from "./route/carRentRoute";

/** buat wadah untuk inisiasi express */
const app = express()

/** mendefinisikan PORT berjalannya server */
const PORT = 8000

/** allow to read JSON as request */
app.use(express.json())

app.use(carRent_route)

/** run server */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
