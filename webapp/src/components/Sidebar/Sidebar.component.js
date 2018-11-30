import React, { Component } from 'react'
import { connect } from 'react-redux'
import './sidebar.css'

class Sidebar extends Component {
    render() {
        let drawerClasses = 'drawer';
        if (this.props.show) {
            drawerClasses = 'drawer open';
        }

        return (
            <div className={drawerClasses}>
                <div className={"drawer__handle open"}
                    onClick={this.props.handleClick}
                >
                    open
                </div>
                <div>
                    <ul>
                        <li>Option 1</li>
                        <li>Option 2</li>
                        <li>Option 3</li>
                        <li>Option 4</li>
                        <li>Option 5</li>
                    </ul>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
