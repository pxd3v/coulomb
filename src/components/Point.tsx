import { useEffect, useMemo, useRef } from 'react'
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
  isRunning: boolean
}

export function Point({ currentPoint, envPoints, updatePoint, isRunning }: IPointProps) {
  const mesh = useRef<Mesh>(null!)
  
  useFrame(() => {
    if(!isRunning) return
    const [{ position, force }] = getForce()
    
    mesh.current.position.x += position[0] * 0.0001 * force 
    mesh.current.position.y += position[1] * 0.0001 * force
    mesh.current.position.z += position[2] * 0.0001 * force
    
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
      const position = point.position.map((axis, index) => {
        return -(axis - currentPoint.position[index])
      })
       
      const distance = Math.sqrt(
        Math.pow(point.position[0] - currentPoint.position[0], 2) +
        Math.pow(point.position[1] - currentPoint.position[1], 2) +
        Math.pow(point.position[2] - currentPoint.position[2], 2)
      )
      const force = (point.charge * currentPoint.charge) / Math.pow(distance, 2)
      console.log('@@ref point', point)
      console.log('@@current point', currentPoint)
      console.log('@@vetor diretor', position)
      console.log('@@force', force)
      return [...acc, { position, force }]
    }, [] as Array<{ position: Array<number>, force: number }>)
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
