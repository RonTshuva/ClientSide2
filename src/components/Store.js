import React from "react";
import axios from "axios";
import Sale from "./Sale";
import Constants from "../Constants";

// Need to FIX - can't take the data from the server Response!!!!
// Need to FIX - can't take the data from the server Response!!!!
// Need to FIX - can't take the data from the server Response!!!!

class Store extends React.Component {
    state = {
        id: "", // Un-used
        store : {
            name : "loading...",
            area : "loading..."
        }, //store is: {id , area , category , name}
        sales: [],
        response : "loading..."
    }

    componentDidMount() {
        const storeId = this.props.match.params.id;
        this.getStoreByStoreId(storeId);
        this.getSalesByStoreId(storeId);
        this.setState({id: storeId})
    }

// Get the store details - Returns an Object inside an array so it's in the first place
    getStoreByStoreId = (storeId) =>{
        axios.get(Constants.SERVER_URL + "getStoreByStoreId", {
            params: {
                storeId : storeId,
            }
        })
            .then((response) => {
                if(response.data.success) {
                    this.setState({
                        //May be response.data.dataset[0] to get object
                        store: response.data.dataSet[Constants.FIRST_OBJECT],
                        response : ""
                    })
                }else{
                    this.setState({
                        response : "there was a problem getting sales from db in getStoreByStoreId"
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
                        sales: response.data.dataSet,
                        response : ""
                    })
                }else{
                    this.setState({
                        response : "there was a problem getting sales from db! in getSalesByStoreId"
                    })
                }
            })
    }


    render() {
        return (
            <div>
                <header>Sales For Shop number {this.state.id} </header>
                <div className={"SalesContainer"}>
                    <br/>
                    Store's name: {this.state.store.name} <br/>
                    Store's area: {this.state.store.area} <br/>
                    <br/>
                    <b>Sales are:</b>
                    <br/><br/>
                    {
                        this.state.sales.length > 0 ?
                            this.state.sales.map((sale) => {
                                return (
                                    <div>
                                        <Sale object={sale}/>
                                        <br/>
                                    </div>
                                )
                            })
                            :
                            <div>There are no sales to this shop </div>

                    }
                </div>
            </div>
        )
    }
}

export default Store;


