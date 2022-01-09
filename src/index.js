import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import  SetupPage from './pages/SetupPage';
import Dashboard from './pages/Dashboard';

const destination = document.getElementById('root');

ReactDOM.render(
    destination,
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    {/*<Route exact path="/login/forgotpassword" component={ForgotPassword} />*/}
                    {/*<Route exact path="/users/resetpassword" component={ResetPassword} />*/}
                    {/*<Route exact path="/signup" component={Signup} />*/}
                    {/*<Route exact path="/users/validate" component={SignupValidation} />*/}
                    <Route component={App} />
                </Switch>
            </Router>
        </ThemeProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
