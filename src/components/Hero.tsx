"use client";
import React, { useState } from 'react';

const Hero = () => {
  const [inputText, setInputText] = useState("");
  const [aiResponse, setAiResponse] = useState("AI summary will appear here...");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(aiResponse);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSummarize = () => {
    
    setAiResponse("This is a placeholder summary of the text you entered. The actual summarization logic is not implemented yet.");
  };

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-100px)]">
        {/* First Box */}
        <div className="border-2 border-[#55d082] rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-[#55d082]">Your Text</h2>
            <button
              onClick={handlePaste}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Paste
            </button>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="border rounded-lg w-full flex-grow p-2"
            placeholder="Enter your text here..."
          ></textarea>
          <button
            onClick={handleSummarize}
            className="bg-[#55d082] hover:bg-[#4abf72] text-white font-bold py-2 px-4 rounded mt-2"
          >
            Summarize
          </button>
        </div>

        {/* Second Box */}
        <div className="border-2 border-[#55d082] rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-[#55d082]">AI Response</h2>
            <button
              onClick={handleCopy}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Copy
            </button>
          </div>
          <textarea
            value={aiResponse}
            className="border rounded-lg w-full flex-grow p-2 bg-gray-100"
            placeholder="AI summary will appear here..."
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Hero;