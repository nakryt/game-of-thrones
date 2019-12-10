import React, {Component} from 'react';
import './itemList.css';
import Spinner from "../spinner";
export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({error, errorInfo})
    }

    componentDidMount() {
        const {getData} = this.props
        getData()
            .then(itemList => {
                this.setState({itemList})
            })
    }

    renderItems = charArr => {
        return charArr.map(item => {
            const {id} = item
            const label = this.props.renderItem(item)
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => {this.props.onItemSelected(id)}}
                >
                    {label}
                </li>
            )
        })
    }

    render() {

        const {itemList} = this.state
        const content = itemList ? this.renderItems(itemList) : <Spinner/>

        return (
            <ul className="item-list list-group">
                {content}
            </ul>

        );
    }
}

