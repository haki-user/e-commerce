import React, { useState, useEffect, useRef } from "react";
// import { useRecoilState } from "recoil";
// import { searchState } from "recoil-state";
import { useNavigate } from "react-router-dom";
import "./searchbar.css";

export const SearchBar: React.FC = () => {
  //   const [search, setSearch] = useRecoilState(searchState);
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      //   setSearch(input);
      navigate(`/search${input ? `?q=${input}` : ""}`);
    }
  };

  const hideSearchBar = () => {
    setIsExpanded(false);
  };

  const showSearchBar = () => {
    setIsExpanded(true);
    if (!isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    console.log("yes");
    const handleCtrShiftF = (e: KeyboardEvent) => {
      console.log("yo");
      if (e.ctrlKey && e.shiftKey && (e.key === "f" || e.key === "F")) {
        if (inputRef.current) {
          if (!isExpanded) setIsExpanded(true);
          inputRef.current.focus();
        }
      }
    };
    window.addEventListener("keydown", handleCtrShiftF);
    return () => {
      window.removeEventListener("keydown", handleCtrShiftF);
    };
  }, [isExpanded]);

  return (
    <div className={`searchbar ${isExpanded ? "expanded" : ""}`}>
      {
        <div
          data-tooltip="Custom tooltip message"
          className={`custom-tooltip-trigger expanded-search-container${
            isExpanded ? "-show" : ""
          }`}
          style={{
            width: `${!isExpanded ? "32px" : "200px"}`,
            transition: `${isExpanded ? "all 0.7s ease" : "all 0.7s ease"}`,
            backgroundColor: `${isExpanded ? "#ddd" : "inherit"}`,
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="One Piece"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSearch}
            onBlur={hideSearchBar}
            className={`expanded-input ${
              isExpanded ? "expanded-input-show" : ""
            }`}
          />
          {
            <img
              data-tooltip="Custom tooltip message"
              src="https://gist.githubusercontent.com/haki-user/42fe4f45c23717405c379bd4ac38120d/raw/01bcffd864ba95b34a11c08fbae51db4db2964bc/search.svg"
              alt="Search"
              className={`search-icon-inside ${
                isExpanded ? "expanded-icon" : " custom-tooltip-trigger "
              } search-icon `}
              onClick={showSearchBar}
              style={{
                padding: 8,
              }}
            />
          }
          <div className="tooltip">
            Search &nbsp; <span className="tooltip-key">Ctrl</span>
            <span className="tooltip-key">Shift</span>
            <span className="tooltip-key">F</span>
          </div>
        </div>
      }
    </div>
  );
};
