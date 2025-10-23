import React from 'react';
// Change: Import Switch instead of Routes
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Components
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import ProductCategory from './components/ProductCategory';
import Recipes from './components/Recipes';
import Catering from './components/Catering';
import Club from './components/Club';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
        <Nav />
        <main className="flex-grow">
          {/* Change: Use Switch instead of Routes */}
          <Switch>
            {/* Change: Use 'exact path' and 'component' prop */}
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:category" component={ProductCategory} />
            <Route exact path="/recipes" component={Recipes} />
            <Route exact path="/catering" component={Catering} />
            <Route exact path="/club" component={Club} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/admin" component={Admin} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;