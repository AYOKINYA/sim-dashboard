import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MainView.css';

const GoodsIssueStatus = () => {
  const [goodsIssueData, setGoodsIssueData] = useState([
    {
      boxType : '',
      issuePartCount : 0,
      issueSetBoxCount : 0,
      discardBoxCount: 0,
      issueSetBoxRackCount: 0,
      issueBoxDelayCount : 0,
    },
    {
      boxType : '',
      issuePartCount : 0,
      issueSetBoxCount : 0,
      discardBoxCount: 0,
      issueSetBoxRackCount: 0,
      issueBoxDelayCount : 0
    }
  ]);
  useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(process.env.REACT_APP_SERVER_ADDRESS_IP + `/dashboard/issueinfos`);
				setGoodsIssueData(response.data);
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, []);


  return (
    <div id="goodsrelease-wrapper">
          <svg className="n_6047_cb">
            <rect id="n_6047_cb" rx="10" ry="10" x="0" y="0" width="925" height="415">
            </rect>
          </svg>
          <div id="goodsrelease-title">
            <span>출고 현황</span>
          </div>
          <div className="goodsbox">
          <div className="goodsbox-title">
              출고부품(대물)
            </div>
            <div className="goodsbox-value">
              {goodsIssueData[0].issuePartCount.toLocaleString()}
            </div>
          </div>
          <div className="goodsbox">
          <div className="goodsbox-title">
              세트박스(대물)
            </div>
            <div className="goodsbox-value">
              {goodsIssueData[0].issueSetBoxCount.toLocaleString()}
            </div>
          </div>
          <div className="goodsbox">
          <div className="goodsbox-title">
              세트박스 랙
            </div>
            <div className="goodsbox-value">
              {goodsIssueData[0].issueSetBoxRackCount.toLocaleString()}
            </div>
          </div>
          <div className="goodsbox">
            <div className="goodsbox-title">
              폐기박스(대물)
            </div>
            <div className="goodsbox-value">
              {goodsIssueData[0].discardBoxCount.toLocaleString()}
            </div>
          </div>
          <div className="goodsbox">
            <div className="goodsbox-title">
              출고부품(중물)
            </div>
            <div className="goodsbox-value">
              {goodsIssueData[1].issuePartCount.toLocaleString()}
            </div>
          </div>
          <div className="goodsbox">
            <div className="goodsbox-title">
              세트박스(중물)
            </div>
            <div className="goodsbox-value">
              {goodsIssueData[1].issueSetBoxCount.toLocaleString()}
            </div>
          </div>
          <div className="goodsbox">
            <div className="goodsbox-title">
              출고지연
            </div>
            <div className="goodsbox-value delay">
              {goodsIssueData[1].issueBoxDelayCount.toLocaleString()}
            </div>
          </div>
          <div className="goodsbox">
            <div className="goodsbox-title">
              폐기박스(중물)
            </div>
            <div className="goodsbox-value">
              {goodsIssueData[1].discardBoxCount.toLocaleString()}
            </div>
          </div>

          <svg className="n_1237" viewBox="0 0 836 1">
            <path id="n_1237" d="M 836 0 L 0 0">
            </path>
          </svg>
        </div>
  );
};

export default GoodsIssueStatus;