import './App.css';
import * as React from "react";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import {BrowserRouter, Route} from 'react-router-dom';
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
import StoresPage from "./pages/StoresPage";
import Store from "./components/Store";
//important imports:
import Cookies from "universal-cookie/lib";
import axios from "axios";
import NavigationBar from "./components/NavigationBar";
import Constants from "./Constants";
import {Redirect} from "react-router";


class App extends React.Component {


    state = {
        isLoggedIn: false,
        isFirstTime: false,
        notificationsList: [],

    }

// first method at atart to check if theres a login coockie:
    componentDidMount() {
        const cookies = new Cookies();

        if (cookies.get("logged_in")) {
            this.validateToken(cookies.get("logged_in"));
            this.establishSocket();
        }

    }

    establishSocket = () => {
        const cookies = new Cookies();
        const ws = new WebSocket("ws://localhost:8989/stream?token=" + cookies.get("logged_in"))
        ws.onmessage = (notification) => {
            const data = JSON.parse(notification.data)
            const list = this.state.notificationsList.concat(data.message)
            this.setState({
                notificationsList: list
            })
        }
    }

    validateToken = (token) => {
        axios.get(
            Constants.SERVER_URL + "validateToken", {params: {token: token}}
        ).then(
            (response) => {
                this.setState({
                    isLoggedIn: response.data.success,
                    isFirstTime: response.data.isFirstTime
                });
            }
        )
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    {
                        this.state.isLoggedIn ?
                            <div style={{display: "flex", alignItems: "start", marginTop: "50px"}}>
                                <NavigationBar/>
                                {
                                    this.state.isFirstTime ?
                                        <Route path={"/"} component={SettingsPage} exact={true}/>
                                        :
                                        <Route path={"/"} component={Dashboard} exact={true}/>
                                }
                                <Route path={"/dashboard"} component={Dashboard} exact={true}/>
                                <Route path={"/stores"} component={StoresPage} exact={true}/>
                                <Route path={"/stores/:id"} component={Store} exact={true}/>
                                <Route path={"/search"} component={SearchPage} exact={true}/>
                                <Route path={"/settings"} component={SettingsPage} exact={true}/>
                            </div>
                            :
                            <div>
                                <Route path={"/"} component={LoginPage} exact={true}/>
                                <Route path={"/login"} component={LoginPage} exact={true} />
                                <Route path={"/signUp"} component={SignUpPage} exact={true}/>
                            </div>
                    }
                </BrowserRouter>
                {
                    this.state.notificationsList.length > 0 &&
                    this.state.notificationsList.map(notification =>{
                        return(
                            <div>
                                {notification}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default App;


