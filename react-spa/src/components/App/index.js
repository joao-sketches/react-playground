import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import logo from './logo.svg';
import './App.css';
import SignIn from '../SignIn';

class App extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string
    }

    render() {
        const {_dispatch, isAuthenticated, errorMessage} = this.props
        return (
            <div className="App">
                <AppBar title="Welcome to React"/>
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </div>
                <p className="App-intro">
                    {isAuthenticated
                        ? "Olá Pessoa"
                        : "????"}
                </p>
              <SignIn/>
            </div>
        );
    }
}

function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated, errorMessage } = auth
  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App);
