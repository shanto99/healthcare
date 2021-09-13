import React from "react";
import {Button, Grid, TextField, withStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {signIn} from "../../backend/authentication";

import styles from "./style";
import {LOG_IN} from "../../actions";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          userId: '',
          password: ''
        };

        this.makeSignIn = this.makeSignIn.bind(this);
    }

    makeSignIn(e)
    {
        e.preventDefault();
        let {userId, password} = this.state;
        signIn(userId, password).then(res => {
            swal("Success", "Logged in successfully", "success");
            this.props.login();
        }).catch(err => {
           swal("Error", "Incorrent credentials", "error");
        });
    }

    render() {
        const classes = this.props.classes;
        return (
            <form method="POST" className={classes.form} onSubmit={this.makeSignIn} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    value={this.state.userId}
                    required
                    fullWidth
                    label="User id"
                    autoComplete="off"
                    autoFocus
                    onChange={(e) => this.setState({ userId: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    value={this.state.password}
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => this.setState({password: e.target.value})}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/registration" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: () =>  dispatch({ type: LOG_IN, payload: {
                user: {UserID: 24221, UserName: 'Shanto'}
            } })
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(LoginForm));
