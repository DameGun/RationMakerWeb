import React from "react";
import ModalWrapper from "./modals/ModalWrapper";

class CreateUpdateActions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            gramms: '',
            protein: '',
            fats: '',
            carbs: '',
            calories: '',
            categoryId: '',
            actionType: this.props.actionType,
            actionStatus: false
        }
        
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    initializeBuffVariables() {
        this.setState({id: this.props.product.id});
        this.setState({id: this.props.product.name});
        this.setState({id: this.props.product.gramms});
        this.setState({id: this.props.product.protein});
        this.setState({id: this.props.product.fats});
        this.setState({id: this.props.product.carbs});
        this.setState({id: this.props.product.calories});
        this.setState({id: this.props.product.categoryId});
    }

    // create entity
    create(e) {
        e.preventDefault();
        fetch('product', {
            "method": "POST",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify({
                name: this.state.name,
                gramms: this.state.gramms,
                protein: this.state.protein,
                fats: this.state.fats,
                carbs: this.state.carbs,
                calories: this.state.calories,
                categoryId: this.state.categoryId
            })
        })
            .then((response) => response.ok)
            .then((response) => {
                response
                    ? this.setState({actionStatus: true})
                    : console.log("Something happened!!!")
            })
            .catch(err => console.log(err));
        return this.state.actionStatus;
    }
    
    // update entity
    update(e) {
        this.initializeBuffVariables();
        e.preventDefault();
        fetch(`product/update/${this.props.product.id}`, {
            "method": "PUT",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify({
                name: this.state.name,
                gramms: this.state.gramms,
                protein: this.state.protein,
                fats: this.state.fats,
                carbs: this.state.carbs,
                calories: this.state.calories,
                categoryId: this.state.categoryId
            })
        })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.log(err));
    }
    
    handleChange(changeObject) {
        this.setState(changeObject);
    }
    
    render() {
        return (
            <ModalWrapper 
                handleChange={this.handleChange} 
                categories={this.props.categories}
                action={this.state.actionType === "create" ? this.create : this.update}
                state={this.state} 
                actionStatus={this.state.actionStatus}
                actionType={this.state.actionType}
                product={this.props.product}
            />
        )
    }
}

export default CreateUpdateActions;