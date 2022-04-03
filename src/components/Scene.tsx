import { Point } from './Point'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import { usePoints } from '../contexts/PointsContext';
import { useEnv } from '../contexts/EnvContext'
import { useRef } from 'react';

function Scene() {
  const { points, updatePoint } = usePoints()
  const { isRunning, showGrid} = useEnv()
  const orbitControlsRef = useRef(null)
  return (
    <Canvas camera={{ fov: 90, position: [3, 3, 3]}}>
        <OrbitControls
            makeDefault
            ref={orbitControlsRef}
            enableZoom={true}
            enablePan={true}
            zoomSpeed={0.3}
        />
        {showGrid && (
          <>
            <gridHelper args={[50, 100]} />
            <axesHelper />
          </>
        )}
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
              orbitControlsRef={orbitControlsRef}
            />
        ))}
    </Canvas>
  );
}

export default Scene;
