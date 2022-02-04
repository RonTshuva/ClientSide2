import './LoginPage.css'
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {NavLink, Route} from "react-router-dom";
import Constants from "../Constants";
import SignUpPage from "./SignUpPage";

class LoginPage extends React.Component {

    state = {
        username: "",
        password: "",
        response: "",

    }

    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    componentDidMount() {
        const cookies = new Cookies();
        if(cookies.get("logged_in")){
            this.setState({
                response : "Loading..."
            })
        }

    }

    login = () => {
        axios.get(Constants.SERVER_URL + "login", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((response) => {
                if (response.data.success) {
                    const token = response.data.dataSet[Constants.FIRST_OBJECT]
                    const cookies = new Cookies();
                    cookies.set("logged_in", token); // gets the first object which is the token
                    this.setState({response : "Loading..."})
                    window.location.reload()
                }
                else {
                    switch (response.data.errorCode) {
                        case Constants.ERROR_CODE:
                            this.setState({response: "the credentials you provided are wrong!"});
                            break;
                        default:
                            this.setState({response: "invalid error code!"});
                    }
                }
            })
    }


    render() {
        return (
            <div>
                <b id={"h1"} className={"title"}>Login page</b>
                <div class={"container1"}>
                    <div>
                        <br/>
                        <span class={"midTitle"}>Enter credentials</span>
                        <br/> <br/>
                        <b> Username:</b>
                        <br/>
                        <input class={"detailsOfClient"}
                               onChange={this.onUsernameChange}
                               value={this.state.username}
                               placeholder={"Enter username"}
                        />
                        <br/>
                        <b > Password:</b>
                        <br/>
                        <input class={"detailsOfClient"}
                               onChange={this.onPasswordChange}
                               value={this.state.password}
                               placeholder={"Enter password"}
                        />
                        <br/>
                        <br/>
                    </div>
                    <NavLink to={"/login"} >
                        <button class={"button"}
                                style={{backgroundColor: "mediumseagreen"}}
                                disabled={this.state.password.length === 0 || this.state.username.length === 0}
                                onClick={this.login}>Login</button>
                    </NavLink>
                    <NavLink to={"/signup"} >
                        <button class={"button"} style={{backgroundColor: "mediumseagreen"}} >Sign Up</button>
                    </NavLink>
                    <br/>
                    {
                        this.state.response.length > 0 &&
                        <div class={"LoginPageError"} > {this.state.response}</div>
                    }
                </div>
            </div>
        )
    }
}
export default LoginPage;
