import React, { useState, useEffect, useRef } from "react";
import { Send, User, Bot, ArrowDown, MessageCircleDashedIcon, X, Volume2 } from "lucide-react";
import gsap from "gsap";
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // État pour afficher/masquer le chat
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const cloudRef = useRef(null);
  useEffect(() => {
    // Animation du nuage avec GSAP
    gsap.fromTo(
      cloudRef.current,
      { x: -10, opacity: 0 }, // Position initiale à gauche et invisible
      {
        x: 45, // Se déplace légèrement vers la droite
        opacity: 1, // Apparait
        duration: 2,
        ease: "power1.inOut",
        repeat: -1, // Répétition infinie
        yoyo: true, // Revenir à la position de départ
      }
    );
  }, []);

  // Fonction pour lancer la synthèse vocale
  const speakMessage = (message) => {
    if (message.role === "assistant") {
      const speech = new SpeechSynthesisUtterance(message.content);
      speech.lang = "fr-FR"; // Langue de la synthèse vocale
      window.speechSynthesis.speak(speech);
    }
  };

  // Fonction pour envoyer un message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);

    try {
      const response = await fetch(import.meta.env.VITE_EXPRESS_URL + "/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      console.error("Erreur API:", error);
    }

    setInput("");
    scrollToBottom();
  };

  // Fonction pour scroller vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Gère l'affichage de l'arrowDown selon le scroll du chat uniquement
  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    if (!chatContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      setShowScrollButton(scrollHeight - scrollTop > clientHeight + 50);
    };

    chatContainer.addEventListener("scroll", handleScroll);
    handleScroll(); // Vérifie dès le début

    return () => {
      chatContainer.removeEventListener("scroll", handleScroll);
    };
  }, [chatContainerRef.current]); // Dépendance pour réagir aux changements

  return (
    <>
      {/* Bulle de chat flottante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-blue-500 p-3 rounded-full shadow-lg text-white hover:bg-blue-600 flex items-center justify-center z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircleDashedIcon size={24} />}
      </button>

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 md:bottom-20 md:right-6 w-80 md:w-96 bg-white shadow-xl rounded-3xl p-4 z-50">

          {/* Zone de chat */}
          <div
            ref={chatContainerRef}
            className="h-80 overflow-y-auto border rounded-3xl border-gray-300  bg-gray-50 relative"
          >
            
          <h2 className="mt-3 text-lg font-semibold text-gray-800 text-center flex items-center justify-center flex-col relative">
            <span className="mt-4">
              AsciiBot
            </span>
            <MessageCircleDashedIcon
              ref={cloudRef}
              size={30}
              className="absolute top-[-13px] text-blue-500 animate-pulse"
            />
          </h2 >
            <div className="mt-1 mb-2 text-center text-xs text-gray-400">v1.0</div>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 p-2  ${msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                {msg.role === "assistant" && <Bot className="text-blue-500" />}
                <div
                  className={`px-4 py-2 rounded-lg text-gray-800 ${msg.role === "user"
                      ? "bg-[#B2EDF2] self-end"
                      : "bg-blue-gray-100 self-start"
                    }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && <User className="text-gray-700" />}

                {/* Ajouter un bouton de Text-to-Speech pour les messages de l'assistant */}
                {msg.role === "assistant" && (
                  <button
                    onClick={() => speakMessage(msg)}
                    className="ml-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    <Volume2 size={15} />

                  </button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Flèche pour revenir en bas */}
          {showScrollButton && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-4 transform left-1/2 -translate-x-1/2 bg-blue-500 p-2 rounded-full shadow-lg text-white hover:bg-blue-600 z-40"
            >
              <ArrowDown size={24} />
            </button>
          )}

          {/* Input et bouton d'envoi */}
          <div className="flex items-center gap-2 mt-3 pt-3">
      <div className="flex-1 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          className="w-full px-4 py-2 mx-2 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder:text-gray-400 placeholder:transition-all placeholder:duration-300 placeholder:hover:translate-x-2"
        />
        {/* Animation du placeholder au survol */}
      </div>
      <button
        onClick={() => sendMessage(input)}
        className="cursor-pointer p-3 text-blue-700 absolute right-3 bg-transparent transition-all duration-300 hover:scale-110 flex items-center justify-center"
      >
        <Send size={20} className="transform transition-transform duration-300 hover:rotate-12" />
      </button>
    </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
