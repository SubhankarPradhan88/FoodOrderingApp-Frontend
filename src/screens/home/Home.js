import React, { Component } from 'react';

import './Home.css';
import Header from '../../common/header/Header';
import { RestaurantCard } from './RestaurantCard';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodAppMediaInfo: [],
            searchString: ''
        };
    }

    componentDidMount() {
        let fetchMediaInfoEndPoint = `${this.props.baseUrl}restaurant`;
        let dataMediaDetail = null;
        let xhrMediaInfo = new XMLHttpRequest();
        let that = this;
        xhrMediaInfo.addEventListener('readystatechange', function() {
            if(this.readyState === 4 && xhrMediaInfo.status === 200) {
                let parsedData = JSON.parse(this.responseText).restaurants;
                that.setState({ foodAppMediaInfo: parsedData});
            }
        })
        xhrMediaInfo.open("GET", fetchMediaInfoEndPoint);
        xhrMediaInfo.setRequestHeader("Cache-Control", "no-cache");
        xhrMediaInfo.setRequestHeader("Content-Type", "application/json");
        xhrMediaInfo.setRequestHeader("Access-Control-Allow-Origin", "*");      // Handle CORS
        xhrMediaInfo.send(dataMediaDetail);
    }

     // Search feature based on the post's caption
     searchRestaurantHandler = (searchText) => {
        this.setState({ searchString: searchText });
    }

    render() {
        const { foodAppMediaInfo, searchString } = this.state;
        return (
            <React.Fragment>
                <Header 
                    searchHandler={this.searchRestaurantHandler} 
                    history={this.props.history}
                    displayItems = {{
                        displaySearchBar: true
                    }}
                />
                <RestaurantCard foodAppMediaInfo={foodAppMediaInfo} searchString={searchString} />
            </React.Fragment>
        )
    }
}

export default Home;