import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import { useCallback } from 'react'

export interface IPoint {
  charge: number
  x: number,
  y: number,
  z: number,
  id: number
}

interface IPointProps {
  currentPoint: IPoint
  envPoints: Array<IPoint>
  updatePoint: (point: IPoint) => void
  canMove: boolean
  orbitControlsRef: any
}

export function Point({ currentPoint, envPoints, updatePoint, canMove, orbitControlsRef }: IPointProps) {
  const mesh = useRef<Mesh>(null!)
  
  useFrame(() => {
    if(!canMove) return
    const { forceVector, vectorWithoutForce } = getForce()
    
    if(Math.abs(vectorWithoutForce[0]) > 0.05) {
      mesh.current.position.x += forceVector[0] * 0.004
    }
    if(Math.abs(vectorWithoutForce[1]) > 0.05) {
      mesh.current.position.y += forceVector[1] * 0.004
    }
    if(Math.abs(vectorWithoutForce[2]) > 0.05) {
      mesh.current.position.z += forceVector[2] * 0.004
    }

    updatePoint({
      ...currentPoint,
      x: mesh.current.position.x,
      y: mesh.current.position.y,
      z: mesh.current.position.z
    })
  })
  
  const scale = useMemo(() => 0.2 + Math.abs(currentPoint.charge) * 0.05, [currentPoint.charge])
  
  const getForce = useCallback(() => {
    return envPoints.filter(point => point.id !== currentPoint.id).reduce((acc, point) => {
      const pointPosition = [point.x, point.y, point.z]
      const currentPointPosition = [currentPoint.x, currentPoint.y, currentPoint.z]
      const currentVector = pointPosition.map((axis, index) => {
        return -(axis - currentPointPosition[index])
      })
      
      const distance = Math.sqrt(
        Math.pow(pointPosition[0] - currentPointPosition[0], 2) +
        Math.pow(pointPosition[1] - currentPointPosition[1], 2) +
        Math.pow(pointPosition[2] - currentPointPosition[2], 2)
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

  const focusPoint = useCallback(() => {
    orbitControlsRef.current.target = new Vector3(mesh.current.position.x, mesh.current.position.y, mesh.current.position.z)
  }, [orbitControlsRef])

  return (
    <mesh
      position={[currentPoint.x, currentPoint.y, currentPoint.z]}
      ref={mesh}
      scale={scale}
      onClick={focusPoint}
    >
      <sphereGeometry args={[0.4, 32, 16]} />
      <meshStandardMaterial color={ currentPoint.charge > 0 ?  'blue' : 'red'} />
    </mesh>
  )
}
