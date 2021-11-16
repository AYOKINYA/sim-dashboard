import React, { useContext, useState, useEffect } from "react";

import { SimContext } from '../../SimulationView';
import SummaryCharts from "./SummaryCharts";

const Summary = () => {
  const simItems = useContext(SimContext);
  
  const [hasItem, setHasItem] = useState(false);

  useEffect(() => {

    if (simItems.length > 0) {
      setHasItem(true);
    } else {
      setHasItem(false);
    }

	}, [simItems]);

  return (
    <div className="summary-wrapper">
      {!hasItem && 
                  <div className="summary-grid">
                    <span className="sim-summary-title">Summary</span>
                      <div className="sim-summary-nodata">NO DATA AVAILABLE</div>
                  </div>}
      {hasItem && simItems && simItems.map((item) => 
          (item.status === true && <div key={item.simNo} ><SummaryCharts simNo={item.simNo}/> </div>)
      )}
    </div>
  )
}

export default Summary;