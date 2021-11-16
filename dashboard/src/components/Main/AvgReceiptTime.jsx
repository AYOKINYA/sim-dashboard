import axios from "axios";
import React, { useEffect, useState } from "react";
import DoughnutChart from "./DoughnutChart";

import "./doughnut.css"

const AvgReceiptTime = () => {

    const [bigChartData, setBigChartData] = useState({
        datasets: [{
        data: [0, 1],
        backgroundColor: [
            'rgba(242,197,19,1)',
            'rgba(255, 255, 255, 1)'
        ],
        borderColor: [
            'rgba(242,197,19,1)',
            'rgba(255, 255, 255, 1)'
        ],
        cutout: '85%',
        label: `receipt-0`
        }]
    });

    const [bigData, setBigData] = useState({});

    const [midChartData, setMidChartData] = useState({
        datasets: [{
        data: [0, 1],
        backgroundColor: [
            'rgba(242,197,19,1)',
            'rgba(255, 255, 255, 1)'
        ],
        borderColor: [
            'rgba(242,197,19,1)',
            'rgba(255, 255, 255, 1)'
        ],
        cutout: '85%',
        label: `receipt-0`
        }]
    });

    const [midData, setMidData] = useState({});

    useEffect(() => {
        
        const fetchData = () => {
            axios
            .get(process.env.REACT_APP_SERVER_ADDRESS_IP + "/dashboard/receipttime")
            .then(
                (res) => {
                        setBigData(res.data[0]);
                        setMidData(res.data[1]);

                        setBigChartData({
                            datasets: [{
                                data: [res.data[0].receiptMaxTime === 0 ? 0 : (res.data[0].receiptMinTime / res.data[0].receiptMaxTime), 
                                        res.data[0].receiptMaxTime === 0 ? 1 : (1 - res.data[0].receiptMinTime / res.data[0].receiptMaxTime) ],
                                backgroundColor: [
                                    'rgba(242,197,19,1)',
                                    'rgba(255, 255, 255, 1)'
                                ],
                                borderColor: [
                                    'rgba(242,197,19,1)',
                                    'rgba(255, 255, 255, 1)'
                                ],
                                cutout: '85%',
                                label: `receipt-${res.data[0].receiptAvgTime}`
                            }]
                        });

                        setMidChartData({
                            datasets: [{
                                data: [res.data[1].receiptMaxTime === 0 ? 0 : (res.data[1].receiptMinTime / res.data[1].receiptMaxTime), 
                                        res.data[1].receiptMaxTime === 0 ? 1 : (1 - res.data[1].receiptMinTime / res.data[1].receiptMaxTime) ],
                                backgroundColor: [
                                    'rgba(242,197,19,1)',
                                    'rgba(255, 255, 255, 1)'
                                ],
                                borderColor: [
                                    'rgba(242,197,19,1)',
                                    'rgba(255, 255, 255, 1)'
                                ],
                                cutout: '85%',
                                label: `receipt-${res.data[1].receiptAvgTime}`
                            }]
                        });
                    })
            .catch(
                (e) => console.error(e)
                );
            };
            
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(interval);
        
    }, []);


    return (
        <div>          
            <div className="receipt-average-time-grid">
                <span className="receipt-average-title"> 평균 입고 시간 </span>
                <div className="doughnut-grid">
                    <DoughnutChart chartData={bigChartData} data={bigData} type={"receipt"} />
                    <DoughnutChart chartData={midChartData} data={midData} type={"receipt"}/>
                </div>
            </div>
        </div>
    );
};

export default AvgReceiptTime;