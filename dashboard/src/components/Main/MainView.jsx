import React from 'react';
import AvgReceiptTime from './AvgReceiptTime';
import AvgIssueTime from './AvgIssueTime';

import './MainView.css';
import StockLineChart from './StockLineCharts/StockLineChart';
import GoodsReceiptStatus from './GoodsReceiptStatus';
import GoodsIssueStatus from './GoodsIssueStatus';

const MainView = () => {
  return (
      <div id="MCHORD_00_DIgitalTwin_02_01">
        <img id="n_385" src="image/n_385.png" srcSet="image/n_385.png 1x, image/n_385@2x.png 2x" alt="background_image" />
          
        <svg className="stock-linechart-svg">
          <rect id="stock-linechart-rect" rx="10" ry="10" x="0" y="0" width="1306" height="681">
          </rect>
			  </svg>
        <StockLineChart />
        <AvgReceiptTime/>
        <AvgIssueTime/>
        
        <div id="n_19041">
          <svg className="n_814">
            <ellipse id="n_814" rx="11" ry="11" cx="11" cy="11">
            </ellipse>
          </svg>
          <svg className="n_816">
            <ellipse id="n_816" rx="11" ry="11" cx="11" cy="11">
            </ellipse>
          </svg>
          <svg className="n_815">
            <ellipse id="n_815" rx="11" ry="11" cx="11" cy="11">
            </ellipse>
          </svg>
        </div>
        
        
        <GoodsReceiptStatus />
        <GoodsIssueStatus />
        
      </div>
  );
};

export default MainView;