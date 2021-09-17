import './App.css';

import Home from './pages/Home';
import Unit from './pages/Unit';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul style={{display: 'flex'}}>
            <li style={{marginRight: '40px'}}>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/unit">Unit</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/unit">
            <Unit />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
