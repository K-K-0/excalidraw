import express from 'express'
import { prismaClient } from '@repo/db/client'
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from '@repo/common/types'


const app = express()
app.use(express.json());


app.post("/signup", async (req,res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    try {
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.email,
                // TODO: Hash the pw
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })
    } catch (e) {
        res.status(411).json({
            message: "User already exists with this username"
        })
    }
})

app.post("/signin", (req,res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

})

app.post('/room', (req,res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

})

app.listen(8000)