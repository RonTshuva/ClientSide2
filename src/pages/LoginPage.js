import './LoginPage.css'
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {NavLink} from "react-router-dom";
import Constants from "../Constants";

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
        axios.get(Constants.SERVER_URL + "login", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((response) => {
                if (response.data.success) {
                    const cookies = new Cookies();
                    cookies.set("logged_in", response.data.dataSet[Constants.FIRST_OBJECT]); // gets the first object which is the token
                    this.setState({response : ""})
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
                aaaaa
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
                    <NavLink to={"/signup"} >
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
