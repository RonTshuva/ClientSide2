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

class App extends React.Component {

    state = {
        isLoggedIn: false,
        firstTime: false
    }

// first method at atart to check if theres a login coockie:
    componentDidMount() {
        const cookies = new Cookies();
        this.validateToken(cookies.get("logged_in"));
        this.isFirstTime();
    }

// Method --- --- --- Chck if port is true ! ~~~ ~~~ ~~~
    validateToken = (token) => {
        axios.get(
            "http://localhost:8989/validateToken", {params: {token: token}}
        ).then(
            (response) => {
                this.setState({isLoggedIn: response.data.success});
            }
        )
    }

    removeToken = () => {
        const cookies = new Cookies();
        cookies.remove("logged_in");
        window.location.reload();
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
                                        <NavigationBar removeTokenFromApp={this.removeToken}/>
                                        <Routes>
                                            <Route path={"/"} element={<SettingsPage/>}/>
                                            <Route path={"/dashboard"} element={<Dashboard/>}/>
                                            <Route path={"/search"} element={<SearchPage/>}/>
                                            <Route path={"/login"} element={<LoginPage/>}/>
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
            </div>
        )
    }

}

export default App;

