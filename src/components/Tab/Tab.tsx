import React, { useState } from "react";

import InfiniteScroller from "../InfiniteScroll.tsx/InfiniteScroll";
import { DateRange } from "../DateRange/DateRange";

import "./Tab.css";

const Tab: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  return (
    <div>
      <div className="tab-container">
        <div
          onClick={() => handleTabChange(0)}
          className={`tab-view ${selectedTab === 0 ? "active" : ""}`}
        >
          Infinite Scroller
        </div>
        <div
          onClick={() => handleTabChange(1)}
          className={`tab-view ${selectedTab === 1 ? "active" : ""}`}
        >
          Date Range
        </div>
      </div>
      {selectedTab === 0 && <InfiniteScroller />}
      {selectedTab === 1 && <DateRange />}
    </div>
  );
};

export default Tab;
