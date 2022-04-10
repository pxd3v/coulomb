import './Config.scss'
import { useEnv } from '../../../../contexts/EnvContext';
import { usePoints } from '../../../../contexts/PointsContext';
import { FaStop, FaPlay } from 'react-icons/fa';
import { IoReload } from 'react-icons/io5';
import { FcExpand, FcCollapse } from 'react-icons/fc';
import { GrGrid } from 'react-icons/gr';
interface IConfigProps {
  setOpenPoints: (open: boolean) => void
  openPoints: boolean
}

function Config({ setOpenPoints, openPoints }: IConfigProps) {
  const { resetPoints, generateRandomPoints } = usePoints()
  const { isRunning, setIsRunning, showGrid, setShowGrid } = useEnv()
  
  return (
    <div className="Config">
        <button onClick={() => setIsRunning(!isRunning)}>{ isRunning ? <FaStop /> : <FaPlay />}</button>
        <button onClick={() => { resetPoints(); setIsRunning(false) }}><IoReload /></button>
        <button onClick={() => { setShowGrid(!showGrid) }}><GrGrid /></button>
        <button onClick={() => { setIsRunning(false); generateRandomPoints(500) }}>generate random points</button>
        <button className="Config__ToggleButton"onClick={() => setOpenPoints(!openPoints)}>{ openPoints ? <FcCollapse /> : <FcExpand />}</button>
    </div>
  );
}

export default Config;
