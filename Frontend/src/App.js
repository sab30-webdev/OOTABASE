import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import OrderItem from "./OrderItem";
import Admin from "./Admin";
import Admin2 from "./Admin2";
import Kitchen from "./Kitchen";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/orderitem" component={OrderItem} />
        <Route exact path="/admin" component={Admin2} />
        <Route exact path="/kitchen" component={Kitchen} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
