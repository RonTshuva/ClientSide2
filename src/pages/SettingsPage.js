import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import './SettingsPage.css';
import Constants from "../Constants";

class SettingsPage extends React.Component{
    state = {
        listOrganizations : [],
        token : "",
        response : "loading..."

    }

    componentDidMount() {
        this.getAllOrganizations()
    }

    getAllOrganizations = () => {
        const cookies = new Cookies();
        axios.get(Constants.SERVER_URL + "get-organizations", {
            params: {
                token: cookies.get("logged_in")
            }
        })
            .then((response) => {
                if(response.data.success) {
                    this.setState({
                        response : "", // clearing the response
                        listOrganizations: response.data.dataSet
                    })
                }
                else{
                    this.setState({
                        response : "there was a problem to get organizations from database!"
                    })
                }
            })
    }

    changeRelationshipUO = (organization) => {
        const cookies = new Cookies();
        axios.get(Constants.SERVER_URL + "change-relationshipUO", {
            params: {
                token: cookies.get("logged_in"),
                organizationId: organization.object.id,
                friendShip : organization.belongsToUser
            }
        })
            .then((response) => {
                this.setState({
                    response : "changed " + organization.object.name + " friendship " + (response.data.success ? "successfully" : "failed!")
                })
            })
    }


    changeFriendShip = (organization) =>{
        organization.belongsToUser = !organization.belongsToUser
        this.setState({
            response : "loading..."
        })
        this.changeRelationshipUO(organization)
    }

render() {

    return (
        <div>
            <span style={{color : "blue"}}>  {this.state.response}</span>
            {
                this.state.listOrganizations.length > 0 &&
                this.state.listOrganizations.map(organization => {
                    return (
                        <div style={{borderBottom: "1px solid blue", padding: "10px", width: "300px"}}>

                            <i style={{fontSize: "16px"}}>
                                {organization.object.name}
                            </i>
                            <p style={{fontSize: "8px"}}>
                                {organization.object.description}
                            </p>

                            <p style={{fontSize: "8px"}}>
                                Members :{organization.object.members}
                            </p>

                            <span>Member:    </span>
                            yes <input onChange={() => this.changeFriendShip(organization)}
                                type={"radio"}
                                name={"radio-yes-" + organization.object.name}// the name has to be different for each radio button
                                value={"yes"}
                                checked={organization.belongsToUser === true}
                                />
                            no <input onChange={() => this.changeFriendShip(organization)}
                                type={"radio"}
                                name={"radio-no-" + organization.object.name} // the name has to be different for each radio button
                                value={"no"}
                                checked={organization.belongsToUser !== true}
                            />

                        </div>
                    )
                })
            }
        </div>

    )
}

}
export default SettingsPage;
/*<label className="container" onClick={() => this.addRelationshipUO(organization.id)}>Yes
                                <input type="radio" name="radio" checked={organization.belongsToUser}/>
                                <div className="checkmark"></div>
                            </label>

                            <label className="container" onClick={() => this.removeRelationshipUO(organization.id)}>No
                                <input type="radio" name="radio" checked={!(organization.belongsToUser)} />
                                <div className="checkmark"></div>
                            </label>*/
