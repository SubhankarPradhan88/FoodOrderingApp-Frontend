import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';

import './Header.css';

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
            showDropDown: false
        }
    }

    // Call back to search function in the parent component
    onSearchEvent = (e) => {
        let { value } = e.target;
        this.props.searchHandler(value);
    }
    // Toggle the drop down (Show & Hide)
    // showDropDownHandler = (e) => {
    //     this.setState({ showDropDown: !this.state.showDropDown });
    // }
    // routeHandler = (check) => {
    //     if(check === 'logout') {
    //         // Remove all saved data from sessionStorage
    //         sessionStorage.clear();
    //         // Route back to Login screen
    //         this.props.history.push("/");
    //     }else {
    //         // Route back to Profile screen
    //         this.props.history.push("/profile");
    //     }
    // }
    redirectHomeHandler = (e) => {
        this.props.history.push("/");
    }

    render() {
        const { classes, displayItems } = this.props;
        
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
                                    inputProps={{ 'aria-label': 'search' }}
                                    placeholder="Search by Restaurant Name"
                                />
                            </div>}
                            {/* {displayItems['displayProfilePic'] && <div className={classes.headerAvatar}>
                                <Avatar alt="Profile picture" onClick={this.showDropDownHandler} />
                                {this.state.showDropDown && <div className={classes.selectDropDown}>
                                    {displayItems['displaySearchBar'] && <p onClick={(e) => this.routeHandler('myAccount')}>My Account</p>}
                                    {displayItems['displaySearchBar'] && <hr/>}
                                    <p onClick={(e) => this.routeHandler('logout')}>Logout</p>
                                </div>}
                            </div>} */}
                        </div>
                    </div>}
                </header>
            </React.Fragment>
        )
    }
}

export default withStyles(customStyles)(Header);