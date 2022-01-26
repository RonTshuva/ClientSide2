import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";


class StoresPage extends React.Component {

    state = {
        listStores :[]

    }


    componentDidMount() {
        this.getAllStores()
    }

    getAllStores = () => {
        axios.get("http://localhost:8989/get-stores", {
        })
            .then((response) => {
                if(response.data.success) {
                    this.setState({
                        listStores: response.data.dataSet
                    })
                }
            })
    }




    render() {

        return(
            <div>




            </div>
        )

    }
}
export default StoresPage;





