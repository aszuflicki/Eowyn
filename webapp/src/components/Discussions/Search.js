import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchDiscussions } from '../../actions/Discussions.actions'
import { CardPanel, Row, Col, Card, CardTitle, Button, Autocomplete, Tabs, Tab, Icon, Badge } from 'react-materialize'
import M from 'materialize-css';
import Badges from './Fragments/Badges.component'
import ta from 'time-ago'
import history from '../../routers/history';

class Search extends Component {
    handleTags() {
        const elem = document.querySelector('.chips');
        let search = M.Chips.getInstance(elem).chipsData.map(el => el.tag)
        if (JSON.stringify(search) !== JSON.stringify(this.state.search)) {
            this.setState({ search })
            console.log(search)
            if (search.length > 0)
                this.props.searchDiscussions(search)
        }

        console.log(search)
    }

    componentDidMount = () => {
        let elems = document.querySelectorAll('.chips');
        const instances = M.Chips.init(elems, {
            placeholder: 'Enter a keyphrase',
            secondaryPlaceholder: '+Keyphrase',
            onChipDelete: () => this.handleTags(),
            onChipAdd: () => this.handleTags(),
        });
        this.setState({
            search: []
        })

    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col s={2} />
                    <Col s={8}>
                        <h4>Search for discussion</h4>
                        <div class="chips">
                            <input id="tags" />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col s={8}>
                        <ul className="collection">
                            {/* {!!this.props.list ?
                                this.props.list.map(el => (
                                    <li className="collection-item avatar"
                                        onClick={() => history.push(`/discussion/${el.id}`)} key={'post-' + el.createdAt}>
                                        <img src={`/api/profile/pic/${el.author}`} alt="" className="circle" />
                                        <span className="title"><b>{el.topic}</b></span>
                                        <p><span className="truncate"
                                            style={{ width: "calc(100% - 250px)", display: "inline-block" }}>

                                            {el.desc}
                                        </span> </p>
                                        <label>{el.posts === 0 ? `Created ${ta.ago(el.createdAt)}` : `Updated ${ta.ago(el.updatedAt)}`}</label>

                                        <a href="#!" className="secondary-content">

                                            <Row>
                                                <Col> <Badges badge={el.category} />
                                                </Col>
                                                <Col><Badge> <Icon tiny >chat_bubble_outline</Icon>{el.posts}</Badge>
                                                </Col>
                                            </Row>
                                        </a>
                                    </li>)) : ''} */}
                        </ul>
                        {this.props.list.length < this.props.count ?
                            <div>Loading...</div>
                            : ''}
                        {this.props.list.length === this.props.count && this.props.count !== 0 ?
                            <div>You did it! You reached the end!</div>
                            : ''}
                        {this.props.count === 0 ?
                            <div>Empty so far :( </div>
                            : ''}
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.discussion }
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchDiscussions: (cat) => dispatch(searchDiscussions(cat))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
