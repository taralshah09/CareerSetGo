import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null); 
  const [questionCount, setQuestionCount] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); 

  const headingText =
    "Tell me a bit about yourself. What are your key skills and your experience?";

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
    if (sender === "bot") speak(text);
  };

  const fetchAIResponse = async (userInput) => {
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyD3rn502lgtJKrJNWtfwwSQN6vw96la53U");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Formulate the prompt
      const prompt = `You are an AI interview assistant. Based on the user's input: - Ask clarifying questions about their profile (skills, experience, goals). - Once the profile is complete, ask skill-based questions. - Assign scores to each answer based on its quality or relevance. User Input: ${userInput} Response Format: - If asking questions: Return only the question. - If evaluating answers: Provide a concise explanation and update the score.`;

      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Oops, something went wrong. Please try again!";
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!currentInput.trim() || questionCount >= 10) return;

    addMessage(currentInput, "user");

    setUserAnswers((prev) => [...prev, currentInput]);

    const botResponse = await fetchAIResponse(currentInput);
    addMessage(botResponse, "bot");

    if (botResponse.includes("Score:")) {
      const extractedScore = parseInt(botResponse.match(/Score: (\d+)/)?.[1]);
      if (extractedScore) setScore((prev) => prev + extractedScore);
    }
    
    setQuestionCount((prev) => prev + 1);

    setCurrentInput("");
  };

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setCurrentInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };
    } else {
      alert("Speech recognition not supported in this browser.");
    }
  };

  // Handle final scoring after 10 questions
  useEffect(() => {
    if (questionCount === 10) {
      const calculateFinalScore = async () => {
        setLoading(true);
        try {
          const genAI = new GoogleGenerativeAI("AIzaSyD3rn502lgtJKrJNWtfwwSQN6vw96la53U");
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

          // Formulate a prompt to evaluate all the answers given by the user
          const prompt = `You are an AI interview assistant. Evaluate the following answers based on their quality and relevance: User's answers: ${userAnswers.join(" ")} After evaluating, provide the final score for this user (out of 10). Response Format: - Provide the final score and a brief explanation of how you calculated it.`;
// duplicate que removal, enhance the prompt and try it will ask 1 que 

          const result = await model.generateContent(prompt);
          addMessage(result.response.text(), "bot");
        } catch (error) {
          console.error("Error fetching final score:", error);
          addMessage("There was an issue calculating the score. Please try again later.", "bot");
        } finally {
          setLoading(false);
        }
      };

      calculateFinalScore();
    }
  }, [questionCount, userAnswers]);

  // Handle Enter key to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Heading */}
      <div className="chatbot-heading">{headingText}</div>

      {/* Chat History */}
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="message bot">...</div>}
      </div>

      {/* Hide Score Display Until 10 Questions Are Answered */}
      {questionCount === 10 && score !== null && (
        <div className="score-display">Your Final Score: {score} / 10</div>
      )}

      {/* Input Box */}
      <div className="input-container">
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown} 
          placeholder="Type your message..."
          disabled={questionCount === 10}
        />
        <button onClick={handleSend} disabled={loading || questionCount === 10}>
          Send
        </button>
        <button
          onClick={startListening}
          disabled={loading || isListening || questionCount === 10}
        >
          {isListening ? "Listening..." : "Speak"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;