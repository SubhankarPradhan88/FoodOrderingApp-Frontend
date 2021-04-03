import { Grid, Paper, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import Header from "../../common/header/Header";

import "./Details.css";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "lightgray",
    border: "1px solid red",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantDetails: {},
      categories: {},
    };
  }

  componentDidMount() {
    let data = null;
    let that = this;
    let xhrRestaurantDetails = new XMLHttpRequest();
    xhrRestaurantDetails.addEventListener("readystatechange", function() {
      if (
        xhrRestaurantDetails.readyState === 4 &&
        xhrRestaurantDetails.status === 200
      ) {
        let response = JSON.parse(xhrRestaurantDetails.responseText);
        let categoriesList = [];
        //creating a list of catergories wrt restaurant
        response.categories.forEach((category) => {
          categoriesList.push(category.category_name);
        });
        //populating the restaurant details in a required format.
        let restaurantDetails = {
          id: response.id,
          name: response.restaurant_name,
          locality: response.address.locality,
          categoriesList: categoriesList.toString(),
          rating: response.customer_rating,
          noOfCustomerRated: response.number_customers_rated,
          avgCost: response.average_price,
          imageURL: response.photo_URL,
        };

        let categories = response.categories;
        that.setState({
          ...that.state,
          restaurantDetails: restaurantDetails,
          categories: categories,
        });
      }
    });

    //Calling the api to get details of the restaurant by id.
    xhrRestaurantDetails.open(
      "GET",
      this.props.baseUrl + "restaurant/" + this.props.match.params.id
    );
    xhrRestaurantDetails.send(data);
  }

  render() {
    console.log(this.state.restaurantDetails);

    const { classes } = this.props;

    return (
      <>
        <Header
          displayItems={{
            displaySearchBar: false,
          }}
        />

        <div className={classes.root}>
          <Grid
            container
            // spacing={0}
            alignItems={"stretch"}
            alignContent={"stretch"}
            justify={"space-evenly"}
          >
            <Grid item xs={12} sm={3}>
              <Paper className={classes.paper}>
                xs={12} sm={3}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Paper className={classes.paper}>
                xs={12} sm={3}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Details);
