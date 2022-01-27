import * as React from "react";
import axios from "axios";
import UsersSale from "./UsersSale";


class StoreComponent extends React.Component {

    state = {
        listSales :[],
        store : {},
        response : "loading..."
    }

    componentDidMount() {

        this.setState({response : "params are : " + this.props.match.params.id})
        //const storeId = this.props.match.params.storeId;
        //this.getStoreByStoreId(1);
        //this.getSalesByStoreId(1);
    }

    getStoreByStoreId = (storeId) =>{
        axios.get("http://localhost:8989/getStoreByStoreId", {
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
        axios.get("http://localhost:8989/getSalesByStoreId", {
            params: {
                storeId : storeId,
            }
        })
            .then((response) => {
                if(response.data.success) {
                    this.setState({
                        listSales: response.data.dataSet,
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
                        this.state.listSales.map(sale => {
                            return(
                                <li>
                                    <UsersSale data={sale}/>
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
export default StoreComponent;





