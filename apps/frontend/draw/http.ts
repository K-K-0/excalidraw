import { HTTP_BACKEND } from "@/config"
import axios from "axios"

export async function getExistingShape(roomId:string) {
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`)
    const messages = res.data.messages

    const shape = messages.map((x: {message:string}) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape
    })
    return shape
}