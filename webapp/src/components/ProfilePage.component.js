import React, { Component, Fragment } from 'react';
import Navbar from './Navbar.component'
import { Row, Input, Button, Col } from 'react-materialize'
import axios from 'axios'
import { connect } from 'react-redux'

class ProfilePage extends Component {

    componentWillMount = () => {
        this.setState({
            selectedFile:  null,
            picId: 0
        })
    }

    handleselectedFile(event) {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
            
        })
    }

    handleUpload = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)

        axios
            .post('http://localhost:8081/upload', data, { headers: { "authorization": localStorage.getItem('token') } }
            )
            .then(res => {
                console.log(res.statusText)
                setTimeout(() => this.setState({ picId: new Date() + "" }), 2000)
            })
    }

    handleDelete() {
        axios
            .delete('http://localhost:8081/upload', { headers: { "authorization": localStorage.getItem('token') } }
            )
            .then(res => {
                console.log(res.statusText)
                setTimeout(() => this.setState({ picId: new Date() + "" }), 2000)
            })
    }

    render() {

        return (
            <Fragment>
                <Row />
                <Row />
                <Row>
                    <Col s={3} />
                    <Col s={6}>
                        <Row>
                            <h5>Current profile avatar</h5>
                            <Row>
                                <Col s={3} />
                                <Col >
                                    <img key={'pic-' + this.state.picId} src={`http://localhost:8081/profile/pic/${this.props.email}?hash=${this.state.picId}`} alt="" className="circle"
                                        style={{ width: '300px', height: "300px", top: "15px", marginLeft: "auto", marginRight: "auto" }} />
                                </Col>
                                <Col s={3} />

                            </Row>

                            <Button className="btn-large right red"
                                onClick={() => this.handleDelete()}
                            >Remove</Button>
                        </Row>
                        <Row>
                            <h5>Replace profile avatar</h5>
                            <Input type="file" label="File" s={9}
                                onChange={this.handleselectedFile.bind(this)}
                            />
                            <Button className="btn-large"
                                onClick={() => this.handleUpload()}
                            >Upload</Button>
                        </Row>
                    </Col>
                </Row>

            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.auth }
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);