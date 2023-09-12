import React, { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { searchState } from "recoil-state";
import { useNavigate } from "react-router-dom";
import "./searchbar.css";

export const SearchBar: React.FC = () => {
  //   const [search, setSearch] = useRecoilState(searchState);
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className={`searchbar ${isExpanded ? "expanded" : ""}`}>
      {
        <div
          className={`expanded-search-container${isExpanded ? "-show" : ""}`}
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
              src="https://gist.githubusercontent.com/haki-user/42fe4f45c23717405c379bd4ac38120d/raw/01bcffd864ba95b34a11c08fbae51db4db2964bc/search.svg"
              alt="Search"
              className={`search-icon-inside ${
                isExpanded ? "expanded-icon" : ""
              } search-icon`}
              onClick={showSearchBar}
              style={{
                padding: 8,
              }}
            />
          }
        </div>
      }
    </div>
  );
};
