import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '~/assets/scss/app.scss';
import Home from '~/components/pages/home';
import About from '~/components/pages/about';
import Login from '~/components/pages/login';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Route path='/' exact component={Home} />
        <Route path='/about' exact component={About} />
        <Route path='/login' exact component={Login} />
      </Router>
    </React.Fragment>
  );
}

export default App;
