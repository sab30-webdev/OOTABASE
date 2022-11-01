import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import OrderItem from "./OrderItem";
import Admin from "./Admin";
import Book from "./Book";
import Billing from "./Billing";
import Navbar from "./Navbar1";
import Kitchen from "./Kitchen";
import {
  ProtectedAdminRoute,
  ProtectedKitchenRoute,
  ProtectedWaiterRoute,
} from "./auth/ProtectedRoute";
import initApp from "./fire/firebase";

const App = () => {
  initApp();

  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <ProtectedAdminRoute exact path='/admin'>
          <Admin />
        </ProtectedAdminRoute>
        <ProtectedWaiterRoute exact path='/booktable'>
          <Book />
        </ProtectedWaiterRoute>
        <ProtectedWaiterRoute exact path='/orderitem/:tno'>
          <OrderItem />
        </ProtectedWaiterRoute>
        <ProtectedWaiterRoute exact path='/billing/:tno'>
          <Billing />
        </ProtectedWaiterRoute>
        <ProtectedKitchenRoute exact path='/kitchen'>
          <Kitchen />
        </ProtectedKitchenRoute>
        <Route exact path='/'>
          <Redirect to='/login' />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
