"use client"
import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./canvas";

export function RoomCanvas({roomId}: { roomId: string }) {
    const [ socket, setSocket ] = useState<WebSocket | null>(null)

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmZTcxYjEwYy00ZDc4LTQxMmUtYjliOS0wM2JlOGYxMmQzMGQiLCJpYXQiOjE3NTgwMjE5MTZ9.7048gaXqMJBLK_ea-ZjJJPW6kfD7BdxQIAB8GvBlEw0`)
        ws.onopen = () => {
            setSocket(ws)
            const data = JSON.stringify({
                type: "join_room",
                roomId
            })
            console.log(data)
            ws.send(data)
        }
    }, [roomId])

    if(!socket) {
        return <div>
            connecting to server....
        </div>
    }

    return <div>
        <Canvas roomId={roomId} socket={socket}/>
    </div>
}