import React, { useEffect, useState } from "react";

import BarChart from "./BarChart"
const BigSetBox = (props) => {

    const [chartData, setChartData] = useState({
        labels: ["Real", "Simulation"],
        datasets: [
            {
                data: [0, 0],
                backgroundColor: ['rgba(0, 44, 95, 1)', 'rgba(255, 255, 255, 1)'],
                categoryPercentage: 0.6,
                barPercentag: 0.6,
            },
        ],
    });

    useEffect(() => {
        setChartData({
            labels: ["Real", "Simulation"],
            datasets: [
                {
                    data: [props.realQuantity === undefined ? 0 : props.realQuantity, props.simulationQuantity === undefined ? 0 : props.simulationQuantity],
                    backgroundColor: [props.type === 'delay' ? 'red' : 'rgba(0, 44, 95, 1)', 'rgba(255, 255, 255, 1)'],
                    categoryPercentage: 0.6,
                    barPercentag: 0.6,
                },
            ],
        });

    }, [props.realQuantity, props.simulationQuantity])

    return (
        <div style={{display: "grid", justifyContent: "center",  alignItems: "center"}}>
            <div style={{textAlign: "center", fontSize: "15px", paddingTop: "10px"}}>
                {props.type === 'big' && "세트박스(대물)"}
                {props.type === 'mid' && "세트박스(중물)"}
                {props.type === 'rack' && "세트박스 랙"}
                {props.type === 'delay' && "부품 불출 지연"}
            </div>
            
            <div style={{textAlign: "center", fontSize: "40px", paddingBottom: "10px"}}>
                {
                    (props.realQuantity !== undefined && props.simulationQuantity !== undefined) &&
                    Math.abs(props.simulationQuantity - props.realQuantity)
                }
                {
                    (props.realQuantity === undefined || props.simulationQuantity === undefined) &&
                    0
                }
            </div>
            <div>
            {
                ((props.simulationQuantity !== -1) || (props.realQuantity !== -1))
                                &&
                <div style={{display: "flex", justifyContent: "space-around", alignItems: "space-around"}}>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {props.realQuantity}
                    </div>
                    <BarChart chartData={chartData} />
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {props.simulationQuantity}
                    </div>
                </div>
            }

            </div>


        </div>

    )
}

export default BigSetBox;