import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function BabyRevealSite() {
  const [showReveal, setShowReveal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Data estimada de chegada
  const estimatedBirthDate = new Date("2025-12-01"); // Altere para a data estimada do parto
  const [timeRemaining, setTimeRemaining] = useState("");

  // Calculando a contagem regressiva
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = estimatedBirthDate - now;

      if (timeDifference <= 0) {
        setTimeRemaining("Chegou a hora!"); // Quando a data chegar
      } else {
        const weeksRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
        setTimeRemaining(`${weeksRemaining} semanas restantes`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [estimatedBirthDate]);

  const handleAddMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage(""); // Limpar campo de mensagem após enviar
    }
  };

  const revealText = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-center mt-10 space-y-6"
    >
      <h2 className="text-2xl sm:text-3xl font-semibold">Sim… Estamos esperando o nosso</h2>
      <h1 className="text-4xl sm:text-5xl font-bold text-pink-600">Marcelinho Junior!</h1>
      <p className="text-lg">{timeRemaining}</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center p-4">
      {!showReveal ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center space-y-6"
        >
          <h1 className="text-3xl sm:text-4xl font-bold">A vida nos deu o maior presente que poderíamos receber…</h1>
          <h2 className="text-2xl">Em breve, seremos três!</h2>
          <button
            onClick={() => setShowReveal(true)}
            className="mt-6 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-2xl shadow-lg transition"
          >
            Clique para descobrir 💖
          </button>
        </motion.div>
      ) : (
        revealText
      )}

      <div className="mt-12 text-center space-y-4">
        <h3 className="text-xl font-semibold">Deixe uma mensagem para o Marcelinho Junior:</h3>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escreva sua mensagem aqui..."
          className="w-80 p-2 border-2 rounded-md"
        ></textarea>
        <button
          onClick={handleAddMessage}
          className="mt-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl shadow-lg"
        >
          Enviar Mensagem
        </button>

        <div className="mt-8 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="p-4 bg-gray-200 rounded-lg shadow-md">
              <p className="text-lg">{message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
