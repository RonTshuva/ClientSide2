import * as React from "react";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";


class App extends React.Component {


    state = {
        isLoggedIn: false
    }


    render() {
        return (
            <div>
                <BrowserRouter>
                    {
                        <div>
                            {
                                this.state.isLoggedIn ?
                                    <div>
                                        <Routes>

                                            <Route path={"/"} element = {<SettingsPage/>}/>
                                        </Routes>

                                    </div>
                                    :
                                    <div>
                                        <Routes>

                                            <Route path={"/dashboard"} element={<Dashboard/>}/>
                                            <Route path={"/searchPage"} element={<SearchPage/>}/>
                                            <Route path={"/login"} element={<LoginPage/>}/>
                                            <Route path={"/"} element = {<SettingsPage/>}/>
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
