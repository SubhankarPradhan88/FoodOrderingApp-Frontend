import React from 'react';
import Input from '@material-ui/core/Input';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import './Header.css';

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

const TabContainer = (props) => {
    return (
        <Typography component="div" style={{padding: 0, textAlign: 'center'}}>
            {props.children}
        </Typography>
    )
}

// Custom styles - Material Card component
const customStyles = makeStyles((theme) => ({
    contactFieldStyle: {
        marginTop: 10,
        width: 250
    },
    inputCustomWidth: {
        width: 250
    }
}));

export const RegistrationModal = (props) => {
    const classes = customStyles();
    let { value, loginContactNo, password, firstname, lastname, email, registerPassword, contactNo, signUpFailedMessage,
        emailError, passwordError, contactNoError, loginContactNoRequired, userPasswordRequired, firstnameRequired, 
        lastnameRequired, emailRequired, registerFormPasswordRequired, contactNoRequired, loginFailedMessage } = props.fieldStateValue;
    
    let { modalIsOpen, closeModalHandler, tabChangeHandler, handleChange, registerClickHandler, loginClickHandler } = props.formHandler;

    return (
        <Modal 
            ariaHideApp={false} 
            onRequestClose={closeModalHandler} 
            isOpen={modalIsOpen} 
            contentLabel="Login"
            style={modalStyles}
        >
        <Tabs className="tabs" value={value} onChange={tabChangeHandler}>
            <Tab label="Login"/>
            <Tab label="Register"/>
        </Tabs>
        {!value ?
            <TabContainer>
                <FormControl required className={classes.contactFieldStyle}>
                    <InputLabel htmlFor="loginContactNo">Contact No </InputLabel>
                    <Input id="loginContactNo" type="text" onChange={(e) => handleChange(e, 'loginContactNo')} value={loginContactNo} />
                    <FormHelperText className={loginContactNoRequired}><span className="red">required</span></FormHelperText>
                </FormControl>
                <p></p>
                <FormControl required className={classes.inputCustomWidth}>
                    <InputLabel htmlFor="password">Password </InputLabel>
                    <Input id="password" type="password" onChange={(e) => handleChange(e, 'password')} value={password} />
                    <FormHelperText className={userPasswordRequired}><span className="red">required</span></FormHelperText>
                </FormControl>
                {!loginFailedMessage ? <p></p> :
                <p className="red errorMsgStyle">{loginFailedMessage}</p>}
                <Button variant="contained" color="primary" onClick={loginClickHandler}>
                    LOGIN
                </Button>
            </TabContainer> : 
            <TabContainer>
                <FormControl required className={classes.inputCustomWidth}>
                    <InputLabel htmlFor="firstname">First Name </InputLabel>
                    <Input id="firstname" type="text" onChange={(e) => handleChange(e, 'firstname')} value={firstname} />
                    <FormHelperText className={firstnameRequired}><span className="red">required</span></FormHelperText>
                </FormControl>
                <p></p>
                <FormControl required className={classes.inputCustomWidth}>
                    <InputLabel htmlFor="lastname">Last Name </InputLabel>
                    <Input id="lastname" type="text" onChange={(e) => handleChange(e, 'lastname')} value={lastname} />
                    <FormHelperText className={lastnameRequired}><span className="red">required</span></FormHelperText>
                </FormControl>
                <p></p>
                <FormControl required className={classes.inputCustomWidth}>
                    <InputLabel htmlFor="email">Email </InputLabel>
                    <Input id="email" type="email" onChange={(e) => handleChange(e, 'email')} value={email} />
                    <FormHelperText className={emailRequired}><span className="red">{emailError}</span></FormHelperText>
                </FormControl>
                <p></p>
                <FormControl required className={classes.inputCustomWidth}>
                    <InputLabel htmlFor="registerPassword">Password </InputLabel>
                    <Input id="registerPassword" type="password" onChange={(e) => handleChange(e, 'registerPassword')} value={registerPassword} />
                    <FormHelperText className={registerFormPasswordRequired}><span className="red">{passwordError}</span></FormHelperText>
                </FormControl>
                <p></p>
                <FormControl required className={classes.inputCustomWidth}>
                    <InputLabel htmlFor="contactNo">Contact No. </InputLabel>
                    <Input id="contactNo" type="number" onChange={(e) => handleChange(e, 'contactNo')} value={contactNo} />
                    <FormHelperText className={contactNoRequired}><span className="red">{contactNoError}</span></FormHelperText>
                </FormControl>
                {!signUpFailedMessage ? <p></p> :
                <p className="red errorMsgStyle">{signUpFailedMessage}</p>}
                <Button variant="contained" color="primary" onClick={registerClickHandler}>
                    REGISTER
                </Button>
            </TabContainer>
        }
        </Modal>
    )
}