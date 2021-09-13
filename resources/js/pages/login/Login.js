import React from "react";
import {Avatar, CssBaseline, Typography, Box, Container, withStyles} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import LoginForm from "../../components/loginForm/LoginForm";
import Copyright from "../../components/copyRight/CopyRight";

import style from "./style";

class Login extends React.Component {
    render() {
        const classes = this.props.classes;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <LoginForm/>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}


export default withStyles(style)(Login);
