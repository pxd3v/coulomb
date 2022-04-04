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
  const { points, updatePoint } = usePoints()
  const { setIsRunning } = useEnv()
  
  const onChange = (event: React.ChangeEvent<HTMLInputElement>, point: IPoint, property: PossibleChanges) => {
    const newPoint = { ...point, [property]: Number(event.currentTarget.value) }
    updatePoint(newPoint)
    setIsRunning(false)
  }

  return (
    <div className="Points">
        {points.map((point) => (
          <span className="Points__Input" key={point.id}>
            <label>
              Charge
              <input type="number" value={point.charge} onChange={(event) => onChange(event, point, PossibleChanges.charge)}></input>
            </label>
            <label>
              X
              <input type="number" value={point.x} onChange={(event) => onChange(event, point, PossibleChanges.x)}></input>
            </label>
            <label>
              Y
              <input type="number" value={point.y} onChange={(event) => onChange(event, point, PossibleChanges.y)}></input>
            </label>
            <label>
              Z
              <input type="number" value={point.z} onChange={(event) => onChange(event, point, PossibleChanges.z)}></input>
            </label>
          </span>
        ))}
    </div>
  );
}

export default Points;
