import React, { useContext, useEffect, useReducer } from 'react';
import CalendarUI from './CalendarUI';

import LineChartSimulation from './SimulationLineCharts/LineChartSimulation';
import Summary from './SummaryBarCharts/Cards/Summary';

import './sim.css'
import './SimulationView.css'

export const SimContext = React.createContext([]);
export const SimDispatchContext = React.createContext(null);

const reducer = (state, action) => {
	const getRandomColor = () => {
		const randomColor = Math.floor(Math.random()*16777215).toString(16);
		return randomColor;
	}

	switch (action.type) {
		case 'ADDSIMNO':
			return [...state, {
				simNo: action.simno,
				seq: action.seq,
				status: true,
				color: '#'+getRandomColor()
			}];
		case 'REMOVESIMNO':
			return state.filter(simItem => simItem.simNo!==action.simno);
		case 'CHANGESTATUS':
			if (state.length !== 0 && state.filter(item => item.status === true).length === 0) {
				return state.map(simItem => 
					simItem.simNo != state.map(state => state.simNo)[0] ? {...simItem, status: false} 
					: simItem.simNo == state.map(state => state.simNo)[0] ? {...simItem, status: true} : simItem);
			} else {
				return state.map(simItem => 
					simItem.simNo !== action.simno ? {...simItem, status: false} 
					: simItem.simNo === action.simno ? {...simItem, status: true} : simItem);
			}
		case 'OVERALL':
			return state.map(simItem => 
				simItem.status === false ? {...simItem, status: true} : simItem);
		default:
			return state;
	}
}

// Button Component
export const SimItemBtn = ({simNo, seq}) => {
	const dispatch = useContext(SimDispatchContext);
	return (
		<div className="sim-btn" onClick={() => {
			simNo === 'overall' ? dispatch({type: 'OVERALL'}) :
			dispatch({type: 'CHANGESTATUS', simno: simNo});
		}}>
			{`#${seq}`}
		</div>
	)
}

const SimulationView = () => {
	const [state, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		console.log(state);
	}, [state]);

  return (
		<SimDispatchContext.Provider value={dispatch}>
		<SimContext.Provider value={state}>
			<div id="MCHORD_00_DIgitalTwin_02_02">
				<img id="n_385" src="image/n_385.png" srcSet="image/n_385.png 1x, image/n_385@2x.png 2x" alt="linechart"/>
				<div className="sim-btn-wrapper">
					{state && state.map((simItem, idx) => <SimItemBtn simNo={simItem.simNo} seq={simItem.seq} key={idx}/>)}
				</div>
				<Summary/>
				<svg className="sim-linechart-svg">
					<rect id="sim-linechart-rect" rx="10" ry="10" x="0" y="0" width="1306" height="681">
					</rect>
				</svg>
				<div className="sim-linechart-wrapper">
					<div id="sim-linechart-title">
						<span>실적 대비 비교</span>
					</div>
					<LineChartSimulation />
				</div>

				<svg className="sim-history-svg">
					<rect id="sim-history-rect" rx="10" ry="10" x="0" y="0" width="543" height="1040">
					</rect>
				</svg>
				<div className="sim-rightside-wrapper">
					<CalendarUI />
				</div>
				<div id="n_19041">
					<svg className="n_814">
						<ellipse id="n_814" rx="11" ry="11" cx="11" cy="11">
						</ellipse>
					</svg>
					<svg className="n_816">
						<ellipse id="n_816" rx="11" ry="11" cx="11" cy="11">
						</ellipse>
					</svg>
					<svg className="n_815">
						<ellipse id="n_815" rx="11" ry="11" cx="11" cy="11">
						</ellipse>
					</svg>
				</div>	
			</div>
		</SimContext.Provider>
		</SimDispatchContext.Provider>
  );
};

export default SimulationView;