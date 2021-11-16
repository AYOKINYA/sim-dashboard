import React from "react";

import OverallBigSetBox from "./OverallBigSetBox";
import OverallMidSetBox from "./OverallMidSetBox";
import OverallPartsRelease from "./OverallPartsRelease";
import OverallRack from "./OverallRack";

import '../summary.css'

const OverallCharts = () => {

  return (
    <div>
      <div className="summary-grid">
        <span>Summary</span>
        <div className="bar-chart-grid">
          <span className="summary-card">
            <OverallBigSetBox />
          </span>
          <span className="summary-card">
          < OverallMidSetBox />
          </span>
          <span className="summary-card">
          <OverallRack/>
          </span>
          <span className="summary-card">
          <OverallPartsRelease/>
          </span>
        </div>
        <span>comment</span>
        <span className="comment-card" >comment가 노출되는 영역입니다.</span>
      </div>
    </div>
  )
}

export default OverallCharts;