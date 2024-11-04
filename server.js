import Connection from "./connection/connect.js";
import { app } from "./index.js";
import cors from 'cors'


Connection()



app.listen(8000,()=>{
    console.log(`server is running on port ${8000}`)
})