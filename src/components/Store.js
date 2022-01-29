import React from "react";
import axios from "axios";
import Sale from "./Sale";
import Constants from "../Constants";
const serverPath = "http://localhost:8989";
const emptyArray = 0;

// Need to FIX - can't take the data from the server Response!!!!
// Need to FIX - can't take the data from the server Response!!!!
// Need to FIX - can't take the data from the server Response!!!!

class Store extends React.Component {
    state = {
        id: "", // Un-used
        store : {}, //store is: {id , area , category , name}
        sales: [],
        response : "loading..."
    }

    componentDidMount() {
        const passed = this.props.match.params.id;
        this.setState({id: passed})
        this.getStoreByStoreId(this.state.id);
        this.getSalesByStoreId(this.state.id);
    }

// Get the store details - Returns an Object inside an array so it's in the first place
    getStoreByStoreId = (storeId) =>{
        axios.get(Constants.SERVER_URL + "getStoreByStoreId", {
            params: {
                storeId : this.state.id,
            }
        })
            .then((response) => {
                if(response.data.success) {
                    this.setState({
                        //May be response.data.dataset[0] to get object
                        store: response.data.dataset[0],
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
                storeId : this.state.id,
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
                    Sales are:
                    <br/>
                    {
                        this.state.sales.length === emptyArray ?
                            <div>There are no sales to this shop (Empty array from getSalesByStoreId) </div>
                            :
                            this.state.sales.map((sale) => {
                                return <Sale sale={sale}/>
                            })
                    }
                </div>
            </div>
        )
    }
}

export default Store;


