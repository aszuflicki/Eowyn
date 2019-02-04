import React, { Component, Fragment } from 'react';
import Navbar from './Navbar.component'
import { Row, Input, Button } from 'react-materialize'
import axios from 'axios'

class ProfilePage extends Component {

    // componentWillMount = () => {
    //     this.setState({
    //         selectedFile:  null,
    //         loaded: 0,
    //     })
    // }

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
            .post('http://localhost:8081/upload', data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                },
            })
            .then(res => {
                console.log(res.statusText)
            })

    }

    render() {
        console.log(this.state)

        return (
            <Fragment>
                <Row />
                <Row />
                <div className='container'>
                    <h5>Profile</h5>

                    <Row>
                        <Input type="file" label="File" s={9}
                            onChange={this.handleselectedFile.bind(this)}
                        />
                        <Button className="btn-large"
                            onClick={() => this.handleUpload()}
                        >Upload</Button>
                        
                    </Row>
                    <input type="file" name="" id="" />
                </div>
            </Fragment>
        )
    }
}

export default ProfilePage