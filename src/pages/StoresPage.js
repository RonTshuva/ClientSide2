import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Constants from "../Constants";
import {Link} from "react-router-dom";

class StoresPage extends React.Component {

    state = {
        listStores :[],
        response : "loading..."

    }


    componentDidMount() {
        this.getAllStores()
    }

    getAllStores = () => {
        axios.get(Constants.SERVER_URL + "get-stores", {
        })
            .then((response) => {
                if(response.data.success ) {
                    this.setState({
                        listStores: response.data.dataSet,
                        response : ""
                    })
                }else{
                    this.setState({
                        response : "there was a problem getting sales from db!"
                    })
                }
            })
    }





    render() {

        return(
            <div>
                <span class={"shopName"} style={{color : "blue"}}>{this.state.response} </span>
                <br/>
                <div id={"h1"} className={"title"}>Stores:</div>
                <br/>  <br/>  <br/>  <br/>  <br/>
                <ul>
                    {
                        this.state.listStores.length > 0 &&
                            this.state.listStores.map(store => {
                                return(
                                    <li>
                                        <Link to={"/stores/" + store.id}>
                                            <h3> {store.name}  </h3>
                                        </Link>
                                        <br/><br/>
                                    </li>
                                )
                            })
                    }
                </ul>
            </div>
        )

    }
}
export default StoresPage;





