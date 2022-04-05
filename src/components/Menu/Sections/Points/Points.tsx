import './Points.scss'
import { usePoints } from "../../../../contexts/PointsContext";
import { IPoint } from '../../../Point';
import { useEnv } from '../../../../contexts/EnvContext';

enum PossibleChanges {
  'charge'= 'charge',
  'x' = 'x',
  'y' = 'y',
  'z' = 'z'
}

function Points() {
  const { points, updatePoint, createNewPoint, removePoint } = usePoints()
  const { setIsRunning } = useEnv()
  
  const onChange = (event: React.ChangeEvent<HTMLInputElement>, point: IPoint, property: PossibleChanges) => {
    const newPoint = { ...point, [property]: Number(event.currentTarget.value) }
    updatePoint(newPoint)
    setIsRunning(false)
  }

  const onCreateNewPoint = () => {
    createNewPoint()
    setIsRunning(false)
  }

  return (
    <div className="Points">
        {points.map((point) => (
          <div className="Points__Input" key={point.id}>
            {/* <input type="number" value={point.charge} onChange={(event) => onChange(event, point, PossibleChanges.charge)}></input>
            <input type="number" value={point.x} onChange={(event) => onChange(event, point, PossibleChanges.x)}></input>
            <input type="number" value={point.y} onChange={(event) => onChange(event, point, PossibleChanges.y)}></input>
            <input type="number" value={point.z} onChange={(event) => onChange(event, point, PossibleChanges.z)}></input> */}
            <div> 
              <label>
                Charge
              </label>
              <input type="number" value={point.charge} onChange={(event) => onChange(event, point, PossibleChanges.charge)}></input>
            </div>
            <div> 
              <label>
                X
              </label>
              <input type="number" value={point.x} onChange={(event) => onChange(event, point, PossibleChanges.x)}></input>
            </div>
            <div>
              <label>
                Y
              </label>
              <input type="number" value={point.y} onChange={(event) => onChange(event, point, PossibleChanges.y)}></input>
            </div>
            <div>
              <label>
                Z
              </label>
              <input type="number" value={point.z} onChange={(event) => onChange(event, point, PossibleChanges.z)}></input>
            </div>
            <button onClick={() => removePoint(point.id)}>X</button>
          </div>
        ))}
        <button className="Points__CreateNewPoint" onClick={onCreateNewPoint}>Create new point</button>
    </div>
  );
}

export default Points;
