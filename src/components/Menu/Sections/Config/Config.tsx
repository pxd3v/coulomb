import './Config.scss'
import { useEnv } from '../../../../contexts/EnvContext';
import { usePoints } from '../../../../contexts/PointsContext';

interface IConfigProps {
  setOpenPoints: (open: boolean) => void
  openPoints: boolean
}

function Config({ setOpenPoints, openPoints }: IConfigProps) {
  const { resetPoints } = usePoints()
  const { isRunning, setIsRunning, showGrid, setShowGrid } = useEnv()
  
  return (
    <div className="Config">
        <button onClick={() => setIsRunning(!isRunning)}>{ isRunning ? 'stop' : 'start'}</button>
        <button onClick={() => { resetPoints(); setIsRunning(false) }}>restart</button>
        <button onClick={() => { setShowGrid(!showGrid) }}>toggle grid</button>
        <button className="Menu__ToggleButton"onClick={() => setOpenPoints(!openPoints)}>{ openPoints ? 'close' : 'open'}</button>
    </div>
  );
}

export default Config;
