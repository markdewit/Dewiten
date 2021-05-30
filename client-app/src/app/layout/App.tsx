import React from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router';
import HomePage from '../../features/home/homepage';
import ActivityForm from '../../features/activities/from/ActivityForm';
import Activitydetails from '../../features/activities/details/ActivityDetails';
import { Switch, useLocation } from 'react-router-dom';
import TestErrors from '../../features/errors/TestError';
import ServerError from '../../features/errors/serverError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/pageNotFound';


function App() {
  const location =useLocation();
  return (
    <>
    <ToastContainer position="bottom-right"/>
        <Route exact path='/' component={HomePage} />
        <Route path={'/(.+)'}
        render={() => (
        <>
          <Navbar/>
            <Container style={{marginTop: '7em'}}>
              <Switch>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={Activitydetails} />
              <Route key={location.key}  path={['/createActivity', '/manage/:id']} component={ActivityForm} />
              <Route path='/errors' component={TestErrors} />
              <Route path='/server-error' component={ServerError} />
              <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
