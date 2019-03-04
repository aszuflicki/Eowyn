import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Col } from 'react-materialize'
import axios from 'axios'
import { connect } from 'react-redux'
import { toast } from "react-toastify";

class ProfilePage extends Component {

    componentWillMount = () => {
        this.setState({
            selectedFile: null,
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
        if (!this.state.selectedFile) {
            toast.error('Add photo file')
            return 
        }
        const data = new FormData()
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)
        toast.info('Sending...')
        axios
            .post('http://localhost:8081/upload', data, { headers: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                console.log(res.statusText)
                toast.success('Uploaded successfully')
                setTimeout(() => this.setState({ picId: new Date() + "" }), 2000)
            })
            .catch((err) => {
                toast.error('Wrong file format')
            })
    }

    handleDelete() {
        axios
            .delete('/upload', { headers: { "authorization": localStorage.getItem('token') } }
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
                    <Col s={4} />
                    <Col s={4}>
                        <Row>
                            <h5>Current profile avatar</h5>
                            <Row>
                                <Col s={3} />
                                <Col >
                                    <Row>
                                        <img key={'pic-' + this.state.picId} src={`http://localhost:8081/profile/pic/${this.props.email}?hash=${this.state.picId}`} alt="" className="circle"
                                            style={{ width: '300px', height: "300px", top: "15px", marginLeft: "auto", marginRight: "auto" }} />
                                    </Row>
                                </Col>
                                <Col s={4} />
                            </Row>
                            <Row><Col s={9} /> <Button className="btn-large red"
                                onClick={() => this.handleDelete()}
                            >Remove</Button></Row>
                        </Row>
                        <Row>
                            <h5>Replace profile avatar</h5>
                            <Input type="file" label="File" s={9}
                                onChange={this.handleselectedFile.bind(this)} />
                            <Button className="btn-large"
                                onClick={() => this.handleUpload()}>Upload</Button>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);