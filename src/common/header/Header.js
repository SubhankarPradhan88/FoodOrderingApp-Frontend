import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './Header.css';
import { RegistrationModal } from './RegistrationModal';

// Custom styles - Material Card component
const customStyles = (theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      width: 300,
      height: 35,
    },
    logo: {
        width: 30,
        height: 30,
    },
    logoPointer: {
        width: 30,
        height: 30,
        cursor: 'pointer'
    },
    iconButton: {
      padding: '2px 0 0 10px'
    },
    headerAvatar: {
        marginLeft: 10,
        cursor: 'pointer'
    },
    selectDropDown: {
        width: 100,
        background: '#e7e7e7',
        position: 'absolute',
        margin: '5px 0 0 -75px',
        color: '#000000',
        borderRadius: 4,
        padding: '0 10px 0px 10px',
    }
});

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropDown: false,
            modalIsOpen: false,
            value: 0,
            loginContactNo: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            registerPassword: '',
            contactNo: '',
            emailError: 'required',
            passwordError: 'required',
            contactNoError: 'required',
            loginContactNoRequired: "dispNone",
            userPasswordRequired: "dispNone",
            firstnameRequired: "dispNone",
            lastnameRequired: "dispNone",
            emailRequired: "dispNone",
            registerFormPasswordRequired: "dispNone",
            contactNoRequired: "dispNone",
            signUpSuccessResponse: {},
            loginSuccessResponse: {},
            loggedInSuccess: false,
            menuIsOpen: false,
            loggedInCutomerFirstName: sessionStorage.getItem('firstName')
        }
    }

    // Call back to search function in the parent component
    onSearchEvent = (e) => {
        let { value } = e.target;
        this.props.searchHandler(value);
    }
    
    routeHandler = (e) => {
        // Remove all saved data from sessionStorage
        sessionStorage.clear();
        // Route back to Login screen
        this.props.history.push("/");
        this.setState({ loggedInSuccess: false });
    }
    redirectHomeHandler = (e) => {
        this.props.history.push("/");
    }
    loginModalHandler = () => {
        this.setState({
            value: 0,
            modalIsOpen: true
        });
    }
    // Open menu drop down
    openMenuHandler = (event) => {
        this.setState({
            menuIsOpen: true,
            anchorEl: event.currentTarget
        });
    }
    // Close menu drop down
    closeMenuHandler = () => {
        this.setState({  menuIsOpen: false });
    }
    closeModalHandler = () => {
        this.setState({
            loginContactNo: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            registerPassword: '',
            contactNo: '',
            modalIsOpen: false,
            emailError: '',
            passwordError: '',
            contactNoError: '',
            loginContactNoRequired: "dispNone",
            userPasswordRequired: "dispNone",
            firstnameRequired: "dispNone",
            lastnameRequired: "dispNone",
            emailRequired: "dispNone",
            registerFormPasswordRequired: "dispNone",
            contactNoRequired: "dispNone"
        });
    }

    tabChangeHandler = (event, value) => {
        console.log('aa', value);
        this.setState({value});
    }

    handleChange = (e, check) => {
        switch(check) {
            case 'loginContactNo':
                this.setState({loginContactNo: e.target.value.trim()});
                break;
            case 'password':
                this.setState({password: e.target.value.trim()});
                break;
            case 'firstname':
                this.setState({firstname: e.target.value.trim()});
                break;
            case 'lastname':
                this.setState({lastname: e.target.value.trim()});
                break;
            case 'email':
                this.setState({email: e.target.value.trim()});
                break;
            case 'registerPassword':
                this.setState({registerPassword: e.target.value.trim()});
                break;
            case 'contactNo':
                this.setState({contactNo: e.target.value.trim()});
        }
    }
    loginClickHandler = () => {
        let loginCredentialSuccess = false;
        if(!this.state.loginContactNo) {
            this.setState({loginContactNoRequired: 'dispBlock'});
            loginCredentialSuccess = false;
        }else {
            this.setState({loginContactNoRequired: 'dispNone'});
            loginCredentialSuccess = true;
        }
        if(!this.state.password) {
            this.setState({userPasswordRequired: 'dispBlock'});
            loginCredentialSuccess = false;
        }else {
            this.setState({userPasswordRequired: 'dispNone'});
            loginCredentialSuccess = true;
        }
        if(loginCredentialSuccess) {
            let loginAuthorization = window.btoa(this.state.loginContactNo + ":" + this.state.password);

            // Fetch Restaurant Details
            let fetchMediaInfoEndPoint = `${this.props.baseUrl}customer/login`;
            let loginRequestBody = null;
            let xhrInfo = new XMLHttpRequest();
            let that = this;
            xhrInfo.addEventListener('readystatechange', function() {
                if(this.readyState === 4  && this.status == 200) {
                    let parsedData = JSON.parse(this.responseText);
                    sessionStorage.setItem('uuid', parsedData.id);
                    sessionStorage.setItem('access-token', xhrInfo.getResponseHeader('access-token'));
                    sessionStorage.setItem('firstName', parsedData.first_name);
                    that.setState({ 
                        loginSuccessResponse: parsedData,
                        modalIsOpen: false,
                        menuIsOpen: false,
                        loginContactNo: '',
                        password: '',
                        loggedInSuccess: true,
                        loggedInCutomerFirstName: sessionStorage.getItem('firstName')
                    });
                }
            })
            xhrInfo.open("POST", fetchMediaInfoEndPoint);
            xhrInfo.setRequestHeader("authorization", "Basic " + loginAuthorization);
            xhrInfo.setRequestHeader("Cache-Control", "no-cache");
            xhrInfo.setRequestHeader("Content-Type", "application/json");
            xhrInfo.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhrInfo.send(loginRequestBody);
        }
    }
    registerClickHandler = () => {
        let validationSuccess = false;
        if(!this.state.firstname) {
            this.setState({firstnameRequired: 'dispBlock'});
            validationSuccess = false;
        }else {
            this.setState({firstnameRequired: 'dispNone'});
            validationSuccess = true;
        }
        if(!this.state.lastname) {
            this.setState({lastnameRequired: 'dispBlock'});
            validationSuccess = false;
        }else {
            this.setState({lastnameRequired: 'dispNone'});
            validationSuccess = true;
        }
        if(!this.state.email) {
            this.setState({
                emailError: 'required',
                emailRequired: 'dispBlock'
            });
            validationSuccess = false;
        }else {
            if(!this.validateEmail(this.state.email)) {
                this.setState({
                    emailError: 'Invalid Email',
                    emailRequired: 'dispBlock'
                });
                validationSuccess = false;
            }else {
                this.setState({emailRequired: 'dispNone'});
                validationSuccess = true;
            }
        }
        if(!this.state.registerPassword) {
            this.setState({
                passwordError: 'required',
                registerFormPasswordRequired: 'dispBlock'
            });
            validationSuccess = false;
        }else {
            if(!this.validatePassword(this.state.registerPassword)) {
                this.setState({
                    passwordError: 'Password must contain at least one capital letter, one small letter, one number, and one special character',
                    registerFormPasswordRequired: 'dispBlock'
                });
                validationSuccess = false;
            }else {
                this.setState({registerFormPasswordRequired: 'dispNone'});
                validationSuccess = true;
            }
        }
        if(!this.state.contactNo) {
            this.setState({
                contactNoError: 'required',
                contactNoRequired: 'dispBlock'
            });
            validationSuccess = false;
        }else {
            if(!this.validateContactNo(this.state.contactNo)) {
                this.setState({
                    contactNoError: 'Contact No. must contain only numbers and must be 10 digits long',
                    contactNoRequired: 'dispBlock'
                });
                validationSuccess = false;
            }else {
                this.setState({contactNoRequired: 'dispNone'});
                validationSuccess = true;
            }
        }
        validationSuccess && this.customerRegistrationHandler();
    }
    customerRegistrationHandler = () => {
        let signUpObj = {};
        signUpObj.contact_number = this.state.contactNo;
        signUpObj.email_address = this.state.email;
        signUpObj.first_name = this.state.firstname;
        signUpObj.last_name = this.state.lastname;
        signUpObj.password = this.state.registerPassword;

        // Fetch Restaurant Details
        let fetchMediaInfoEndPoint = `${this.props.baseUrl}customer/signup`;
        let signUpRequestBody = JSON.stringify(signUpObj);
        let xhrInfo = new XMLHttpRequest();
        let that = this;
        xhrInfo.addEventListener('readystatechange', function() {
            if(this.readyState === 4  && this.status == 201) {
                let parsedData = JSON.parse(this.responseText);
                that.setState({ 
                    signUpSuccessResponse: parsedData,
                    value: 0,
                    firstname: '',
                    lastname: '',
                    email: '',
                    registerPassword: '',
                    contactNo: '',
                    emailError: '',
                    passwordError: '',
                    contactNoError: ''
                });
            }
        })
        xhrInfo.open("POST", fetchMediaInfoEndPoint);
        xhrInfo.setRequestHeader("Cache-Control", "no-cache");
        xhrInfo.setRequestHeader("Content-Type", "application/json");
        xhrInfo.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhrInfo.send(signUpRequestBody);
    }
    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    validatePassword = (password) => {
        const re = /^(?=.*[\w])(?=.*[\W])[\w\W]{4,}$/;
        return re.test(String(password).toLowerCase());
    }
    validateContactNo = (congtactNo) => {
        const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        return re.test(String(congtactNo).toLowerCase());
    }

    render() {
        const { classes, displayItems } = this.props;
        let { value, loginContactNo, password, firstname, lastname, email, registerPassword, contactNo, 
            loggedInCutomerFirstName, emailError, passwordError, contactNoError, loginContactNoRequired, 
            userPasswordRequired, firstnameRequired, modalIsOpen, menuIsOpen, anchorEl, lastnameRequired, 
            emailRequired, registerFormPasswordRequired, contactNoRequired, loggedInSuccess } = this.state;

        let accessToken = sessionStorage.getItem('access-token');

        return (
            <React.Fragment>
                <header className="header-container">
                    <div className="logo-wrapper" onClick={displayItems['displaySearchBar'] ? this.redirectHomeHandler.bind(this) : null}>
                        <FastfoodIcon className={ !displayItems['displaySearchBar'] ? classes.logoPointer : classes.logo } />
                    </div>
                    {displayItems['displaySearchBar'] && <div className="search-wrapper">
                        <div className="search-container">
                            {displayItems['displaySearchBar'] && <div className="header-search-container">
                                <div className="search-icon">
                                    <SearchIcon style={{ color: "#FFFFFF" }} />
                                </div>
                                <Input
                                    name="searchByRestaurant"
                                    onChange={(e) => this.onSearchEvent(e)}
                                    className="searchInput"
                                    inputProps={{'aria-label': 'search'}}
                                    placeholder="Search by Restaurant Name"
                                />
                            </div>}
                        </div>
                    </div>}
                    {(!loggedInSuccess && !accessToken) ? <div className="registration-wrapper">
                        <Button variant="contained" color="default" onClick={this.loginModalHandler}>
                            <AccountCircleIcon/> <span className="loginBtn-text-align">LOGIN</span>
                        </Button>
                    </div> :
                    <div className="registration-wrapper">
                        <Button variant="contained" color="default" onClick={(e) => this.openMenuHandler(e)} aria-controls="simple-menu" aria-haspopup="true">
                            <AccountCircleIcon/> <span className="loginBtn-text-align">{loggedInCutomerFirstName}</span>
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={menuIsOpen}
                            onClose={this.closeMenuHandler}
                            className='menuDropDown'
                        >   
                            <MenuItem>My Profile</MenuItem>
                            <MenuItem onClick={(e) => this.routeHandler(e)}>Logout</MenuItem>
                        </Menu>
                    </div>}
                </header>
                <RegistrationModal 
                    formHandler={{
                        modalIsOpen,
                        closeModalHandler: this.closeModalHandler,
                        tabChangeHandler: this.tabChangeHandler,
                        handleChange: this.handleChange,
                        registerClickHandler: this.registerClickHandler,
                        loginClickHandler: this.loginClickHandler
                    }}
                    fieldStateValue={{
                        value,
                        loginContactNo,
                        password,
                        firstname,
                        lastname,
                        email,
                        registerPassword,
                        contactNo,
                        emailError,
                        passwordError,
                        contactNoError,
                        loginContactNoRequired,
                        userPasswordRequired,
                        firstnameRequired,
                        lastnameRequired,
                        emailRequired,
                        registerFormPasswordRequired,
                        contactNoRequired
                    }}
                />
            </React.Fragment>
        )
    }
}

export default withStyles(customStyles)(Header);