import React, {Component} from 'react';
import './randomChar.css';
import gotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../ErrorMessage";

export default class RandomChar extends Component {

    componentDidMount() {
        this.updateChar()
        this.timeIntervalId = setInterval(this.updateChar, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.timeIntervalId)
    }

    gotService = new gotService();
    state = {
        loading: true,
        error: false,
        errorMessage: null,
        char: {}
    }

    onCharLoaded = char => {
        this.setState({
            char, loading: false
        })
    }

    onError = (error) => {
        this.setState({
            error: true,
            errorMessage: error.messages,
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * 150 + 50)
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const {loading, char, error} = this.state
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? <ViewChar char={char}/> : null

        return (<div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>);
    }
}

const ViewChar = ({char}) => {
    const {name, gender, born, died, culture} = char
    return (<>
            <div className="random-char-title">
                Random Character:
                <span className="random-char-name">{name}</span>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span className="text-right">{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span className="text-right">{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>)
}
