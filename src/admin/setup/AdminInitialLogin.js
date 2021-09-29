import React, { useState } from 'react'
import axios from 'axios'
import { Container, Typography, Card, CardMedia, CardActions, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from "../../img/logo.png"
import { makeStyles } from '@mui/styles';
import { setUserToStorage } from '../../utility/functions';
import { USER_STORAGE_KEY } from '../../app_data/constants';
import { admin_login_url } from '../../app_data/admin_urls';

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "97vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    card: {
        width: "36%",
        padding: "20px",
        overflow: "auto",
        backgroundColor: "#f9f9f9",
    },
    media: {
        margin: "15px auto",
        width: 93,
        height: 50,
        position: "relative",
        zIndex: 1,
    },
    textField: {
        width: 360,
    },
});


export default function AdminInitialLogin({setSignedIn}) {
    const classes = useStyles();

    const [password, setPassword] = useState('')


    function signIn() {
        axios.post(admin_login_url, { password: password, rememberMe: true })
            .then((res) => {
                if (res.data.token !== '') {
                    const user = { token : res.data.token}
                    setUserToStorage(USER_STORAGE_KEY, user)
                    setSignedIn(true)
                }
            })
            .catch((err) => {
                console.log("Error loggin in ", err.data)
                alert('error logging in')

            })

    }

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (

        <div className={classes.root}>
            <Container spacing={1} align="center">
                <Card className={classes.card} sx={{ borderRadius: 5, boxShadow: "0 10px 25px -12px rgba(0,0,0,0.3)", }}>
                    <CardMedia className={classes.media} image={logo} title="logo" />
                    <Typography gutterBottom variant="h5" >
                        Welcome back, Admin
                    </Typography>
                    <Typography gutterBottom variant="body1" >
                        Enter your password to login
                    </Typography>
                    <TextField
                        className={classes.textField}
                        id="password-input"
                        size="small"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <CardActions sx={{ justifyContent: 'center', padding: '20px 0' }}>
                        <Button variant="contained" size="large" onClick={signIn}>Login</Button>
                    </CardActions>
                </Card>
            </Container>
        </div>
    )
}
