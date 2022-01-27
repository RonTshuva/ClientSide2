import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import UsersSale from "../components/Sale";
import Constants from "../Constants";

class Dashboard extends React.Component{

    state = {
        response : "loading...",
        sales : []
    }


    componentDidMount(){
        const cookies = new Cookies();
        cookies.set("logged_in",'AAA'); // just for testing
        this.getSales();
    }

    //cookies.get("logged_in")
    getSales = () => {
        const cookies = new Cookies();
        axios.get(Constants.SERVER_URL + "get-sales",{
            params:{
                token : cookies.get("logged_in")
            }
        }).then((response) =>{
            if(response.data.success) {
                this.setState({
                    response : response.data.dataSet.length > 0 ? "successfully loaded sales" : "no sales found!",
                    sales : response.data.dataSet
                })
            }
        })
    }

    render() {
        const salesFiltered = this.state.sales.filter(sale => {
            return sale.belongsToUser
        })
        const salesMapped = salesFiltered.map(sale =>{
            return(
                <div>
                    --------------------------------
                   <UsersSale object={sale.object}/>
                    --------------------------------
                </div>
            )
        })

        return(
            <div>
                DashBoard:
                {salesMapped.length > 0 && salesMapped}
            </div>
        )
    }
}
export default Dashboard;
