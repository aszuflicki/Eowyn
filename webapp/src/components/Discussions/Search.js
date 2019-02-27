import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchDiscussions, getMoreOfDiscussionsList } from '../../actions/Discussions.actions'
import { CardPanel, Row, Col, Card, CardTitle, Button, Autocomplete, Tabs, Tab, Icon, Badge } from 'react-materialize'
import M from 'materialize-css';
import ta from 'time-ago'
import history from '../../routers/history';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            search: []
        };

        // Binds our scroll event handler
        window.onscroll = () => {
            const {
                state: {
                    error,
                    isLoading,
                },
            } = this;

            if (error || isLoading || !this.hasMore) return;

            if (
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
            ) {
                console.log('xD')
                this.props.getMoreOfDiscussionsList(this.state.search, this.props.list.length);
            }
        };
    }

    hasMore() { return this.props.list.length < this.props.count }

    handleTags() {
        const elem = document.querySelector('.chips');
        let search = M.Chips.getInstance(elem).chipsData.map(el => el.tag)
        if (JSON.stringify(search) !== JSON.stringify(this.state.search)) {
            this.setState({ search })
            if (search.length > 0)
                this.props.searchDiscussions(search)
        }
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
                    <Col s={2} />
                    <Col s={8}>
                        {!!this.props.list.length > 0 &&
                            <ul className="collection">
                                {this.props.list.map(el => (
                                    <li className="collection-item avatar"
                                        onClick={() => history.push(`/discussion/${el.id}`)} key={'post-' + el.id}>
                                        <img src={`/api/profile/pic/${el.author}`} alt="" className="circle" />
                                        <span className="title"><b>{el.topic}</b></span>
                                        <p><span className="truncate"
                                            style={{ width: "calc(100% - 250px)", display: "inline-block" }}>

                                            {el.desc}
                                        </span> </p>
                                        <label>{el.posts === 0 ? `Created ${ta.ago(el.createdAt)}` : `Updated ${ta.ago(el.updatedAt)}`}</label>

                                        <a href="#!" className="secondary-content">
                                            <Row>
                                                <Col><Badge> <Icon tiny >chat_bubble_outline</Icon>{el.posts}</Badge>
                                                </Col>
                                            </Row>
                                        </a>
                                    </li>))}
                            </ul>}
                        {this.props.list.length < this.props.count &&
                            <div>Loading...</div>}
                        {this.props.list.length === this.props.count && this.props.count !== 0 &&
                            <div>You did it! You reached the end!</div>}
                        {this.props.count === 0 &&
                            <div>No discussion with these tags :( </div>}
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return { ...state.discussion }
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchDiscussions: (cat) => dispatch(searchDiscussions(cat)),
        getMoreOfDiscussionsList: (...args) => dispatch(getMoreOfDiscussionsList(...args))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
