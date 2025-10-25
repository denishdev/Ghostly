"use client";
import { motion } from "framer-motion";
import { ClipboardPaste } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { CopyButton } from "./ui/copy-component";
import { TextGenerateEffect } from "./ui/text-generation";

const Hero = () => {
  const [inputText, setInputText] = useState("");
  const [summaryType, setSummaryType] = useState("professional");
  const [aiResponse, setAiResponse] = useState("Summary will appear here...");
  const [loading, setLoading] = useState(false);

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

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter text to summarize");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, type: summaryType }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Summarization failed");
      }
      const data = await res.json();
      setAiResponse(data.summary || "No summary returned");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Summarization error";
      toast.error(message);
    } finally {
      setLoading(false);
    }
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
            className="border rounded-lg w-full flex-grow px-3 py-4 cursor-text text-lg outline-none"
            placeholder="Enter your text here..."
          ></textarea>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <label className="font-semibold">Tone:</label>
              <select
                id="summary-type"
                value={summaryType}
                onChange={(e) => setSummaryType(e.target.value)}
                className="border rounded-lg px-2 py-1 cursor-pointer outline-none"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="funny">Funny</option>
              </select>
            </div>
            <button
              onClick={handleSummarize}
              disabled={loading}
              className="px-6 py-2 text-white bg-[#55d082] rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Summarizing..." : "Summarize"}
            </button>
          </div>
        </motion.div>

        {/* Second Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-2 border-black rounded-lg p-4 flex flex-col"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-black">
              Summary
            </h2>
            <CopyButton
              onClick={handleCopy}
              content='copy'
              variant="ghost"
              size="md"
            />
          </div>
          <div
            className="border rounded-lg w-full flex-grow px-3 py-4 cursor-text text-lg outline-none overflow-auto"
          >
            <TextGenerateEffect key={aiResponse} words={aiResponse} />
          </div>        
        </motion.div>
      </div>


    </div>
  );
};

export default Hero;