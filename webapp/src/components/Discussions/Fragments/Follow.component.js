import React, { Component } from 'react'
import { connect } from 'react-redux';
import { follow, unfollow } from './../../../actions/Discussions.actions'

class Follow extends Component {

    render() {
        if(this.props == null) return;
        const { follows, topic_id } = this.props

        if (follows.includes(topic_id+""))
            return (
                <div>
                    <a className="btn-small" 
                        onClick={() => this.props.unfollow(topic_id)}
                    ><i className="material-icons right">star</i>Unfollow</a>
                </div>
            ); else return (
                <div>
                    <a className="btn-small" 
                        onClick={() => this.props.follow(topic_id)}
                    ><i className="material-icons right">star_border</i>Follow</a>
                </div>
            )
    }
}

function mapStateToProps(state) {
    console.log(state.discussion)
    return {
        ...state.discussion,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        follow: (...args) => dispatch(follow(...args)),
        unfollow: (...args) => dispatch(unfollow(...args))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Follow);