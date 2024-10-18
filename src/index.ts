import express, { Application,Request,Response } from "express"
import "dotenv/config"


const app: Application = express()
const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
    console.log(`Server is running...${PORT}`);
    
})

app.get("/", (req: Request, res: Response) => {
    res.json({msg:"Hello world..."})
})