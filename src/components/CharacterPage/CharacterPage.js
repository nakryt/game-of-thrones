import React, {Component} from 'react'
import './CharacterPage.css'
import ItemList from "../itemList";
import CharDetails, {Field} from "../charDetails";
import ErrorMessage from "../ErrorMessage";
import gotService from "../../services/gotService";
import RowBlock from "../RowBlock";

class CharacterPage extends Component {

    gotService = new gotService()
    state = {
        selectedItem: 130,
        error: false

    }

    componentDidCatch(error, errorInfo) {
        this.setState({error, errorInfo})
    }

    onItemSelected = id => {
        this.setState({
            selectedItem: id
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={item => `${item.name} (${item.gender})`}
            />
        )
        const itemDetail = (
            <CharDetails itemId={this.state.selectedItem}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </CharDetails>
        )
        return (
            <RowBlock left={itemList} right={itemDetail}/>
        )
    }
}

export default CharacterPage