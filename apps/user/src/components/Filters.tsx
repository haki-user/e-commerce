import React, { useState, useEffect } from "react";
import { MultiRangeSlider, InputOption, ToggleBox } from "ui";
import { useSetRecoilState } from "recoil";
import { queryState } from "recoil-state";
import "./filters.css";

const MAX = 15000;

// type filterType = "price" | "language" | "categories";
type sortType = "lt" | "gt" | "relavance";

export const Filters: React.FC<{
  sort: sortType;
  setSort: React.Dispatch<React.SetStateAction<sortType>>;
}> = ({ sort, setSort }) => {
  const [filterExpanded, setFilterExpanded] = useState(true);
  const [minSelect, setMinSelect] = useState(0);
  const [maxSelect, setMaxSelect] = useState(MAX);
  const [language, setLanguage] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const setQuery = useSetRecoilState(queryState);

  useEffect(() => {
    setQuery((prev) => {
      return {
        ...prev,
        language: language?.join(",") || "",
        categories: categories?.join(",") || "",
      };
    });
  }, [language, categories, setQuery]);

  useEffect(() => {
    // console.log("updating");
    const updateQueryTimer = setTimeout(() => {
      // console.log("updated");
      setQuery((prev) => {
        return {
          ...prev,
          min: minSelect.toString(),
          max: maxSelect.toString(),
        };
      });
    }, 1000);
    return () => clearTimeout(updateQueryTimer);
  }, [minSelect, maxSelect, setQuery]);

  if (minSelect > maxSelect) {
    const tmp = minSelect;
    setMinSelect(maxSelect);
    setMaxSelect(tmp);
  }

  return (
    <div
      className="filters-container"
      style={{
        width: "100%",
        minHeight: "max-content",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderBottom: "1px solid #ddd",
          padding: 16,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: "500",
            color: "grey",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => setFilterExpanded((prev) => !prev)}
        >
          <span style={{ paddingBottom: 5, cursor: "pointer" }}>Filter</span>
          <span
            style={{
              cursor: "pointer",
              transition: "all .3s ease-in-out",
              display: "inline-block",
              transform: filterExpanded ? "initial" : "rotate(-90deg)",
            }}
          >
            <img src="https://gist.githubusercontent.com/haki-user/722943fd6d2a2e4dc5ba3045cb164ae0/raw/236bc896893d869e0a1647ad97a6af718a503da8/expand-more-24-grey.svg" />
          </span>
        </div>
        <div
          style={{
            display: !filterExpanded ? "none" : "initial",
            padding: 8,
            cursor: "default",
          }}
        >
          <div style={{ paddingTop: 4 }}>
            <div style={{ fontWeight: 500, cursor: "default" }}>PRICE</div>
            <div>
              <MultiRangeSlider
                min={0}
                max={MAX}
                onChange={({ min, max }: { min: number; max: number }) => {
                  setMinSelect(min);
                  setMaxSelect(max);
                }}
              />
            </div>
          </div>
          <div style={{ paddingTop: 6 }}>
            <div style={{ paddingTop: 14 }}>
              <div style={{ fontWeight: 500 }}>LANGUAGE</div>
              <div style={{ margin: 8 }}>
                {/* <input className="toggle-box" id="header4" type="checkbox" />
                <label htmlFor="header4">Language</label> */}
                <div>
                  <InputOption
                    text="English"
                    callBack={() => {
                      if (language.includes("English")) {
                        setLanguage((prev) =>
                          prev.filter((e) => e !== "English")
                        );
                        return;
                      }
                      setLanguage((prev) => [...prev, "English"]);
                    }}
                  />
                  <InputOption
                    text="Japanese"
                    callBack={() => {
                      if (language.includes("Japanese")) {
                        setLanguage((prev) =>
                          prev.filter((e) => e !== "Japanese")
                        );
                        return;
                      }
                      setLanguage((prev) => [...prev, "Japanese"]);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 500 }}>CATEGORIES</div>
            <div>
              <ToggleBox text="Books">
                <div>
                  <InputOption
                    text="Manga"
                    callBack={() => {
                      if (categories.includes("Manga")) {
                        setCategories((prev) =>
                          prev.filter((e) => e !== "Manga")
                        );
                        return;
                      }
                      setCategories((prev) => [...prev, "Manga"]);
                    }}
                  />
                  <InputOption
                    text="Comics"
                    callBack={() => {
                      if (categories.includes("Comics")) {
                        setCategories((prev) =>
                          prev.filter((e) => e !== "Comics")
                        );
                        return;
                      }
                      setCategories((prev) => [...prev, "Comics"]);
                    }}
                  />
                </div>
              </ToggleBox>
              <ToggleBox text="Action Figures" />
            </div>
          </div>
        </div>
      </div>
      <Sort sort={sort} setSort={setSort} />
    </div>
  );
};

const Sort: React.FC<{
  sort: sortType;
  setSort: React.Dispatch<React.SetStateAction<sortType>>;
}> = ({ sort, setSort }) => {
  const [sortExpanded, setSortExpanded] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 16 }}>
      <div
        style={{
          fontSize: 18,
          fontWeight: "500",
          color: "grey",
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => setSortExpanded((prev) => !prev)}
      >
        <span style={{ paddingBottom: 5 }}>Sort By</span>
        <span
          style={{
            cursor: "pointer",
            transition: "all .3s ease-in-out",
            display: "inline-block",
            transform: sortExpanded ? "initial" : "rotate(-90deg)",
          }}
        >
          <img src="https://gist.githubusercontent.com/haki-user/722943fd6d2a2e4dc5ba3045cb164ae0/raw/236bc896893d869e0a1647ad97a6af718a503da8/expand-more-24-grey.svg" />
        </span>
      </div>
      {sortExpanded ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            paddingLeft: 8,
            fontSize: 14,
          }}
        >
          <div className="flex-start-center" style={{ cursor: "pointer" }}>
            <input
              id="sort-inp-rel"
              type="radio"
              name="sort"
              value="relavance"
              checked={sort === "relavance"}
              onChange={() => {
                if (sort !== "relavance") {
                  setSort("relavance");
                }
              }}
            />
            <label htmlFor="sort-inp-rel" className="cursor-pointer">
              Relevance
            </label>
          </div>
          <div className="flex-start-center">
            <input
              id="sort-inp-lt"
              type="radio"
              name="sort"
              value="lt"
              checked={sort === "lt"}
              onChange={() => {
                if (sort !== "lt") {
                  setSort("lt");
                }
              }}
            />
            <label htmlFor="sort-inp-lt" className="cursor-pointer">
              Lowest Price
            </label>
          </div>
          <div className="flex-start-center">
            <input
              id="sort-inp-gt"
              type="radio"
              name="sort"
              value="gt"
              checked={sort === "gt"}
              onChange={() => {
                if (sort !== "gt") {
                  setSort("gt");
                }
              }}
            />
            <label htmlFor="sort-inp-gt" className="cursor-pointer">
              Highest Price
            </label>
          </div>
        </div>
      ) : null}
    </div>
  );
};
