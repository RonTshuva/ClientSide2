function Sale(props) {

    return (
        <div className={"sale"} style={props.style}>
            Description: {props.object.description}<br/>
            Store name: {props.object.store.name}<br/>
            Expiration date: {props.object.expirationDate}<br/>
            Area: {props.object.store.area}<br/>
        </div>
    )
}

export default Sale;
