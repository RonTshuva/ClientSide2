import React from "react";
import {NavLink} from "react-router-dom";
import Cookies from "universal-cookie/lib";
import './NavigationBar.css';

class NavigationBar extends React.Component {
    state = {
        links: [
            {title: "Dashboard", path: "/dashboard"},
            {title: "Stores", path: "/stores"},
            {title: "Search", path: "/search"},
            {title: "Settings", path: "/settings"}
        ]
    }

    signOut = () => {
        const cookies = new Cookies();
        cookies.remove("logged_in");
        window.location.reload();
    }

    render() {
        return (
            <div id={"NavigationBar"} style={{marginRight: "20px", marginLeft: "20px", paddingRight: "20px"}}>
                {   //show links with map for each Path (Link) decalared in state
                    this.state.links.map(link => {
                        return (
                            //Define a navigation link: it's destination in header, and title design
                            <NavLink className={"linkText"} to={link.path} activeClassName={"active"}>
                                <div className={"link"} style={{marginBottom: "10px"}}>
                                    <button className={"button"}>
                                        {link.title}
                                    </button>
                                </div>
                            </NavLink>
                        );
                    })
                }
                {/*Another logout link that calls the function logOut*/}
                <NavLink className={"link"} to={"/login"} activeClassName={"active"} onClick={this.signOut}> {/*notice we need to redirect to '/' so it will re render the login page*/}
                <NavLink className={"button"} to={"/"} activeClassName={"active"}
                         onClick={this.signOut}> {/*notice we need to redirect to '/' so it will re render the login page*/}
                    <div className={"linkText"}>
                        <button className='button'>
                            Logout
                        </button>
                    </div>
                </NavLink>
            </div>
        )
            ;
    }
}


export default NavigationBar;
