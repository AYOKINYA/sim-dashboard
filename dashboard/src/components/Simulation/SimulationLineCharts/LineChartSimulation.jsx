import React, { useEffect, useState, useContext } from 'react';
import { Line } from "react-chartjs-2";
import drawLineTooltip from './DrawLineTooltip';
import externalTooltipHandler from './ExternalTooltip';
import axios from 'axios';
import { SimContext, SimDispatchContext } from '../SimulationView';

const LineChartSimulation = () => {
  const [isItemExist, setIsItemExist] = useState(false);
  const [midSimulData, setMidSimulData] = useState({
    labels: [],
    datasets: []
  });
  const [bigSimulData, setBigSimulData] = useState({
    labels: [],
    datasets: []
  });
  const [rackSimulData, setRackSimulData] = useState({
    labels: [],
    datasets: []
  });

  const simItems = useContext(SimContext);
  const dispatch = useContext(SimDispatchContext);

  const checkDataExist = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_ADDRESS_IP + '/simulation/history');
      if (response) {
        return response.data[1];
      }
    } catch (e) {
      console.log(e);
    }
  }

  const fetchData = async (simNo, seq) => {
    try {
      const resReal = await axios.get(process.env.REACT_APP_SERVER_ADDRESS_IP + `/simulation/history/${simNo}/comparison/real`);
      const resResult = await axios.get(process.env.REACT_APP_SERVER_ADDRESS_IP + `/simulation/history/${simNo}/comparison/results`);
      if (resReal) {
        resReal.data.forEach(item => {
          item.workType == 'Setbox(M)' ? setMidSimulData({
            labels: Array.from(item.infos, x => x.time),
            datasets: [
              {
                  label: '실적',
                  data: Array.from(item.infos, y => y.value),
                  fill: false,
                  backgroundColor : 'rgba(255,211,38,1)',
                  borderColor: 'rgba(255,211,38,1)',
                  tension: 0.2,
              },
            ],
        }) :
          item.workType == 'Setbox(B)' ? setBigSimulData({
            labels: Array.from(item.infos, x => x.time),
            datasets: [
                {
                    label: '실적',
                    data: Array.from(item.infos, y => y.value),
                    fill: false,
                    backgroundColor : 'rgba(255,211,38,1)',
                    borderColor: 'rgba(255,211,38,1)',
                    tension: 0.2,
                },
            ],
        }) : setRackSimulData({
              labels: Array.from(resReal.data[2].infos, x => x.time),
              datasets: [
                  {
                      label: '실적',
                      data: Array.from(item.infos, y => y.value),
                      fill: false,
                      backgroundColor : 'rgba(255,211,38,1)',
                      borderColor: 'rgba(255,211,38,1)',
                      tension: 0.2,
                  },
              ],
            })
        });
      }
      if (resResult) {
        resResult.data.forEach(item => {
          item.workType == 'Setbox(M)' ? setMidSimulData(prevState => ({
            datasets: [...prevState.datasets, {
                label: `시뮬레이션 #${seq}`,
                data: Array.from(item.infos, y => y.value),
                fill: false,
                backgroundColor: 'rgba(0,44,95,1)',
                borderColor: 'rgba(0,44,95,1)',				
                tension: 0.2,
            }]
          })) :
          item.workType == 'Setbox(B)' ? setBigSimulData(prevState => ({
            datasets: [...prevState.datasets, {
                label: `${seq}`,
                data: Array.from(item.infos, y => y.value),
                fill: false,
                backgroundColor: 'rgba(0,44,95,1)',
                borderColor: 'rgba(0,44,95,1)',				
                tension: 0.2,
            }]
          })) : setRackSimulData(prevState => ({
            datasets: [...prevState.datasets, {
                label: `${seq}`,
                data: Array.from(item.infos, y => y.value),
                fill: false,
                backgroundColor: 'rgba(0,44,95,1)',
                borderColor: 'rgba(0,44,95,1)',				
                tension: 0.2,
            }]
          }))
        });
      }
    } catch (e) {
        console.log(e);
    }
  };

  useEffect(async () => {
    const latestItem = await checkDataExist();
    if (latestItem !== undefined) {
      fetchData(latestItem.simulationId, latestItem.seq);
      setIsItemExist(true);
      dispatch({type: 'ADDSIMNO',
      simno: latestItem.simulationId,
      seq: latestItem.seq});
    }
  }, []);

  useEffect(() => {
    const removeData = (trueArr) => {
      try {
          setMidSimulData(prevState => ({
              datasets: prevState.datasets.filter(item => trueArr.includes(item.label))
          }));
          setBigSimulData(prevState => ({
              datasets: prevState.datasets.filter(item => trueArr.includes(item.label))
          }));
          setRackSimulData(prevState => ({
              datasets: prevState.datasets.filter(item => trueArr.includes(item.label))
          }));
      } catch (e) {
        console.log(e);
      }
    };

    const trueArr = simItems.filter(item => item.status === true);
    const trueArrId = trueArr.map(item => item.simNo);
    removeData(trueArrId);
    if (trueArr.length !== 0){
      fetchData(trueArr[0].simNo, trueArr[0].seq);
      setIsItemExist(true);
    } else {
      setIsItemExist(false);
    }
  }, [simItems]);

  if (!isItemExist) {
    return (
      <div className="sim-linechart-nodata">
        NO DATA AVAILABLE
      </div>
    )
  }
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
          // beginAtZero: true,
          // max: 100,
          // ticks: {
          // stepSize: 20,
          // },
        },
      },

      plugins: {
        title : {
            display: true,
            align: 'start',
            text: `Setbox`
        },
        tooltip: {
          enabled: false,
          external: externalTooltipHandler,
          mode: 'index',
          intersect: false,
          callbacks: {
            title: function () {
              return 'Gap';
            },
            label: function () {
              return '';
            },
          }
        },
        legend: {
          display: false,
          align: 'end',
          reverse: true,
          labels: {
              usePointStyle: true,
              pointStyle: 'circle',
          },
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
      <div style={{display: 'inherit'}}>
        <Line data={midSimulData} options={{...options, plugins: {...options.plugins, legend: {...options.plugins.legend, display: true},
                                                                                      title : {...options.plugins.title, text: `Setbox Mid`}}}} plugins={[lineTooltip]}
                    width={1300} height={210} />
        <Line data={bigSimulData} options={{...options, plugins: {...options.plugins, title : {...options.plugins.title, text: `Setbox Big`}}}} plugins={[lineTooltip]}
                    width={1300} height={210} />
        <Line data={rackSimulData} options={{...options, plugins: {...options.plugins, title : {...options.plugins.title, text: `Setbox Rack`}}}} plugins={[lineTooltip]}
                    width={1300} height={210} />
      </div>
    );
};

export default LineChartSimulation;