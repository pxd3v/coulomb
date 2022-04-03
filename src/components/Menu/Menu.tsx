import './Menu.scss'
import { useEnv } from '../../contexts/EnvContext';
import { usePoints } from '../../contexts/PointsContext';

function App() {
  const { resetPoints } = usePoints()
  const { isRunning, setIsRunning, showGrid, setShowGrid } = useEnv()
  
  return (
    <div className="Menu">
        <button onClick={() => setIsRunning(!isRunning)}>start/stop</button>
        <button onClick={() => { resetPoints(); setIsRunning(false) }}>restart</button>
        <button onClick={() => { setShowGrid(!showGrid) }}>toggle grid</button>
    </div>
  );
}

export default App;
