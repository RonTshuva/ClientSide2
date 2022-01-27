import './LoginPage.css'
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {NavLink} from "react-router-dom";
import constants from "./Constants";
import * as Constants from "constants";

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

    login = () => {
        axios.get("http://localhost:8989/login", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((response) => {
                if (response.data.success) {
                    const cookies = new Cookies();
                    cookies.set("logged_in", response.data.dataSet[Constants.FIRST_OBJECT]);
                    this.setState({response : ""})
                    window.location.reload()
                }
                else {
                    switch (response.data.errorCode) {
                        case constants.INCORRECT_USERNAME:
                            this.setState({response: "username is incorrect!"});
                            break;
                        case constants.INCORRECT_PASSWORD:
                            this.setState({response: "password is incorrect! you tried " + response.data.dataString + " out of 5 tries!"});
                            break;
                        case constants.GENERAL_ERROR:
                            this.setState({response: "something went wrong!"});
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
                <div id="frame" class={"container2"}>
                    <div>
                        <b id="title">Login page</b>
                        <br/>
                        <span class={"midTitle"}>Enter credentials</span>
                        <br/>
                        <b> Username:</b>
                        <input class={"detailsOfClient"}
                               onChange={this.onUsernameChange}
                               value={this.state.username}
                               placeholder={"Enter username"}
                        />
                        <br/>
                        <b > Password:</b>

                        <input class={"detailsOfClient"}
                               onChange={this.onPasswordChange}
                               value={this.state.password}
                               placeholder={"Enter password"}
                        />
                        <br/>
                        <br/>
                    </div>
                    <button id="button"  style={{backgroundColor: "darkblue"}}
                            disabled={this.state.password.length === 0 || this.state.username.length === 0}
                            onClick={this.login}>Login</button>
                    <NavLink to={"/sign-up"} >
                        <button id={"button"} style={{backgroundColor: "green"}} >Sign Up</button>
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