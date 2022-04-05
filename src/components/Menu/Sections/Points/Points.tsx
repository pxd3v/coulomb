import './Points.scss'
import { usePoints } from "../../../../contexts/PointsContext";
import { IPoint } from '../../../Point';
import { useEnv } from '../../../../contexts/EnvContext';
import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';

enum PossibleChanges {
  'charge'= 'charge',
  'x' = 'x',
  'y' = 'y',
  'z' = 'z'
}

function Points() {
  const { points, updatePoint, createNewPoint, removePoint, updateBasePoints, parsePoint, resetPoints } = usePoints()
  const [ formPoints, setFormPoints ] = useState<Array<IPoint>>([...points])
  
  const { setIsRunning } = useEnv()
  const debounceFactory = (debounceCallback: any, delay = 500) => {
    let debounce: number | null = null
    
    return (...args: any) => {
      if (debounce) {
        window.clearInterval(debounce)
      }
      
      debounce = window.setTimeout(() => {
        debounceCallback(...args)
      }, delay)
    }
  }
  
  const onChangeDebounce = debounceFactory((point: IPoint) => {
    updatePoint(parsePoint(point))
    setIsRunning(false)
  })

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, point: IPoint, property: PossibleChanges) => {
    const newPoint = { ...point, [property]: event.target.value }
    const newPoints = [...formPoints.map((prevPoint) => prevPoint.id === point.id ? newPoint : prevPoint)]
    setFormPoints(newPoints)
    onChangeDebounce(newPoint)
  }
  const onCreateNewPoint = () => {
    const newPoint = createNewPoint()
    setFormPoints([...formPoints, newPoint])
    setIsRunning(false)
    resetPoints([...formPoints, newPoint])
  }
  
  const onRemove = (pointID: number) => {
    removePoint(pointID)
    setFormPoints((currentFormPoints) => currentFormPoints.filter(point => point.id !== pointID))
  }

  useEffect(() => {
    updateBasePoints(formPoints)
  }, [formPoints, updateBasePoints])

  return (
    <div className="Points">
        {formPoints.map((point) => (
          <div className="Points__Input" key={point.id}>
            <div> 
              <label>
                Charge
              </label>
              <input type="text" value={point.charge} onChange={(event) => onChange(event, point, PossibleChanges.charge)}></input>
            </div>
            <div> 
              <label>
                X
              </label>
              <input type="text" value={point.x} onChange={(event) => onChange(event, point, PossibleChanges.x)}></input>
            </div>
            <div>
              <label>
                Y
              </label>
              <input type="text" value={point.y} onChange={(event) => onChange(event, point, PossibleChanges.y)}></input>
            </div>
            <div>
              <label>
                Z
              </label>
              <input type="text" value={point.z} onChange={(event) => onChange(event, point, PossibleChanges.z)}></input>
            </div>
            <button onClick={() => onRemove(point.id)}><GrClose /></button>
          </div>
        ))}
        <button className="Points__CreateNewPoint" onClick={onCreateNewPoint}>Create new point</button>
    </div>
  );
}

export default Points;
