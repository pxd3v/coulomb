import './App.css';
import { IPoint, Point } from './components/Point'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react';

function App() {
  const [points, setPoints] = useState<Array<IPoint>>([
    {
      charge: 10,
      position: [0.5, 0, 0],
      id: 0
    },
    {
      charge: 10,
      position: [-0.5, 0, 0],
      id: 1
    }
  ])

  const [isRunning, setIsRunning] = useState<boolean>(false)

  const updatePoint = (point: IPoint) => {
    setPoints((prevPoints) => prevPoints.map((prevPoint) => prevPoint.id === point.id ? point : prevPoint))
  }
  
  return (
    <div className="AppContainer">
      <button onClick={() => setIsRunning(!isRunning)}>start/stop</button>
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
