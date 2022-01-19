import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Components/Header/Header';
import Homepage from './Components/Homepage/Homepage';
import NotFound from './Components/NotFound/NotFound';
import Game from './Components/Game/Game';

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Switch>

          <Route exact path="/"> <Homepage /></Route>
          <Route exact path="/game"> <Game /></Route>
          <Route exact path="*"> <NotFound /></Route>

        </Switch>

      </div>
    </Router>
  );
}

export default App;
