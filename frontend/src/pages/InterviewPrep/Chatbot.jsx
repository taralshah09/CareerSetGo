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
  const [showInterviewTips, setShowInterviewTips] = useState(false);
  const [finalScoreDetails, setFinalScoreDetails] = useState(null);
  const [isInterviewCompleted, setIsInterviewCompleted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const chatEndRef = useRef(null);
  const timerRef = useRef(null);

  const headingText =
    "Tell me a bit about yourself. What are your key skills and your experience?";

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const interviewTips = {
    dos: [
      "Research the company before the interview",
      "Prepare specific examples that showcase your skills",
      "Practice common interview questions",
      "Dress professionally and appropriately",
      "Arrive 10-15 minutes early",
      "Bring copies of your resume",
      "Maintain good eye contact",
      "Listen carefully and ask thoughtful questions"
    ],
    donts: [
      "Don't speak negatively about previous employers",
      "Avoid using slang or informal language",
      "Don't provide vague or generic answers",
      "Avoid interrupting the interviewer",
      "Don't lie or exaggerate your qualifications",
      "Avoid discussing salary too early",
      "Don't use your phone during the interview",
      "Avoid appearing unprepared or disinterested"
    ]
  };

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
        return ""; 
      }

      const genAI = new GoogleGenerativeAI("AIzaSyD3rn502lgtJKrJNWtfwwSQN6vw96la53U");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      const prompt = `
      You are an AI interview assistant. Based on the user's input:
      - Ask one relevant question about their profile (skills, experience, goals).
      - Avoid repeating questions. Previously asked questions: ${askedQuestions.join(", ")}.
      - If skill-based questions are appropriate, ask based on prior responses.
      - Stop if 10 questions have been asked.
      User Input: "${userInput}"
      Response Format:
      - If asking: Return only the question.
      - If evaluating: Provide a concise evaluation.
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

  const startTimer = () => {
    setTimerActive(true);
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setTimerActive(false);
  };

  const handleSend = async () => {
    if (!currentInput.trim() || questionCount >= 10) {
      return;
    }
  
    if (questionCount === 0 && !timerActive) {
      startTimer(); 
    }

    addMessage(currentInput, "user");
    setUserAnswers((prev) => [...prev, currentInput]);
  
    const botResponse = await fetchAIResponse(currentInput);
  
    if (questionCount < 10) {
      addMessage(botResponse, "bot");
      setAskedQuestions((prev) => [...prev, botResponse]);
      setQuestionCount((prev) => prev + 1);
    }
  
    if (questionCount === 9) {
      stopTimer(); 
      await calculateFinalScore();
    }
  
    setCurrentInput("");
  };

  const calculateFinalScore = async () => {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyD3rn502lgtJKrJNWtfwwSQN6vw96la53U");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        You are an AI interview assistant. Evaluate the following answers:
        User's answers: ${userAnswers.join(" ")}
        Total time taken by the user: ${Math.floor(elapsedTime / 60)} minutes and ${elapsedTime % 60} seconds.
        Provide a detailed score breakdown including:
        1. Overall score out of 10
        2. Strengths in the interview
        3. Areas for improvement
        4. Impact of time taken on performance
        5. Brief performance summary
      `;

      const result = await model.generateContent(prompt);
      const scoreDetails = result.response.text().trim();

      setIsInterviewCompleted(true);
      setFinalScoreDetails(scoreDetails);
    } catch (error) {
      console.error("Error calculating final score:", error);
      setFinalScoreDetails("There was an issue calculating the score. Please try again later.");
    }
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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

      {/* Time Tracker */}
      <div className="time-tracker">
        Time Elapsed: {Math.floor(elapsedTime / 60)}:{elapsedTime % 60 < 10 ? `0${elapsedTime % 60}` : elapsedTime % 60} (mm:ss)
      </div>

      {/* Interview Tips Section */}
      <div className="interview-tips-container">
        <button 
          className="tips-toggle-btn" 
          onClick={() => setShowInterviewTips(!showInterviewTips)}
        >
          {showInterviewTips ? 'Hide Interview Tips' : 'Show Interview Tips'}
        </button>
        
        {showInterviewTips && (
          <div className="tips-content">
            <div className="tips-section dos">
              <h3>Do's</h3>
              <ul>
                {interviewTips.dos.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <div className="tips-section donts">
              <h3>Don'ts</h3>
              <ul>
                {interviewTips.donts.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

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
                {speakingIndex === index ? "Stop" : "Speak"}
              </button>
            )}
          </div>
        ))}
        {loading && <div className="message bot">Typing ...</div>}
        <div ref={chatEndRef} />
      </div>

      {isInterviewCompleted && finalScoreDetails && (
        <div className="final-score-container">
          <div className="final-score-card">
            <h2>Interview Assessment</h2>
            <pre className="final-score-details">{finalScoreDetails}</pre>
            <p>Total time taken: {Math.floor(elapsedTime / 60)} minutes and {elapsedTime % 60} seconds.</p>
          </div>
        </div>
      )}


      <div className="input-container">
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={isInterviewCompleted}
        />
        <button 
          onClick={handleSend} 
          disabled={loading || isInterviewCompleted}
        >
          Send
        </button>
        <button
          onClick={startListening}
          disabled={loading || isListening || isInterviewCompleted}
        >
          {isListening ? "Listening..." : "Speak"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
