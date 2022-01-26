import * as React from "react";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SearchPage from "./pages/SearchPage";
import SetupPage from "./pages/SetupPage";
//important imports:
import Cookies from "universal-cookie/lib";
import axios from "axios";

class App extends React.Component {


    state = {
        isLoggedIn: false,
        firstTime: true
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
        // Method to check if first time of user on the site
    isFirstTime = (token) => {
        axios.get(
            "http://localhost:8989/isFirstTime", {params: {token: token}}
        ).then(
            (response) => {
                this.setState({firstTime: response.data.success});
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
                            {   //Condition
                                this.state.isLoggedIn ?
                                    //if login coockie exist
                                    <div>
                                        <Routes>
                                            {if(this.state.firstTime)
                                            {
                                                <Route path={"/"} element={<SetupPage/>}/>
                                                this.setState.firstTime = false;
                                            }
                                                else
                                                <Route path={"/"} element={<Dashboard/>}/>
                                            }
                                            <Route path={"/dashboard"} element={<Dashboard/>}/>
                                            <Route path={"/searchPage"} element={<SearchPage/>}/>
                                            <Route path={"/login"} element={<LoginPage/>}/>
                                        </Routes>
                                    </div>
                                    : //if not
                                    <div>
                                        <Routes>
                                            <Route path={"/"} element={<LoginPage/>}/>
                                            <Route path={"/login"} element={<LoginPage/>}/>
                                            <Route path={"/sign-up"} element={<SignUpPage/>}/>
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
