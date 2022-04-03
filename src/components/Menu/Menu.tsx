import { useEnv } from '../../contexts/EnvContext';
import { usePoints } from '../../contexts/PointsContext';

function App() {
  const { resetPoints } = usePoints()
  const { isRunning, setIsRunning } = useEnv()
  
  return (
    <div className="Menu">
        <button onClick={() => setIsRunning(!isRunning)}>start/stop</button>
        <button onClick={() => { resetPoints(); setIsRunning(false) }}>restart</button>
    </div>
  );
}

export default App;
