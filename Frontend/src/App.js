import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import OrderItem from "./OrderItem";
import Admin from "./Admin";
import Book from "./Book";
import Billing from "./Billing";
import Navbar from "./Navbar1";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/booktable" component={Book} />
        <Route exact path="/orderitem/:tno" component={OrderItem} />
        <Route exact path="/billing/:tno" component={Billing} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
