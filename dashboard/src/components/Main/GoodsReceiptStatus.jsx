import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MainView.css';

const GoodsReceiptStatus = () => {
  const [goodsReceiptData, setGoodsReceiptData] = useState([
    {
      boxType : '',
      receiptBoxCount: 0,
      receiptPartCount : 0,
      receiptDelayCount : 0
    },
    {
      boxType : '',
      receiptBoxCount: 0,
      receiptPartCount : 0,
      receiptDelayCount : 0
    }
  ]);

  useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(process.env.REACT_APP_SERVER_ADDRESS_IP + `/dashboard/receiptinfos`);
				setGoodsReceiptData(response.data);
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, []);

  return (
    <div id="goodsreceipt-wrapper">
      <svg className="goodsreceipt-svg">
        <rect id="goodsreceipt-rect" rx="10" ry="10" x="0" y="0" width="925" height="415">
        </rect>
      </svg>
      <div id="n__bc">입고 현황</div>
      <div className="goodsbox">
        <div className="goodsbox-title">
          입고박스(대물)
        </div>
        <div className="goodsbox-value">
          {goodsReceiptData[0].receiptBoxCount.toLocaleString()}
        </div>
      </div>
      <div className="goodsbox">
        <div className="goodsbox-title">
            입고부품(대물)
          </div>
          <div className="goodsbox-value">
            {goodsReceiptData[0].receiptPartCount.toLocaleString()}
          </div>
      </div>
      <div className="goodsbox">
      <div className="goodsbox-title">
          입고지연(대물)
      </div>
      <div className="goodsbox-value delay">
        {goodsReceiptData[0].receiptDelayCount.toLocaleString()}
      </div>
      </div>
      <div className="goodsbox">
        <div className="goodsbox-title">
          입고박스(중물)
        </div>
        <div className="goodsbox-value">
          {goodsReceiptData[1].receiptBoxCount.toLocaleString()}
        </div>
      </div>
      <div className="goodsbox">
        <div className="goodsbox-title">
          입고부품(중물)
        </div>
        <div className="goodsbox-value">
          {goodsReceiptData[1].receiptPartCount.toLocaleString()}
        </div>
      </div>
      <div className="goodsbox">
        <div className="goodsbox-title">
          입고지연(중물)
        </div>
        <div className="goodsbox-value delay">
          {goodsReceiptData[1].receiptDelayCount.toLocaleString()}
        </div>
      </div>
      <svg className="n_1236" viewBox="0 0 836 1">
        <path id="n_1236" d="M 836 0 L 0 0">
        </path>
      </svg>
    </div>
  );
};

export default GoodsReceiptStatus;