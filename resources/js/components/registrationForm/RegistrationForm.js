import React from "react";
import {Button, Grid, TextField, withStyles} from "@material-ui/core";
import {Link} from "react-router-dom";

import swal from "sweetalert";

import {createUser} from "../../backend/authentication";

import style from "../loginForm/style";

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            userName: '',
            phone: '',
            password: ''
        };

        this.createUser = this.createUser.bind(this);
    }

    createUser(e) {
        e.preventDefault();
        let { userId, userName, phone, password } = this.state;
        createUser(userId, userName, phone, password).then(res => {
           swal("Success", "User created successfully", "success");
        }).catch(err => {
            swal("Error", "Could not create user", "error");
        });
    }

    render() {
        const classes = this.props.classes;
        return (
            <form method="POST" className={classes.form} onSubmit={this.createUser} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    value={this.state.userId}
                    required
                    fullWidth
                    label="User id"
                    name="UserID"
                    autoComplete="off"
                    autoFocus
                    onChange={(e) => this.setState({ userId: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    value={this.state.userName}
                    required
                    fullWidth
                    label="User name"
                    name="UserName"
                    autoComplete="off"
                    autoFocus
                    onChange={(e) => this.setState({ userName: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    value={this.state.phone}
                    required
                    fullWidth
                    label="Phone"
                    name="Phone"
                    autoComplete="off"
                    autoFocus
                    onChange={(e) => this.setState({ phone: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    value={this.state.password}
                    required
                    fullWidth
                    name="Password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Grid container>
                    <Grid item>
                        <Link to="/" variant="body2">
                            {"Have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        );
    }

}

export default withStyles(style)(RegistrationForm);
