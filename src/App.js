import React, { Fragment, useContext,useEffect } from "react";
import DriverAdd from "./components/Driver/DriverAdd"; 
import UserContext from "./store/UserContext";
import { Route,Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
const App = () =>{
   const context1 = useContext(UserContext);
   useEffect(() =>{context1.getUser()},[]);
    return(<Fragment>
        <Switch>
        <Route path = '/' exact><Dashboard /></Route>
        <Route path = '/add' exact>
<DriverAdd /></Route>
</Switch>
        

</Fragment>

    );
};
export default App;