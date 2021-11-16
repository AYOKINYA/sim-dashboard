import React from "react";
import { Bar } from 'react-chartjs-2';

const options = {
    maintainAspectRatio: false,
    responsive: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            enabled: false
        }
    },
    scales:{
        x: {
            display: false,
        },
        y: {
            display: false
        }
    }
}

// TODO : compare heights of bars in pair and draw the gaps accordingly
const drawGap = function(chart) {

    if (chart._metasets.length > 0 && chart._metasets[0]._dataset && chart._metasets[0]._dataset.data && chart._metasets[0]._dataset.data.length >= 2
        && chart._metasets[0]._dataset.data[0] > 0 && chart._metasets[0]._dataset.data[1] > 0) {
        const {ctx} = chart;

        const x1 = chart._metasets[0].data[0].x;
        const y1 = chart._metasets[0].data[0].y;
        const w1 = chart._metasets[0].data[0].width;

        const x2 = chart._metasets[0].data[1].x;
        const y2 = chart._metasets[0].data[1].y;
        const w2 = chart._metasets[0].data[1].width;

        ctx.beginPath();
        ctx.strokeStyle = "rgba(141, 161, 185, 1)";
        ctx.lineWidth = 2.5
        ctx.setLineDash([3, 3]);
        ctx.moveTo(x2 + w2 / 2, (y2 > y1 ? y2 : y1) - ctx.lineWidth / 2); //From
        ctx.lineTo(x1 - w1 / 2, (y2 > y1 ? y2 : y1) - ctx.lineWidth / 2); //To
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "rgba(141, 161, 185, 1)";
        ctx.lineWidth = 2.5
        ctx.setLineDash([3, 3]);
        ctx.moveTo(x2 + w2 / 2, (y2 > y1 ? y1 : y2));
        ctx.lineTo(x1 - w2 / 2, (y2 > y1 ? y1 : y2));
        ctx.stroke();
    }
}

const barGap = {
    id: 'barGap',
    afterDraw: (chart) => drawGap(chart)
}

const BarChart = (props) => {

    return (
        <div>
            <Bar data={props.chartData} options={options} plugins={[barGap]} width={"50px"} height={"100px"} />
        </div>
    )
}

export default BarChart;