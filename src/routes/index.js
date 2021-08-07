import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Signin from "../components/auth/Signin";
import Signup from "../components/auth/Signup";
import Profile from "../components/auth/UserProfile";
import PlaceList from "../views/place-list/PlaceList";
import PlaceDetail from "../components/placeDetail/PlaceDetail";

const Routes = () => (
    <Switch>
        <Route path='/place/:id' render={(props) => <PlaceDetail {...props}/>}/>
        <Route path='/home'>
            <PlaceList/>
        </Route>
        <Route path='/login'>
            <Signin />
        </Route>
        <Route path='/register'>
            <Signup />
        </Route>
        <Route path='/profile'>
            <Profile />
        </Route>
        <Route path='/'>
            <Redirect to='/home' />
        </Route>
    </Switch>
);

export default Routes;