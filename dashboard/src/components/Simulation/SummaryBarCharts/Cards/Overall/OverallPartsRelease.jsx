import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import axios from "axios";
import React, { useEffect, useState } from "react";

const options = {
    maintainAspectRatio: false,
    responsive: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            enabled: true
        },
        datalabels: {
            color: 'black',
            anchor: 'end',
            align: 'top',
            offset: 5,
            font: {
                size: 20,
            }
        }
    },
    scales:{
        x: {
            display: true,
            grid: {
                color: 'rgba(0,0,0,0)'
            }
        },
        y: {
            display: false,
            max: 700
        }
    }
}

const bgColors = ['red', 'rgb(75, 192, 192, 1)', 'rgb(54, 162, 235, 1)', 'rgb(153, 102, 255)'];
let xLabels = [];
let yValues = [];

const OverallPartsRelease = () => {

    const [chartData, setChartData] = useState({});

    useEffect(() => {
        let isComponentMounted = true;
        const fetchData = () => {
            axios
            .get(process.env.REACT_APP_SERVER_ADDRESS_IP + "/simulation/summary")
            .then(
                (res) => {
                    xLabels = [];
                    yValues = [];
                    res.data.forEach((item, idx) => {
                        if (idx === 0) {
                            xLabels.push("실적");
                            yValues.push(item.PartsReleaseSimulationCount); // 원래는 RealCount! 지금은 데이터 때문에..
                        }
                        xLabels.push('#' + item.SimulationNumber);
                        yValues.push(item.PartsReleaseRealCount); // 원래는 SimulationCount!
                    })
                    if (isComponentMounted) {
                    setChartData({
                        labels: xLabels,
                        datasets: [
                            {
                                data: yValues,
                                backgroundColor: bgColors.slice(undefined, res.data.length + 1),
                                categoryPercentage: 0.4,
                                barPercentag: 0.6,
                            },
                        ],
                    });
                }
                    })
                    
            .catch((e) => console.error(e));
            };
            
        fetchData();

        return () => {isComponentMounted = false;}
        
    }, []);

    return (
        <div style={{display: "grid", justifyContent: "center",  alignItems: "center"}}>
            <div style={{textAlign: "center", fontSize: "15px", paddingTop: "10px"}}>
                부품 불출 지연
            </div>
            <div>
                <Bar data={chartData} plugins={[ChartDataLabels]} options={options} width={"150px"} height={"200px"} />
            </div>
        </div>
    )
};



            

export default OverallPartsRelease;