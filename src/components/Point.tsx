import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useCallback } from 'react'

export interface IPoint {
  charge: number
  position: [number, number, number]
  id: number
}

interface IPointProps {
  currentPoint: IPoint
  envPoints: Array<IPoint>
  updatePoint: (point: IPoint) => void
  canMove: boolean
}

export function Point({ currentPoint, envPoints, updatePoint, canMove }: IPointProps) {
  const mesh = useRef<Mesh>(null!)
  
  useFrame(() => {
    if(!canMove) return
    const { forceVector, vectorWithoutForce } = getForce()
    
    if(Math.abs(vectorWithoutForce[0]) > 0.05) {
      mesh.current.position.x += forceVector[0] * 0.001
    }
    if(Math.abs(vectorWithoutForce[1]) > 0.05) {
      mesh.current.position.y += forceVector[1] * 0.001
    }
    if(Math.abs(vectorWithoutForce[2]) > 0.05) {
      mesh.current.position.z += forceVector[2] * 0.001
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
      
      if(distance < 0.4) {
        return acc
      }

      const force = (point.charge * currentPoint.charge) / Math.pow(distance, 2)
      const forceVector = currentVector.map((axis, index) => axis * force + acc.forceVector[index])
      const vectorWithoutForce = currentVector.map((axis, index) => axis + acc.vectorWithoutForce[index])
            
      return { forceVector, vectorWithoutForce }
    }, { forceVector: [0, 0, 0], vectorWithoutForce: [0, 0, 0] })
  }, [currentPoint, envPoints])

  return (
    <mesh
      position={currentPoint.position}
      ref={mesh}
      scale={scale}
    >
      <sphereGeometry args={[0.4, 32, 16]} />
      <meshStandardMaterial color={ currentPoint.charge > 0 ?  'blue' : 'red'} />
    </mesh>
  )
}
