import * as React from "react";
import {NavLink} from "react-router-dom";
import Cookies from "universal-cookie";

class HomePage extends React.Component{

    state = {
        links : [
            {title:"Messages", path:"/messagesPage"},
            {title:"New Message" , path:"/newMessage"}
        ]
    }

    logout = () => {
        const cookies = new Cookies();
        cookies.remove("logged_in");
        window.location.reload();
    }


    render() {
        return(
            <div>
                <div id="frame" class={"container"}>
                    <b id="title">Home Page</b><br/>
                    {
                        this.state.links.map(link => {
                            return (
                                <NavLink to={link.path}>
                                    <br/>
                                    <button id={"button"} style={{backgroundColor: "green" , width : "150px"}} >
                                        <b style={{fontSize : "9px"}}>{link.title}</b>
                                    </button>
                                </NavLink>
                            )
                        })

                    }
                    <br/><br/>
                    <button id={"button"} style={{backgroundColor: "red"}} onClick={this.logout}>
                        Logout
                    </button>
                </div>
            </div>
        )
    }
}
export default HomePage;
