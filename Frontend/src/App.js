import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
