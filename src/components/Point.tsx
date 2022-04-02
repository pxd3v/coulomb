import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useCallback } from 'react'
import { TransformControls } from '@react-three/drei'

export interface IPoint {
  charge: number
  position: [number, number, number]
  id: number
}

interface IPointProps {
  currentPoint: IPoint
  envPoints: Array<IPoint>
  updatePoint: (point: IPoint) => void
  isRunning: boolean
}

export function Point({ currentPoint, envPoints, updatePoint, isRunning }: IPointProps) {
  const mesh = useRef<Mesh>(null!)
  
  useFrame(() => {
    if(!isRunning) return
    const { forceVector, force } = getForce()
    
    if(Math.abs(forceVector[0]) > 0.05) {
      mesh.current.position.x += forceVector[0] * 0.0001 * force 
    }
    if(Math.abs(forceVector[1]) > 0.05) {
      mesh.current.position.y += forceVector[1] * 0.0001 * force 
    }
    if(Math.abs(forceVector[2]) > 0.05) {
      mesh.current.position.z += forceVector[2] * 0.0001 * force 
    }

    updatePoint({
      ...currentPoint,
      position: [
        mesh.current.position.x,
        mesh.current.position.y,
        mesh.current.position.z
      ]
    })
  })
  
  const scale = useMemo(() => Math.abs(currentPoint.charge) * 0.1, [currentPoint.charge])
  
  const getForce = useCallback(() => {
    return envPoints.filter(point => point.id !== currentPoint.id).reduce((acc, point) => {
      const currentVector = point.position.map((axis, index) => {
        return -(axis - currentPoint.position[index])
      })
      
      const distance = Math.sqrt(
        Math.pow(point.position[0] - currentPoint.position[0], 2) +
        Math.pow(point.position[1] - currentPoint.position[1], 2) +
        Math.pow(point.position[2] - currentPoint.position[2], 2)
      )

      const force = (point.charge * currentPoint.charge) / Math.pow(distance, 2)
      
      const forceVector = currentVector.map((axis, index) => axis + acc.forceVector[index])

      return { forceVector, force }
    }, { forceVector: [0, 0, 0], force: 0 })
  }, [currentPoint, envPoints])

  return (
    <mesh
      position={currentPoint.position}
      ref={mesh}
      scale={scale}
    >
      <sphereGeometry args={[0.4, 32, 16]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}
