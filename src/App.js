import './App.css';
import * as React from "react";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
//important imports:
import Cookies from "universal-cookie/lib";
import axios from "axios";
import StoresPage from "./pages/StoresPage";
import Store from "./components/Store";
import NavigationBar from "./components/NavigationBar";
import Constants from "./Constants";
import Sale from "./components/Sale";

class App extends React.Component {


    state = {
        isLoggedIn: false,
        isFirstTime: false,
        notificationsList: [],

    }

// first method at atart to check if theres a login coockie:
    componentDidMount() {
        const cookies = new Cookies();

        if(cookies.get("logged_in")){
            this.validateToken(cookies.get("logged_in"));
            this.establishSocket();
        }

    }

    establishSocket = () =>{
        const cookies = new Cookies();
        const ws  = new WebSocket("ws://localhost:8989/stream?token=" + cookies.get("logged_in"))
        ws.onmessage = (notification) => {
            const data = JSON.parse(notification.data)
            const list = this.state.notificationsList.concat(data.message)
            this.setState({
                notificationsList : list
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
                    isFirstTime : response.data.isFirstTime
                });
            }
        )
    }




// The render only create Routes for now according to existance of login coockie.
    render() {
        return (
            <div>

                <BrowserRouter>
                    {
                        <div>
                            {
                                this.state.isLoggedIn ?
                                    <div>
                                        <NavigationBar/>
                                        <Routes>
                                            {
                                                this.state.isFirstTime ?
                                                    <Route path={"/"} element={<SettingsPage/>}/>
                                                    :
                                                    <Route path={"/"} element={<Dashboard/>}/>
                                            }
                                            <Route path={"/settings"} element={<SettingsPage/>}/>
                                            <Route path={"/dashboard"} element={<Dashboard/>}/>
                                            <Route path={"/search"} element={<SearchPage/>}/>
                                            {/*
                                            <Route path={"/"} element = {<StoresPage/>}/>
                                            <Route path="/store/:id" component={<Store />} />
                                            */}
                                        </Routes>
                                    </div>
                                    :
                                    <div>
                                        <Routes>
                                            <Route path={"/"} element={<LoginPage/>}/>
                                            <Route path={"/login"} element={<LoginPage/>}/>
                                            <Route path={"/signUp"} element={<SignUpPage/>}/>
                                        </Routes>
                                    </div>
                            }
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

