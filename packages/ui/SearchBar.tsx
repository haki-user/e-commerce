import React, { useState, useEffect, useRef } from "react";
// import { useRecoilState } from "recoil";
// import { searchState } from "recoil-state";
import { useNavigate, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { queryState } from "recoil-state";
import { useSnackbar, SnackbarType } from "ui";
import axios, { AxiosError } from "axios";
import "./searchbar.css";

export const SearchBar: React.FC = () => {
  //   const [search, setSearch] = useRecoilState(searchState);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const setQuery = useSetRecoilState(queryState);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname)
  const { showSnackbar } = useSnackbar();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (e.key === "Enter") {
      //   setSearch(input);
      setQuery((prev) => ({ ...prev, name: input }));
      // navigate(`/search${input ? `?q=${input}` : ""}`);
      // if(location.pathname !== "/store") navigate("/store");
      navigate("/store");
    }
  };

  const handleSuggestions = async () => {
    try {
      const response = await axios.get("/products/suggestions", {
        params: {
          q: input,
        },
      });
      console.log(response.data.productNames);
      setSuggestions(response.data.productNames);
      console.log(suggestions);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError<{ message: string }>;
        showSnackbar(
          SnackbarType.ERROR,
          axiosError.response?.data.message || axiosError.message
        );
        return;
      }
      console.error(e);
    }
  };

  useEffect(() => {
    console.log("inp", input);
    if (input === "") {
      console.log("kkk");
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(() => {
      handleSuggestions();
    }, 200);
    return () => clearTimeout(timer);
  }, [input]);

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
    <div
      className={`searchbar ${isExpanded ? "expanded" : ""}`}
      style={{ display: "flex", flexDirection: "column" }}
    >
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
      {suggestions.length > 0 ? (
        <div
          className={`suggestions-container${isExpanded ? "-expanded" : ""}`}
        >
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="suggestion"
              onMouseDown={() => {
                // e.preventDefault();
                setInput(suggestion);
                setQuery((prev) => ({ ...prev, name: suggestion }));
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
