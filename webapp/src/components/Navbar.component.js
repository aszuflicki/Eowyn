import React, { Component } from 'react'
import { connect } from 'react-redux'

class Navbar extends Component {
    render() {

        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <a class="navbar-brand" href="/">Eowyn</a>
                        <li class="nav-item">
                            <a class="nav-link" href="/">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            {/* <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
        </a> */}
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="/">Action</a>
                                <a class="dropdown-item" href="/">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="/">Something else here</a>
                            </div>
                        </li>


                    </ul>


                </div>
            </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
