import express from 'express'
import { prismaClient } from '@repo/db/client'
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from '@repo/common/types'
import JWT_SECRET from '@repo/backend-common/config';
import jwt from 'jsonwebtoken'
import cors from "cors"
import { middleware } from './middleware';


const app = express()
app.use(express.json());
app.use(cors())


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

app.post("/signin", async (req,res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data?.email,
            password: parsedData.data.password
        }
    })

    if (!user) {
        res.status(403).json({
            message: "Not Authorized"
        })
        return
    }

    const token = jwt.sign({ userId: user?.id }, JWT_SECRET)

    res.json({ token })

})

app.post('/room', middleware, async (req,res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
             message: "Incorrect inputs"
        })
        return;
    }
    const userId = req.userId

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })

        res.json({ room })
    } catch (error) {
        res.status(411).json({
            message: "Room already exist with this name"
        })
    }

})

app.get("/chats/:roomId", async (req, res) => {
    console.log("hello")
    try {
        const roomId = req.params.roomId;
        console.log(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: Number(roomId)
            },
            orderBy: {
                id: "desc"
            },
            take: 1000
        });

        res.json({
            messages
        })
    } catch (e) {
        console.log(e);
        res.json({
            messages: []
        })
    }

})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
