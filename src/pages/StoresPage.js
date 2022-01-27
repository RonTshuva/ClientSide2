import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Constants from "../Constants";

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
                if(response.data.success) {
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
                <span style={{color : "blue"}}>{this.state.response} </span>
                <br/>
                Stores List:<br/>
                ------------------------------------
                <br/>
                <ul>
                    {
                        this.state.listStores.map(store => {
                            return(
                                <li>
                                    <span> {store.name}</span>
                                    <br/><br/>
                                </li>
                            )
                        })
                    }
                </ul>

                ------------------------------------
            </div>
        )

    }
}
export default StoresPage;





