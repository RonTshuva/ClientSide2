import * as React from "react";
import axios from "axios";
import Sale from "./Sale";
import Cookies from "universal-cookie";
import Constants from "../Constants";



class Store extends React.Component {

    state = {
        saleList :[],
        store : {}, //store is: {id , area , category , name}
        response : "loading..."
    }

    componentDidMount() {
        this.setState({response : "params are : " + this.props.match.params.id})
        //const storeId = this.props.match.params.storeId;
        //this.getStoreByStoreId(1);
        //this.getSalesByStoreId(1);

        this.setState({
            storeId: this.props.match.params.storeId
        })
        const cookies = new Cookies();
        axios.get(Constants.SERVER_URL + "/get-sales-for-one-shop", {
            params: {
                token: cookies.get("myWebsiteToken"),
                storeId: this.props.match.params.storeId
            }
        })
            .then((response) => {
                if (response.data) {
                    this.setState({
                        sales: response.data
                    })
                }
            })
        this.getShops();

    }



    getStoreByStoreId = (storeId) =>{
        axios.get(Constants.SERVER_URL + "getStoreByStoreId", {
            params: {
                storeId : storeId,
            }
        })
            .then((response) => {
                if(response.data.success) {
                    this.setState({
                        store: response.data.dataSet[0],
                        response : ""
                    })
                }else{
                    this.setState({
                        response : "there was a problem getting sales from db!"
                    })
                }
            })
    }

    getSalesByStoreId = (storeId) => {
        axios.get(Constants.SERVER_URL + "getSalesByStoreId", {
            params: {
                storeId : storeId,
            }
        })
            .then((response) => {
                if(response.data.success) {
                    this.setState({
                        saleList: response.data.dataSet,
                        response : ""
                    })
                }else{
                    this.setState({
                        response : "there was a problem getting sales from db!"
                    })
                }
            })
    }


    showStore = () =>{
        return (
            <div>
                store's name: {this.state.store.name} <br/>
                store's area: {this.state.store.area} <br/>
                store's category: {this.state.store.category} <br/>
            </div>
        )
    }

    //-----------------------------------------------------------------------------//
    render() {
        return(
            <div>
                in StoreComponent
                <span style={{color : "blue"}}>{this.state.response} </span>
                <br/>
                Store Page:<br/>
                ------------------------------------
                {this.showStore()}
                --------------------
                <br/>
                <ul>
                    {
                        this.state.saleList.map(sale => {
                            return(
                                <li>
                                    <Sale data={sale}/>
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
export default Store;





