import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {signIn} from '../../actions';
import RaisedButton from 'material-ui/RaisedButton';

class SignIn extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string
    }

    render() {

        const style = {
            margin: 12
        };

        const {dispatch, errorMessage, isAuthenticated} = this.props;

        return (
            <div>

                {isAuthenticated
                    ? <p>You are authenticated!</p>
                    : <RaisedButton onClick={() => dispatch(signIn({username: "joao", password: "foobar"}))} label="Cick Me to Dispatch!!" style={style}/>}
                  <p>{errorMessage} | {isAuthenticated}</p>
            </div>
        )
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

export default connect(mapStateToProps)(SignIn);
