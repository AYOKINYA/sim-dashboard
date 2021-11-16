import { Route } from 'react-router-dom';
import './App.css';
import SimulationView from './components/Simulation/SimulationView';
import MainView from './components/Main/MainView';

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={MainView} exact={true} />
      <Route path="/simulation" component={SimulationView} />
      <Route path="/main" component={MainView} />
      
    </div>
  );
}

export default App;
