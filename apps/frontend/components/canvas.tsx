import { useEffect, useRef, useState } from "react"
import { CircleIcon, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { IconButton } from "./IconButton";
import { Game } from "../draw/Game";
import './canvas.css'


export type Tool = "circle" | "rect" | "pencil";

export function Canvas({
    roomId,
    socket
}: {
    socket: WebSocket
    roomId: string
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [ game, setGame ] = useState<Game>()
    const [ selectedTool, setSelectedTool ] = useState<Tool>("circle")

    useEffect(() => {
        game?.setTool(selectedTool)
    }, [selectedTool,game])

    useEffect(() => {
        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket)
            setGame(g)

            return () => {
                g.destroy()
            }
        }
    },[canvasRef, roomId, socket])

    return <div className="canvas-container">
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            <TopBar setSelectedTool={setSelectedTool} selectedTool={selectedTool}/>
        </div>
}

function TopBar({ selectedTool, setSelectedTool }: {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}) {
    return (
        <div className="top-bar">
            <div className="flex">
                <IconButton onClick={() => setSelectedTool("pencil")}
                    activated={selectedTool === "pencil"}
                    icon={<Pencil />}
                />
                <IconButton onClick={() => setSelectedTool("rect")}
                    activated={selectedTool === "rect"}
                    icon={<RectangleHorizontalIcon />}
                />
                <IconButton onClick={() => setSelectedTool("circle")}
                    activated={selectedTool === "circle"}
                    icon={<CircleIcon />}
                />
            </div>
        </div>
    );
}