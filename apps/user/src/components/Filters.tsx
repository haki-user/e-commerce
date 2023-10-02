import React, { useState } from "react";
import MultiRangeSlider from "ui/MultiRangeSlider";
import "./filters.css";
const MAX = 15000;

export const Filters: React.FC = () => {
  const [filterExpanded, setFilterExpanded] = useState(true);
  const [sortExpanded, setSortExpanded] = useState(true);
  const [minSelect, setMinSelect] = useState(0);
  const [maxSelect, setMaxSelect] = useState(MAX);

  if (minSelect > maxSelect) {
    const tmp = minSelect;
    setMinSelect(maxSelect);
    setMaxSelect(tmp);
  }

  return (
    <div
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
          <span style={{ paddingBottom: 5 }}>Filters</span>
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
          style={{ display: !filterExpanded ? "none" : "initial", padding: 8 }}
        >
          <div style={{ paddingTop: 4 }}>
            <div style={{ fontWeight: 500 }}>PRICE</div>
            <datalist id="markers">
              <option value="500" label="500" />
              <option value="1000" label="1000" />
              <option value="2000" label="2000" />
              <option value="5000" label="5000" />
            </datalist>
            <div>
              <MultiRangeSlider
                min={0}
                max={MAX}
                onChange={({ min, max }: { min: number; max: number }) =>
                  console.log(min, max)
                }
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
                  <InputOption text="English" />
                  <InputOption text="Japanese" />
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 500 }}>CATEGORIES</div>
            <div>
              <div style={{ margin: 8 }}>
                <input className="toggle-box" id="header1" type="checkbox" />
                <label htmlFor="header1">Books</label>
                <div className="expand-container">
                  <div>
                  <InputOption text="Manga" />
                  </div>
                </div>
              </div>
              <div style={{ margin: 8 }}>
                <input className="toggle-box" id="header3" type="checkbox" />
                <label htmlFor="header3">Action Figures</label>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          <div>
            <select typeof="radio">
              <option value="lt">Lowest Price</option>
              <option value="gt">Highest Price</option>
              <option value="relavance">Relevance</option>
            </select>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const InputOption: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div style={{ margin: 4, display: "flex" }}>
      <div>
        <input type="checkbox" />
      </div>
      <div style={{ paddingLeft: 8, fontSize: 14 }}>{text}</div>
    </div>
  );
};
