import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
  ts: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m1",
    role: "assistant",
    text: "Hello! I'm the Hub Assistant — how can I help you today?",
    ts: new Date().toISOString(),
  },
  {
    id: "m2",
    role: "user",
    text: "Show me recent documents uploaded by Engineering.",
    ts: new Date().toISOString(),
  },
  {
    id: "m3",
    role: "assistant",
    text: "Sure — I can search by department, date, or title. Try: 'recent engineering docs'.",
    ts: new Date().toISOString(),
  },
];

const QUICK_REPLIES = [
  "List recent uploads",
  "Search by department",
  "Show safety guidelines",
  "How to upload a document?",
];

const MODELS = ["Assistant v1", "Assistant v2 (fast)", "Legacy GPT"];

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [isListening, setIsListening] = useState(false); // UI only
  const [showSidebar, setShowSidebar] = useState(true);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // scroll to bottom when messages update
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    const msg: Message = {
      id: String(Date.now()),
      role: "user",
      text: content,
      ts: new Date().toISOString(),
    };
    setMessages((m) => [...m, msg]);

    // append a placeholder assistant reply (UI-only)
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: String(Date.now() + 1),
          role: "assistant",
          text: `Demo reply to: "${content}" (model: ${selectedModel})`,
          ts: new Date().toISOString(),
        },
      ]);
    }, 700);

    setInput("");
  };

  const onQuickReply = (text: string) => {
    sendMessage(text);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Chatbot</h1>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Model</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="px-3 py-1 border rounded"
            aria-label="Select model"
          >
            {MODELS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowSidebar((s) => !s)}
            className="px-3 py-1 bg-gray-100 rounded"
            title="Toggle sidebar"
          >
            {showSidebar ? "Hide" : "Show"} tips
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border overflow-hidden grid grid-cols-1 lg:grid-cols-4">
        {/* Chat area */}
        <div className="col-span-1 lg:col-span-3 flex flex-col h-[70vh]">
          {/* Chat header */}
          <div className="px-4 py-3 border-b flex items-center gap-3">
            <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-100">
              <Image src="/images/avatars/default.jpg" alt="assistant" fill style={{ objectFit: "cover" }} />
            </div>
            <div>
              <div className="font-semibold">Hub Assistant</div>
              <div className="text-xs text-gray-500">Online · {selectedModel}</div>
            </div>
            <div className="ml-auto text-xs text-gray-500">Demo UI</div>
          </div>

          {/* Messages list */}
          <div ref={listRef} className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[72%] px-4 py-2 rounded-lg ${m.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none"}`}>
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  <div className="text-[10px] text-gray-400 mt-1 text-right">{new Date(m.ts).toLocaleTimeString()}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          <div className="px-4 py-2 border-t bg-gray-50 flex gap-2 items-center overflow-x-auto">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => onQuickReply(q)}
                className="text-xs px-3 py-1 border rounded-full bg-white shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Composer */}
          <div className="px-4 py-3 border-t flex items-center gap-2">
            <button
              type="button"
              title="Attach file"
              className="p-2 rounded-md hover:bg-gray-100"
            >
              📎
            </button>

            <button
              type="button"
              title="Emoji"
              className="p-2 rounded-md hover:bg-gray-100"
            >
              😊
            </button>

            <input
              aria-label="Message input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Type a message and press Enter..."
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring"
            />

            <button
              onClick={() => setIsListening((s) => !s)}
              title="Voice (UI only)"
              className={`px-3 py-2 rounded ${isListening ? "bg-red-100" : "bg-gray-100"}`}
            >
              🎙
            </button>

            <button
              onClick={() => sendMessage()}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Send
            </button>
          </div>
        </div>

        {/* Right sidebar (tips, history) */}
        {showSidebar && (
          <aside className="col-span-1 border-l p-4 bg-white">
            <h3 className="font-semibold mb-2">Quick Tips</h3>
            <ul className="text-sm text-gray-700 space-y-2 mb-4">
              <li>• Ask: "List documents uploaded last week"</li>
              <li>• Try searching by department: e.g., "Engineering"</li>
              <li>• Use quick replies for common tasks</li>
            </ul>

            <h4 className="font-semibold mb-2">Conversation Shortcuts</h4>
            <div className="flex flex-col gap-2">
              <button className="text-sm px-3 py-2 border rounded text-left">Export chat (UI-only)</button>
              <button className="text-sm px-3 py-2 border rounded text-left">Clear conversation</button>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              This is a frontend demo. Integrate with your assistant backend to enable real replies, streaming, and file handling.
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
