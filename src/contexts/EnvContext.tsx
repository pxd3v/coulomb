import { createContext, ReactNode, useContext, useState } from "react";

interface EnvProviderProps {
    children: ReactNode;
}

interface EnvData {
    isRunning: boolean
    setIsRunning: (isRunning: boolean) => void
    showGrid: boolean
    setShowGrid: (showGrid: boolean) => void
}

const EnvContext = createContext({} as EnvData)

export function EnvProvider({children}: EnvProviderProps) {
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [showGrid, setShowGrid] = useState<boolean>(true)
    return (
        <EnvContext.Provider value={{ isRunning, setIsRunning, showGrid, setShowGrid }}>
            {children}
        </EnvContext.Provider>
    )
}

export const useEnv = () => useContext(EnvContext)