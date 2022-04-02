import './App.css';
import { IPoint, Point } from './components/Point'
import { Canvas } from '@react-three/fiber'
import { useCallback, useMemo, useState } from 'react';

function App() {
  const basePoints: Array<IPoint> = useMemo(() => [
    {
      charge: 3,
      position: [-0.5, 0, 0],
      id: 0
    },
    {
      charge: -3,
      position: [0.5, 0, 0],
      id: 1
    },
    {
      charge: 3,
      position: [0, 1, 0],
      id: 2
    },
  ], [])
  
  const [points, setPoints] = useState<Array<IPoint>>(basePoints)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const updatePoint = useCallback((point: IPoint) => {
    setPoints((prevPoints) => prevPoints.map((prevPoint) => prevPoint.id === point.id ? point : prevPoint))
  }, [])
  
  return (
    <div className="AppContainer">
      <button onClick={() => setIsRunning(!isRunning)}>start/stop</button>
      <button onClick={() => { setPoints(basePoints); setIsRunning(false) }}>restart</button>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {points.map(point => (
          <Point 
            currentPoint={point} 
            envPoints={points} 
            key={point.id} 
            updatePoint={updatePoint} 
            isRunning={isRunning}
          />
        ))}
      </Canvas>
    </div>
  );
}

export default App;
