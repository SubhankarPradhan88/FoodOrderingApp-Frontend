import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../screens/home/Home";

class Controller extends Component {
    constructor(props) {
        super(props);
        this.baseUrl = "http://localhost:8080/api/";
    }
    render() {
        return (
            <Router>
                <div>
                    {/* Handle routing of respective components */}
                    <Route exact path="/" render={(props) => <Home {...props} baseUrl={this.baseUrl} />} />
                </div>
            </Router>
        )
    }
}

export default Controller;
