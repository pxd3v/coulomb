import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { IPoint } from "../components/Point";

interface PointsProviderProps {
    children: ReactNode;
}

interface PointsData {
    points: Array<IPoint>
    updatePoint: (point: IPoint) => void
    resetPoints: (newPoints?: Array<IPoint>) => void
    updateBasePoints: (points: Array<IPoint>) => void
    createNewPoint: () => IPoint
    removePoint: (pointId: number) => void
    parsePoint: (point: IPoint) => IPoint
    generateRandomPoints: (numberOfPoints: number) => void
}

const PointsContext = createContext({} as PointsData)

export function PointsProvider({children}: PointsProviderProps) {
    const [basePoints, setBasePoints] = useState<Array<IPoint>>([
        {
            charge: 8,
            x: 0,
            y: 0,
            z: 0,
            id: 0
        },
        {
            charge: -2,
            x: 2,
            y: 1,
            z: 0,
            id: 1
        },
        {
            charge: -2,
            x: 0,
            y: -2,
            z: 0,
            id: 2
        },
        {
            charge: -2,
            x: 0,
            y: 1,
            z: -1,
            id: 3
        },
        {
            charge: -2,
            x: 0,
            y: 1,
            z: -2,
            id: 4
        },
    ])

    const [points, setPoints] = useState<Array<IPoint>>([...basePoints])
    
    const [nextIndex, setNextIndex] = useState(3)
    
    const updatePoint = useCallback((point: IPoint) => {
        setPoints((prevPoints) => prevPoints.map((prevPoint) => prevPoint.id === point.id ? point : prevPoint))
    }, [])

    const resetPoints = useCallback((newPoints?: Array<IPoint>) => {
        setPoints([...(newPoints || basePoints)])
    }, [basePoints])

    const updateBasePoints = useCallback((points: Array<IPoint>) => {
        setBasePoints([...points.map(point => parsePoint(point))])
    }, [])

    const createNewPoint = useCallback(() => {
        const newPoint = {
            charge: 1,
            x: 0,
            y: 0,
            z: 0,
            id: nextIndex
        }
        setNextIndex(nextIndex + 1)
        return newPoint
    }, [nextIndex])

    const removePoint = useCallback((pointId) => {
        const newPoints = basePoints.filter(point => point.id !== pointId)
        setBasePoints([...newPoints])
        setPoints([...newPoints])
    }, [basePoints])

    const parsePoint = (point: IPoint) => {
        return {
        charge: Number(point.charge),
        x: Number(point.x),
        y: Number(point.y),
        z: Number(point.z),
        id: point.id
        }
    }

    const generateRandomPoints = (numberOfPoints: number) => {
        setPoints(new Array(numberOfPoints).fill(0).map((_item, id) => ({
            charge: Math.random() * 8 * (Math.random() >= 0.5 ? 1 : -1),
            x: Math.random() * 5 * (Math.random() >= 0.5 ? 1 : -1),
            y: Math.random() * 5 * (Math.random() >= 0.5 ? 1 : -1),
            z: Math.random() * 5 * (Math.random() >= 0.5 ? 1 : -1),
            id
        })))
    }

    return (
        <PointsContext.Provider value={{ points, updatePoint, resetPoints, updateBasePoints, createNewPoint, removePoint, parsePoint, generateRandomPoints }}>
            {children}
        </PointsContext.Provider>
    )
}

export const usePoints = () => useContext(PointsContext)