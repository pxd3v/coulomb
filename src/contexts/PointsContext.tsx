import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { IPoint } from "../components/Point";

interface PointsProviderProps {
    children: ReactNode;
}

interface PointsData {
    points: Array<IPoint>
    updatePoint: (point: IPoint) => void
    resetPoints: () => void
}

const PointsContext = createContext({} as PointsData)

export function PointsProvider({children}: PointsProviderProps) {
    const basePoints: Array<IPoint> = useMemo(() => [
        {
        charge: -1,
        position: [-0.5, 0, 0],
        id: 1
        },
        {
        charge: -1,
        position: [0, 0, 0.5],
        id: 2
        },
        {
        charge: -1,
        position: [0, 1, 0.5],
        id: 3
        },
        {
        charge: -1,
        position: [0, 0.5, 0.5],
        id: 4
        },
        {
        charge: 4,
        position: [-2, -3, 0.5],
        id: 5
        }
    ], [])
    const [points, setPoints] = useState<Array<IPoint>>(basePoints)
    const updatePoint = useCallback((point: IPoint) => {
        setPoints((prevPoints) => prevPoints.map((prevPoint) => prevPoint.id === point.id ? point : prevPoint))
    }, [])
    const resetPoints = useCallback(() => {
        setPoints(basePoints)
    }, [basePoints])

    return (
        <PointsContext.Provider value={{ points, updatePoint, resetPoints }}>
            {children}
        </PointsContext.Provider>
    )
}

export const usePoints = () => useContext(PointsContext)