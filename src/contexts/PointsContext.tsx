import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { IPoint } from "../components/Point";

interface PointsProviderProps {
    children: ReactNode;
}

interface PointsData {
    points: Array<IPoint>
    updatePoint: (point: IPoint) => void
    resetPoints: () => void
    updateBasePoints: (point: IPoint) => void
    createNewPoint: () => void
}

const PointsContext = createContext({} as PointsData)

export function PointsProvider({children}: PointsProviderProps) {
    const [basePoints, setBasePoints] = useState<Array<IPoint>>([
        {
            charge: -1,
            x: -1,
            y: 0,
            z: 0,
            id: 0
        },
        {
            charge: -1,
            x: 1,
            y: 1,
            z: 0,
            id: 1
        }
    ])

    const [points, setPoints] = useState<Array<IPoint>>([...basePoints])
    
    const [nextIndex, setNextIndex] = useState(2)
    
    const updatePoint = useCallback((point: IPoint) => {
        setPoints((prevPoints) => prevPoints.map((prevPoint) => prevPoint.id === point.id ? point : prevPoint))
    }, [])

    const resetPoints = useCallback((newPoints?: Array<IPoint>) => {
        setPoints([...(newPoints || basePoints)])
    }, [basePoints])

    const updateBasePoints = useCallback((point: IPoint) => {
        setBasePoints((currentBasePoints) => currentBasePoints.map(currentPoint => currentPoint.id === point.id ? point : currentPoint))
        resetPoints()
    }, [resetPoints])

    const createNewPoint = useCallback(() => {
        const newPoint = {
            charge: 1,
            x: 0,
            y: 0,
            z: 0,
            id: nextIndex
        }
        setNextIndex(nextIndex + 1)
        setBasePoints([...points, newPoint])
        resetPoints([...points, newPoint])
    }, [nextIndex, points, resetPoints])
    

    return (
        <PointsContext.Provider value={{ points, updatePoint, resetPoints, updateBasePoints, createNewPoint }}>
            {children}
        </PointsContext.Provider>
    )
}

export const usePoints = () => useContext(PointsContext)