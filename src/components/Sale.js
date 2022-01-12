function Sale(props) {

    return (
        <div>
            Description: {props.object.description}<br/>
            Expiration date: {props.object.expirationDate}<br/>
            Store name: {props.object.store.name}<br/>
            Area: {props.object.store.area}<br/>
        </div>
    )
}

export default Sale;
