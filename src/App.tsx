import './App.css';
import Scene from './components/Scene';
import { PointsProvider } from './contexts/PointsContext';
import Menu from './components/Menu/Menu';
import { EnvProvider } from './contexts/EnvContext';

function App() {
  return (
    <div className="AppContainer">
      <PointsProvider>
        <EnvProvider>
          <Menu />
          <Scene />
        </EnvProvider>
      </PointsProvider>
    </div>
  );
}

export default App;
