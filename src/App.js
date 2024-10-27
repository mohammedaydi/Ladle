import "./App.css";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import Navbar from "./components/shared/Navigation/Navbar";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" Component={Homepage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
