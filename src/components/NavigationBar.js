import './App.css';
import React from "react";
import {NavLink} from "react-router-dom";


class NavigationBar extends React.Component {
    state = {
        links: [
            { title: "Dashboard", path: "/dashboard" },
            { title: "Shops", path: "/shops" },
            { title: "Search", path: "/search" },
            { title: "Settings", path: "/settings" }
        ]
    }

    logOut = () => {
        this.props.removeTokenFromApp()
    }

    render() {
        return (
            <div id={"NavigationBar"}>
                {   //show links with map for each Path (Link) decalared in state
                    this.state.links.map(link => {
                        return (
                            //Define a navigation link: it's destination in header, and title design
                            <NavLink className={"link"} to={link.path} activeClassName={"active"}>
                                <div className={"linkText"}>
                                    {link.title}
                                </div>
                            </NavLink>
                        );
                    })
                }
                {/*Another logout link that calls the function logOut*/}
                <div className={"link"}>
                    <div className={"linkText"} onClick={this.logOut}> Log Out </div>
                </div>
            </div>
        );
    }
}


export default NavigationBar;
