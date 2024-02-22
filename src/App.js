import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ResponsiveDrawer from './components/SideBar/sideBar';
import AdminRoute from './routes/AdminRoute';
import LocationMap from './components/locationMap/location';
import Mycomponent from './components/locationMap/mycomponent';
import Map from './components/locationMap/map';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <ResponsiveDrawer/> */}
      {/* <ThemeProvider theme={theme}> */}
        <BrowserRouter>
          <AdminRoute/>
        </BrowserRouter>
        {/* <LocationMap/> */}
        {/* <Mycomponent/> */}
        {/* <Map/> */}
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
