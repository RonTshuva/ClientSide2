import * as React from "react";


class Dashboard extends React.Component{

    state = {

    }

    render() {
        const salesFiltered = this.state.sales.filter(sale => {
            return sale.belongsToUser
        })
        const salesMapped = salesFiltered.map(sale =>{
            return(
                <div>
                    sale description : {sale.object.description}
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
