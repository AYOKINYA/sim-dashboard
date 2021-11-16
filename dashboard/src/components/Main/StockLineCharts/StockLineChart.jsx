import React, { useEffect, useRef, useState } from 'react';
import { Line } from "react-chartjs-2";
import drawLineTooltip from './LineCanvas';
import StockExternalTooltip from './StockExternalTooltip';
import axios from 'axios';
import moment from 'moment';

const StockLineChart = () => {
	const [labels, setLabels] = useState([]);
	const [bigBox, setBigBox] = useState([]);
	const [midBox, setMidBox] = useState([]);
	const dataCnt = useRef(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(process.env.REACT_APP_SERVER_ADDRESS_IP + '/dashboard/receiptrate');
				if (dataCnt.current > 120){
					setLabels(prevLabel => [...prevLabel.slice(1), moment(response.data.requestTime).format("MM-DD HH:mm:ss")]);
					setMidBox(prevLabel => [...prevLabel.slice(1), response.data.infos[0].receiptRate]);
					setBigBox(prevLabel => [...prevLabel.slice(1), response.data.infos[1].receiptRate]);
				} else {
					dataCnt.current += 1;
					setLabels(prevLabel => [...prevLabel, moment(response.data.requestTime).format("MM-DD HH:mm:ss")]);
					setMidBox(prevLabel => [...prevLabel, response.data.infos[0].receiptRate]);
					setBigBox(prevLabel => [...prevLabel, response.data.infos[1].receiptRate]);
				}
			} catch (e) {
				console.log(e);
			}
		}
		const interval = setInterval(async () => {
			await fetchData(); // API call
    }, 5000);		// every 5 sec
		fetchData();
	}, []);

	const data = {
    labels: labels,
  	datasets: [
			{
				label: '중물 부품',
				data: midBox,
				fill: false,
				backgroundColor: ' rgba(0,44,95,1)',
				borderColor: ' rgba(0,44,95,1)',		
				tension: 0.2,
			},
			{
				label: '대물 부품',
				data: bigBox,
				fill: false,
				backgroundColor : 'rgba(255,211,38,1)',
				borderColor: 'rgba(255,211,38,1)',
				tension: 0.2,
			}
		],
	};

	const lineTooltip = {
    id: 'lineTooltip',
    afterDraw: (chart) => drawLineTooltip(chart)
	};

	const options = {
		scales: {
			x: {
				grid: {
					display: false,
				}
			},

      yAxes: {
        beginAtZero: true,
        max: 100,
        ticks: {
        stepSize: 20,
        },
      },          
		},
	
		plugins: {
			title : {
				display: true,
				align: 'start',
				text: '재고관리',
				color: `rgba(0,0,0,1)`,
				font: {
					family: 'Nanum Barun Gothic Bold',
					size: 18,
					weight: 'normal',
				}
			},
			tooltip: {
				enabled: false,
				external: StockExternalTooltip,
				mode: 'index',
				intersect: false,
				callbacks: {
					title: function () {
						return '재고율';
					},
				}
			},
			legend: {
				align: 'end',
				labels: {
					usePointStyle: true,
					pointStyle: 'circle',
				}
			}
		},
		elements: {
			point: {
				radius: 0
			}
		},
		responsive: false,
		maintainAspectRatio: false,
		interaction: {
      intersect: false,
      mode: 'index',
		},
	};



	return (
		<div className="stock-linechart-wrapper">
			<Line data={data} options={options} plugins={[lineTooltip]}
						width={904} height={538} />
		</div>
	);
};

export default StockLineChart;