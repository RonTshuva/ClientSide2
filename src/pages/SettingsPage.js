import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import './SettingsPage.css';



class SettingsPage extends React.Component{
    state = {
        listOrganizations : [],
        token : "",
        response : ""
    }

    componentDidMount() {
        this.getAllOrganizations()
    }

    getAllOrganizations = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-organizations", {
            params: {
                token: cookies.get("logged_in")
            }
        })
            .then((response) => {
                if(response.data.success) {
                    this.setState({
                        listOrganizations: response.data.dataSet
                    })
                }
            })
    }

    removeRelationshipUO = (organizationId) => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/remove-relationshipUO", {
            params: {
                token: cookies.get("logged_in"),
                organizationId
            }
        })
            .then((response) => {
                if(response.data.success) {
                    const currentOrganizations = this.state.listOrganizations;
                    this.setState({
                        listOrganizations: currentOrganizations
                    })
                }
            })
    }

    addRelationshipUO = (organizationId) => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/add-relationshipUO", {
            params: {
                token: cookies.get("logged_in"),
                organizationId
            }
        })
            .then((response) => {
                if(response.data.success) {
                    const currentOrganizations = this.state.listOrganizations;
                    this.setState({
                        listOrganizations: currentOrganizations
                    })
                }
            })
    }


render() {
    const listUsersOrganizations = this.state.listOrganizations.filter(organization =>{
            return organization.belongsToUser
    })
    return (
        <div>
            kkkkkkkkkkkkkkkkkkkkk
            {
                this.state.listOrganizations.length > 0 &&
                this.state.listOrganizations.map(organization => {
                    return (
                        <div style={{borderBottom: "1px solid blue", padding: "10px", width: "300px"}}>

                            <i style={{fontSize: "12px"}}>
                                {organization.object.name}
                            </i>
                            <p style={{fontSize: "8px"}}>
                                {organization.object.description}
                            </p>

                            <p style={{fontSize: "8px"}}>
                                Members :{organization.object.members}
                            </p>

                            <h1>Member</h1>

                            <label className="container" onClick={() => this.addRelationshipUO(organization.id)}>Yes
                                <input type="radio" name="radio" checked={organization.belongsToUser}/>
                                <div className="checkmark"></div>
                            </label>

                            <label className="container" onClick={() => this.removeRelationshipUO(organization.id)}>No
                                <input type="radio" name="radio" checked={organization.belongsToUser} />
                                <div className="checkmark"></div>
                            </label>
oits]r
                        </div>
                    )
                })
            }
        </div>

    )
}

}
export default SettingsPage;