import {
  ButtonBase,
  Grid,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import Header from "../../common/header/Header";

import "./Details.css";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "lightgray",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
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
          categoriesList: categoriesList.join(", ").toString(),
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
          {/* <Grid
            container
            // spacing={2}
            alignItems="center"
            // alignContent={"center"}
            justify="flex-start"
          >
            <Grid container item xs={12} sm={2}>
              <Paper variant="outlined" elevation="24">
                <img src={this.state.restaurantDetails.imageURL} />
              </Paper>
            </Grid>
            <Grid container item xs={12} sm={10}></Grid>
          </Grid> */}

          <Grid container className="restaurant-details-container">
            <Grid item>
              <ButtonBase className="image">
                <img
                  className="img"
                  alt="complex"
                  src={this.state.restaurantDetails.imageURL}
                />
              </ButtonBase>
            </Grid>
            <Grid
              item
              xs={12}
              sm
              container
              direction="column"
              className="restaurant-details"
            >
              <Grid item xs={12} sm>
                <div className="restaurant-name">
                  <Typography
                    variant="h5"
                    component="h5"
                    className="restaurantName"
                  >
                    {this.state.restaurantDetails.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    className="restaurantLocation"
                  >
                    {this.state.restaurantDetails.locality}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    component="p"
                    className="restaurantCategory"
                  >
                    {this.state.restaurantDetails.categoriesList}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm container direction="row" spacing={2}>
                <Grid
                  item
                  xs={6}
                  sm
                  className="restaurant-rating-cost-container"
                >
                  <div className="restaurant-rating-container">
                    <div className="restaurant-rating">
                      {/* <FontAwesomeIcon icon="star" size="sm" color="black" /> */}
                      <Typography variant="subtitle1" component="p">
                        {this.state.restaurantDetails.rating}
                      </Typography>
                    </div>
                    <Typography
                      variant="subtitle2"
                      component="p"
                      className="textRatingCost"
                    >
                      AVERAGE RATING BY{" "}
                      {
                        <span className="restaurant-NoOfCustomerRated">
                          {this.state.restaurantDetails.noOfCustomerRated}
                        </span>
                      }{" "}
                      CUSTOMERS
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={6} sm className="restaurant-avg-cost-container">
                  <div className="restaurant-avg-cost">
                    {/* <i className="fa fa-inr" aria-hidden="true"></i> */}
                    <Typography
                      variant="subtitle2"
                      component="p"
                      className="avgCost"
                    >
                      {this.state.restaurantDetails.avgCost}
                    </Typography>
                  </div>
                  <Typography
                    variant="subtitle2"
                    component="p"
                    className="textRatingCost"
                  >
                    AVERAGE COST FOR TWO PEOPLE
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Details);
