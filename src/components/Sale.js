import './Sale.css';

function Sale(props) {

    return (
        <div className={"sale"} style={{
            margin: "20px",
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "#F3EBF6",
            boxShadow: "8px 8px 8px grey",
            width: "auto",
            height: "auto"
        }}>
            <h3 style={{color: "#096c30", fontSize: "30px"}}>
                Description: {props.object.description}<br/>
            </h3>
            <h4 style={{color: "black", fontSize: "20px"}}>
                Store name: {props.object.store.name}<br/>
            </h4>
            <p style={{
                backgroundColor: "red",
                borderRadius: "10px",
                color: "white",
                fontWeight: "bold",
                fontSize: "10px"
            }}> Expiration date: {props.object.expirationDate} </p>
            <h4>
                Area: {props.object.store.area}<br/>
            </h4>
        </div>
    )
}

export default Sale;
