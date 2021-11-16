
import { Doughnut } from 'react-chartjs-2';

import drawDoughnutLabel from "./DoughnutLabel/core"
import "./doughnut.css"

const options = {
    maintainAspectRatio: false,
    responsive: false,
    plugins: {
        tooltip: {
            enabled: false
        }
    },
}

const doughnutLabel = {
    id: 'doughnutLabel',
    afterDraw: (chart) => drawDoughnutLabel(chart)
};

const DoughnutChart = (props) => {

    return (
            <span className="doughnut-card">
                    <span style={{fontSize: "18px"}}>
                        <span style={ props.type === 'receipt' ? {color: "rgba(255,255,255,1)"} : {color: "rgba(0,0,0,1)" }}> { props.data.boxType === 'big' ? "대물" : "중물"} </span>
                    </span>
                    <Doughnut data={props.chartData} plugins={[doughnutLabel]} options={options} width={"200px"} height={"200px"}/>
                    <div style={{paddingRight: "60px"}}></div>
                    <div className="texts-around-doughnut">
                        <div className="text-around-doughnut" style={ props.type === 'receipt' ? {color:"rgba(242,197,19,1)"} : {color:"rgba(0,44,95,1)"}}>
                            <span style={{textAlign: "center", fontSize: "18px"}}>minimum</span>
                            <span style={{textAlign: "center", fontSize: "30px"}}>{ props.type === 'receipt' ? props.data.receiptMinTime : props.data.issueMinTime}</span>
                        </div>
                        <div className="text-around-doughnut" style={ props.type === 'receipt' ? {color:"rgba(242,197,19,1)"} : {color:"rgba(0,44,95,1)"}}>
                            <span style={{textAlign: "center", fontSize: "18px"}}>maximum</span>
                            <span style={{textAlign: "center", fontSize: "30px"}}>{ props.type === 'receipt' ? props.data.receiptMaxTime : props.data.issueMaxTime}</span>
                        </div>
                    </div>
            </span>                  
    );
};

export default DoughnutChart;