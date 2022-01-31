import './Sale.css';

function Sale(props) {

    return (
        <div  style={{
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "#F3EBF6",
            boxShadow: "6px 8px 6px grey",
            height: "auto",
            margin: "5px",
            border: "1px solid #ccc",
            float: "left",
            width: "180px"

        }}>
            <h3 style={{ fontSize: "20px"}}>
                Description: {props.object.description}<br/>
            </h3>
            <h4 style={{color: "black", fontSize: "12px"}}>
                Store name: {props.object.store.name}<br/>
            </h4>
            <p style={{
                backgroundColor: "blue",
                borderRadius: "10px",
                color: "white",
                fontWeight: "bold",
                fontSize: "10px"
            }}> Expiration date: {props.object.expirationDate} </p>
            <h4 style={{color : "black"}}>
                Area: {props.object.store.area}<br/>
            </h4>
        </div>
    )
}

export default Sale;
