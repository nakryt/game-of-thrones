import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import './app.css'
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../ErrorMessage";
import CharacterPage from "../CharacterPage";
import ItemList from "../itemList";
import gotService from "../../services/gotService";


class App extends React.Component {

    gotService = new gotService()

    state = {
        showRandomCharacter: true,
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true,
            errorInfo
        })
    }

    onToggleRandomCharHandler = () => {
        this.setState(({showRandomCharacter}) => ({
            showRandomCharacter: !showRandomCharacter
        }))
    }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        return (<>
                <Container>
                    <Header/>
                </Container>
                <Container className="container">
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <button
                                className='random-char-btn'
                                onClick={this.onToggleRandomCharHandler}
                            >Toggle random character</button>
                            {this.state.showRandomCharacter ? <RandomChar/> : null}
                        </Col>
                    </Row>
                    <CharacterPage/>

                    <Row>
                        <Col md='6'>
                            <ItemList
                                getData={this.gotService.getAllBooks}
                                renderItem={item => {
                                    return (
                                        <>
                                            <span>
                                                {`${item.name} (${item.numberOfPages} pages)`}
                                            </span>
                                            <button>Click me</button>
                                        </>
                                    )
                                }}
                            />
                        </Col>
                    </Row>

                </Container>
            </>)
    }
};

export default App;