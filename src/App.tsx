import './App.css';
import Scene from './components/Scene';
import { PointsProvider } from './contexts/PointsContext';
import Menu from './components/Menu/Menu';
import { EnvProvider } from './contexts/EnvContext';

function App() {
  return (
    <div className="AppContainer">
      <EnvProvider>
        <PointsProvider>
          <Menu />
          <Scene />
        </PointsProvider>
      </EnvProvider>
    </div>
  );
}

export default App;
