"use client";
import { motion } from "framer-motion";
import { Copy, ClipboardPaste } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const Hero = () => { 
  const [inputText, setInputText] = useState("");
  const [aiResponse, setAiResponse] = useState(
    "AI summary will appear here..."
  );

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(aiResponse);
      toast.success("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy text");
    }
  };

  const handleSummarize = () => {
    setAiResponse(
      "This is a placeholder summary of the text you entered. The actual summarization logic is not implemented yet."
    );
  };

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-100px)]">
        {/* First Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-2 border-black rounded-lg p-4 flex flex-col relative"
        >
          {inputText === "" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                onClick={handlePaste}
                className="bg-transparent text-gray-800 font-bold py-4 px-4 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer border-black border hover:border-2"
              >
                <ClipboardPaste className="h-8 w-8" />
              </button>
            </div>
          )}
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="border rounded-lg w-full flex-grow px-3 py-4 cursor-text text-lg "
            placeholder="Enter your text here..."
          ></textarea>
          <button
            onClick={handleSummarize}
            className="bg-[#55d082] hover:bg-[#4abf72] text-white font-bold py-2 px-4 rounded mt-2"
          >
            Summarize
          </button>
        </motion.div>

        {/* Second Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-2 border-[#55d082] rounded-lg p-4 flex flex-col"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-[#55d082]">
              AI Response
            </h2>
            <button
              onClick={handleCopy}
              className="bg-transparent hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded"
            >
              <Copy />
            </button>
          </div>
          <textarea
            value={aiResponse}
            className="border rounded-lg w-full flex-grow p-2 bg-gray-100"
            placeholder="AI summary will appear here..."
            readOnly
          ></textarea>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;