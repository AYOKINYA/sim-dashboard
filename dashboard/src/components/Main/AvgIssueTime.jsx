import axios from "axios";
import React, { useEffect, useState } from "react";

import DoughnutChart from "./DoughnutChart";

import "./doughnut.css"


const AvgIssueTime = () => {

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
            label: `release-0`
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
            label: `release-0`
        }]
    });
    const [midData, setMidData] = useState({});

    useEffect(() => {
        
        const fetchData = () => {
            axios
            .get(process.env.REACT_APP_SERVER_ADDRESS_IP + "/dashboard/issuetime")
            .then(
                (res) => {
                        setBigData(res.data[0]);
                        setMidData(res.data[1]);

                        setBigChartData({
                            datasets: [{
                                data: [
                                    res.data[0].issueMaxTime === 0 ? 0 : (res.data[0].issueMinTime / res.data[0].issueMaxTime), 
                                    res.data[0].issueMaxTime === 0 ? 1 : (1 - res.data[0].issueMinTime / res.data[0].issueMaxTime)
                                ],
                                backgroundColor: [
                                    'rgba(0,44,95,1)',
                                    'rgba(255, 255, 255, 1)'
                                ],
                                borderColor: [
                                    'rgba(0,44,95,1)',
                                    'rgba(255, 255, 255, 1)'
                                ],
                                cutout: '85%',
                                label: `release-${res.data[0].issueAvgTime}}`
                            }]
                        });

                        setMidChartData({
                            datasets: [{
                                data: [
                                    res.data[1].issueMaxTime === 0 ? 0 : (res.data[1].issueMinTime / res.data[1].issueMaxTime), 
                                    res.data[1].issueMaxTime === 0 ? 1 : (1 - res.data[1].issueMinTime / res.data[1].issueMaxTime)
                                ],
                                backgroundColor: [
                                    'rgba(0,44,95,1)',
                                    'rgba(255, 255, 255, 1)'
                                ],
                                borderColor: [
                                    'rgba(0,44,95,1)',
                                    'rgba(255, 255, 255, 1)'
                                ],
                                cutout: '85%',
                                label: `release-${res.data[1].issueAvgTime}}`
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
            <div className="issue-average-time-grid">
                <span className="issue-average-title"> 평균 출고 시간 </span>
                <div className="doughnut-grid">
                    <DoughnutChart chartData={bigChartData} data={bigData} type={"issue"}/>
                    <DoughnutChart chartData={midChartData} data={midData} type={"issue"}/>
                </div>
            </div>
        </div>
    );
};

export default AvgIssueTime;