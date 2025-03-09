import { useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_IO_URL);

function ClientChat() {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (message.trim() !== "") {
            socket.emit("newMessage", { text: message, time: new Date().toLocaleTimeString() });
            setMessage("");
        }
    };

    return (
        <div className="p-4">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écrire un message..."
                className="border p-2 rounded mr-2"
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded">
                Envoyer
            </button>
        </div>
    );
}

export default ClientChat;
