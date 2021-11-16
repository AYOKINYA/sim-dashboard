import React, { useEffect, useState } from "react";
import axios from "axios";

import SummaryCard from "./SummaryCard";

import './summary.css'

const SummaryCharts = (props) => {

  const [bigReal, setBigReal] = useState({});
  const [bigSim, setBigSim] = useState({});
  const [midReal, setMidReal] = useState({});
  const [midSim, setMidSim] = useState({});
  const [rackReal, setRackReal] = useState({});
  const [rackSim, setRackSim] = useState({});
  const [delayReal, setDelayReal] = useState(-1);
  const [delaySim, setDelaySim] = useState(-1);

  useEffect(() => {
      let isComponentMounted = true;
      const fetchData = () => {
          axios
          .get(process.env.REACT_APP_SERVER_ADDRESS_IP + `/simulation/history/${props.simNo}/summary`)
          .then(
              (res) => {
                    if (isComponentMounted) {
                      setBigReal(res.data[0].infos[0]);
                      setBigSim(res.data[1].infos[0]);
                      setMidReal(res.data[0].infos[1]);
                      setMidSim(res.data[1].infos[1]);
                      setRackReal(res.data[0].infos[2]);
                      setRackSim(res.data[1].infos[2]);
                      setDelayReal(res.data[0].delayCount);
                      setDelaySim(res.data[1].delayCount);
                    }
                })
          .catch((e) => console.error(e));
          };
          
          fetchData();

          return () => {isComponentMounted = false;}
          

  }, [props.simNumber]);

  return (
    <div>
      <div className="summary-grid">
        <span className="sim-summary-title">Summary</span>
        <div className="bar-chart-grid">
          <span className="summary-card">
            <SummaryCard realQuantity={bigReal.workQuantity} simulationQuantity={bigSim.workQuantity} type={"big"}/>
          </span>
          <span className="summary-card">
            <SummaryCard realQuantity={midReal.workQuantity} simulationQuantity={midSim.workQuantity} type={"mid"}/>
          </span>
          <span className="summary-card">
            <SummaryCard realQuantity={rackReal.workQuantity} simulationQuantity={rackSim.workQuantity} type={"rack"}/>
          </span>
          <span className="summary-card">
            <SummaryCard realQuantity={delayReal} simulationQuantity={delaySim} type={"delay"}/>
          </span>
        </div>
        <span className="sim-summary-title">comment</span>
        <span className="comment-card" >comment가 노출되는 영역입니다. {props.simNo} </span>
      </div>
    </div>
  )
}

export default SummaryCharts;