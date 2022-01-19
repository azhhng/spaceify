import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Components/Header/Header';
import Homepage from './Components/Homepage/Homepage';
import NotFound from './Components/NotFound/NotFound';
import Game from './Components/Game/Game';

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>

          <Route exact path="/" element={<Homepage />}></Route>
          <Route exact path="/game" element={<Game />}></Route>
          <Route exact path="*" element={<NotFound />}></Route>

        </Routes>

      </div>
    </Router>
  );
}

export default App;
