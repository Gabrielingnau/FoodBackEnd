require("express-async-errors")
require("dotenv/config")

const express = require("express");
const routes = require("./routes")
const AppError = require("./utils/AppError")
const migrationsRun = require("./database/sqlite/migrations");
const cors = require("cors")
const uploadConfig = require("./configs/upload")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes)

migrationsRun()

app.use((error, request, response, next) =>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)

    return response.status(500).json({
        status:"error",
        message: "Internal server error"
    })

})



const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server is reunning on port ${PORT}`))