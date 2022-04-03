import { Point } from './Point'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import { usePoints } from '../contexts/PointsContext';
import { useEnv } from '../contexts/EnvContext'

function Scene() {
  const { points, updatePoint } = usePoints()
  const { isRunning } = useEnv()
  
  return (
    <Canvas camera={{ fov: 90, position: [3, 3, 3]}}>
        <OrbitControls
            makeDefault
            enableZoom={true}
            enablePan={true}
            zoomSpeed={0.3}
        />
        <gridHelper args={[50, 100]} />
        <axesHelper />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <color attach="background" args={[0.85, 0.85, 0.85]} />
        {points.map(point => (
            <Point
              currentPoint={point} 
              envPoints={points} 
              key={point.id} 
              updatePoint={updatePoint}
              canMove={isRunning}
            />
        ))}
    </Canvas>
  );
}

export default Scene;
