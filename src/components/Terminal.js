import React, { useEffect, useState, useRef, useCallback } from "react";

export default function Terminal({ messages = [] }) {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState([]);

  const base = " $";

  const scrollRef = useRef();
  const inputRef = useRef();

  function submit(message) {
    setLines((l) => [...l, message]);
    setInput("");
  }

  const displayLine = useCallback(
    (messageIndex = 0) => {
      // if there are no more messages to print return
      if (messageIndex === messages.length) {
        inputRef.current.focus();
        return;
      }

      let cursor = 0;
      const message = messages[messageIndex];

      if (message.trim().length === "") {
        submit(message);
      }

      // print one character per 50ms to look like typing
      const interval = setInterval(() => {
        // if we're at the end of the message, stop the interval and press enter
        if (cursor === message.length) {
          clearInterval(interval);
          submit(message);
          setTimeout(() => {
            displayLine(messageIndex + 1);
          }, 1000);
          return;
        }

        // update input as if we were typing in the input
        setInput((i) => i + message[cursor]);
        cursor += 1;
      }, 40);
    },
    [messages]
  );

  const flexRow = "flex flex-row align-center";

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.stopPropagation();
      submit(input);
    }
  }

  function handleEntry(e) {
    setInput(e.currentTarget.value);
  }

  useEffect(() => {
    // kick off entering text
    displayLine(0);
  }, [displayLine]);

  // scroll to bottom on add line
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  function parseLink(text) {
    if (!/\[(.+)\]\((.+)\)/.test(text)) {
      return text;
    }

    const matches = /(.*)\[(.+)\]\((.+)\)(.*)/.exec(text);

    return (
      <span>
        {matches[1]}
        <a className="app-text input blue" href={matches[3]}>
          {matches[2]}
        </a>
        {matches[4]}
      </span>
    );
  }
  return (
    <div className="app-body" ref={scrollRef}>
      {lines &&
        lines.map((l, i) => (
          <div key={l + i} className={`${flexRow} mb2`}>
            <div className="app-text b theme-blue mr2">{base}</div>
            <div className="app-text">{parseLink(l)}</div>
          </div>
        ))}
      <div className={flexRow}>
        <div className="app-text b theme-blue mr2">{base}</div>
        <textarea
          className="app-text input"
          onKeyDown={handleKeyPress}
          onChange={handleEntry}
          value={parseLink(input)}
          ref={inputRef}
        />
      </div>
    </div>
  );
}
