import * as React from "react";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
import StoresPage from "./pages/StoresPage";
import StoreComponent from "./components/StoreComponent";

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

                                            <Route path={"/"} element = {<StoresPage/>}/>
                                            <Route path="/store/:id" component={<StoreComponent />} />
                                        </Routes>

                                    </div>
                                    :
                                    <div>

                                            <Routes>
                                                <Route path={"/"} element = {<StoresPage/>}/>
                                                <Route path={"/settingsPage"} element = {<SettingsPage/>}/>
                                                <Route path="/store/:id" component={<StoreComponent />} />
                                                <Route path={"/dashboard"} element={<Dashboard/>}/>
                                                <Route path={"/searchPage"} element={<SearchPage/>}/>
                                                <Route path={"/login"} element={<LoginPage/>}/>
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
