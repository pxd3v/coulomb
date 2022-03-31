import './App.css';
import { IPoint, Point } from './components/Point'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react';

function App() {
  const [points, setPoints] = useState<Array<IPoint>>([
    {
      charge: 2,
      position: [0.5, 0, 0],
      id: 0
    },
    {
      charge: 1,
      position: [-0.5, 0, 0],
      id: 1
    }
  ])

  const updatePoint = (point: IPoint) => {
    setPoints(points.map(p => p.id === point.id ? point : p))
  }
  return (
    <div className="AppContainer">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {points.map(point => (
          <Point currentPoint={point} envPoints={points} key={point.id} updatePoint={updatePoint}/>
        ))}
      </Canvas>
    </div>
  );
}

export default App;
