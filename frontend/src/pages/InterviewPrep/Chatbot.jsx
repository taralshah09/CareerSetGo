import React, { useState, useEffect, useRef } from "react";
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
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [speakingIndex, setSpeakingIndex] = useState(null);

  const chatEndRef = useRef(null); // Reference to the bottom of the chat

  const headingText =
    "Tell me a bit about yourself. What are your key skills and your experience?";

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setSpeakingIndex(null);
  };

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const fetchAIResponse = async (userInput) => {
    setLoading(true);
    try {
      if (questionCount >= 10) {
        return ''; // Explicitly return empty string if at or beyond 10 questions
      }

      const genAI = new GoogleGenerativeAI("AIzaSyD3rn502lgtJKrJNWtfwwSQN6vw96la53U");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      const prompt = `
        You are an AI interview assistant. Based on the user's input:
        - Ask only one question at a time about their profile (skills, experience, goals).
        - Avoid repeating questions. Previously asked questions: ${askedQuestions.join(", ")}.
        - If it's time for skill-based questions, ask them based on the user's earlier responses.
        - Assign a score (1-10) to answers and provide the total score after all questions.
        - IMPORTANT: Do not generate a question if 10 questions have already been asked.
        User Input: "${userInput}"
        Response Format:
        - If asking questions: Only return the question.
        - If evaluating answers: Provide a concise evaluation and updated score.
      `;
  
      const result = await model.generateContent(prompt);
      const botResponse = result.response.text().trim();
  
      return botResponse;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Oops, something went wrong. Please try again!";
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!currentInput.trim() || questionCount >= 10) {
      return; // Completely stop processing if at or beyond 10 questions
    }
  
    addMessage(currentInput, "user");
    setUserAnswers((prev) => [...prev, currentInput]);
  
    const botResponse = await fetchAIResponse(currentInput);
  
    // Only add a bot response if the question count is less than 10
    if (questionCount < 10) {
      addMessage(botResponse, "bot");
      setAskedQuestions((prev) => [...prev, botResponse]);
  
      if (botResponse.includes("Score:")) {
        const extractedScore = parseInt(botResponse.match(/Score: (\d+)/)?.[1]);
        if (extractedScore) setScore((prev) => (prev || 0) + extractedScore);
      }
  
      setQuestionCount((prev) => prev + 1);
    }
  
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

  // Scroll to the bottom of the chat whenever messages are updated
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Final scoring after 10 questions
  useEffect(() => {
    if (questionCount === 10) {
      const calculateFinalScore = async () => {
        setLoading(true);
        try {
          const genAI = new GoogleGenerativeAI("AIzaSyD3rn502lgtJKrJNWtfwwSQN6vw96la53U");
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

          const prompt = `
            You are an AI interview assistant. Evaluate the following answers:
            User's answers: ${userAnswers.join(" ")}
            Provide a final score (out of 10) and a brief explanation of how it was calculated.
          `;

          const result = await model.generateContent(prompt);
          addMessage(result.response.text().trim(), "bot");
        } catch (error) {
          console.error("Error calculating final score:", error);
          addMessage("There was an issue calculating the score. Please try again later.", "bot");
        } finally {
          setLoading(false);
        }
      };

      calculateFinalScore();
    }
  }, [questionCount, userAnswers]);

  const toggleSpeak = (text, index) => {
    if (speakingIndex === index) {
      stopSpeaking();
    } else {
      setSpeakingIndex(index);
      speak(text);
    }
  };

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
            {msg.sender === "bot" && (
              <button
                onClick={() => toggleSpeak(msg.text, index)}
                className="speak-button"
              >
                {speakingIndex === index ? "🔈 Stop" : "🔊 Speak"}
              </button>
            )}
          </div>
        ))}
        {loading && <div className="message bot">...</div>}
        <div ref={chatEndRef} /> {/* This div will trigger the scroll */}
      </div>

      {/* Score Display */}
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