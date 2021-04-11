import {
  ButtonBase,
  Divider,
  Fade,
  Grid,
  IconButton,
  Snackbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import Header from "../../common/header/Header";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faRupeeSign} from '@fortawesome/free-solid-svg-icons';
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import "./Details.css";
import Cart from "../../common/cart/Cart";

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
      categories: [],
      cartList: [],
      cartAmount: 0,
      cartSize: 0,
      snackBarOpen: false,
      snackBarMessage: "",
      transition: Fade,
    };
    this.cartModifyEventHandler = this.cartModifyEventHandler.bind(this);
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
  // Handle Cart item 
  itemAddButtonClickHandler = (item) => {
    let cartItems = this.state.cartList;
    let itemPresentInCart = false;
    cartItems.forEach((cartItem) => {
      //running a loop to find if the item is already present in the cart.
      if (cartItem.id === item.id) {
        // if passed item and the looping item is same we increase the quantity by 1
        itemPresentInCart = true;
        cartItem.quantity++; //increasing only the quantity
        cartItem.totalAmount = cartItem.price * cartItem.quantity; //Updating the total price of an item
      }
    });
    if (!itemPresentInCart) {
      //pushing the item into the cart if it not exists in the cart
      let cartItem = {
        id: item.id,
        name: item.item_name,
        price: item.price,
        totalAmount: item.price,
        quantity: 1,
        itemType: item.item_type,
      };
      cartItems.push(cartItem);
    }
    //re-iterating the amount of the cart
    let totalAmount = 0;
    let cartQuantity = 0;
    cartItems.forEach((cartItem) => {
      totalAmount = totalAmount + cartItem.totalAmount;
      cartQuantity = cartQuantity + cartItem.quantity;
    });

    //refreshing the state
    this.setState({
      ...this.state,
      cartList: cartItems,
      snackBarOpen: true,
      snackBarMessage: "Item added to cart!",
      cartAmount: totalAmount,
      cartSize: cartQuantity,
    });
  };

  //event handler to update the snackbar status
  onSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      ...this.state,
      snackBarMessage: "",
      snackBarOpen: false,
    });
  };

  async cartModifyEventHandler(cartOperation, cartItem, cartIndex) {
    let that = this;
    if (cartOperation === "add") {
      const myCartList = that.state.cartList;
      let findItem = myCartList[cartIndex];
      if (findItem !== undefined) {
        findItem.quantity = findItem.quantity + 1;
        findItem.totalAmount = findItem.totalAmount + findItem.price;
      }
      myCartList[cartIndex] = findItem;
      await that.setState({
        ...that.state,
        cartAmount: that.state.cartAmount + findItem.price,
        cartSize: that.state.cartSize + 1,
        cartList: myCartList,
        snackBarMessage: "Item quantity increased by 1!",
        snackBarOpen: true,
      });
    } else if (cartOperation === "remove") {
      const myCartList = that.state.cartList;
      let findItem = myCartList[cartIndex];
      let snackMessage = "";
      if (findItem !== undefined) {
        findItem.quantity = findItem.quantity - 1;
        findItem.totalAmount = findItem.totalAmount - findItem.price;
      }
      if (findItem.quantity <= 0) {
        myCartList.splice(cartIndex, 1);
        snackMessage = "Item removed from cart!";
      } else {
        myCartList[cartIndex] = findItem;
        snackMessage = "Item quantity decreased by 1!";
      }
      console.log(that.state.cartAmount - findItem.price);
      console.log(that.state.cartSize - 1);
      await that.setState({
        ...that.state,
        cartAmount: that.state.cartAmount - findItem.price,
        cartSize: that.state.cartSize - 1,
        cartList: myCartList,
        snackBarMessage: snackMessage,
        snackBarOpen: true,
      });
    }
  }

  async onSnackBarEventHandler(message) {
    await this.setState({
      snackBarMessage: message,
      snackBarOpen: true,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Header
          history={this.props.history}
          baseUrl={this.props.baseUrl}
          displayItems={{
            displaySearchBar: false,
          }}
        />
        {/* Element to provide details of the restaurant */}
        <div className={classes.root}>
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
                  sm={5}
                  className="restaurant-rating-cost-container"
                >
                  <div className="restaurant-rating-container">
                    <div className="restaurant-rating">
                    <FontAwesomeIcon icon={faStar} size="sm" color="black" />{" "}
                      &nbsp;
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
                <Grid
                  item
                  xs={6}
                  sm={5}
                  className="restaurant-avg-cost-container"
                >
                  <div className="restaurant-avg-cost">
                  <FontAwesomeIcon icon={faRupeeSign} /> &nbsp;
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

        {/* elements to display the menu contents of a restaurant */}
        <Grid
          container
          justify="space-around"
          alignItems="stretch"
          className="menu-items-cart-container"
        >
          {/* grid to display the menu items according to category */}
          <Grid
            item
            xs={11}
            sm={5}
            justify="space-around"
            alignItems="stretch"
            className="menu-items-container"
          >
            <div className="menu-items">
              {this.state.categories.map((
                category //Iterating through every category from the array of categories
              ) => (
                <div key={category.id}>
                  <Typography variant="overline" component="div">
                    {category.category_name}
                  </Typography>
                  <Divider />
                  <Grid container>
                    {category.item_list.map((item) => (
                      <Grid
                        container
                        item
                        className="menu-item-container"
                        key={item.id}
                      >
                        <Grid item xs={1}>
                          <FontAwesomeIcon
                            icon="circle"
                            size="sm"
                            color={
                              item.item_type === "NON_VEG"
                                ? "#a0413e"
                                : "#67bd68"
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="subtitle1"
                            component="p"
                            className="menu-item-name"
                          >
                            {item.item_name}
                          </Typography>
                        </Grid>

                        <Grid item xs={3}>
                          <div className="item-price">
                            <i className="fa fa-inr" aria-hidden="true"></i>
                            &nbsp;
                            <Typography
                              variant="subtitle1"
                              component="p"
                              className={classes.itemPrice}
                            >
                              {item.price.toFixed(2)}
                            </Typography>
                          </div>
                        </Grid>

                        <Grid item xs={2}>
                          <IconButton
                            className={classes.addButton}
                            aria-label="add"
                            onClick={() => this.itemAddButtonClickHandler(item)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ))}
            </div>
          </Grid>

          {/* cart component */}
          <Grid item xs={11} sm={6} md={5} className="cart-container">
            <Cart
              history={this.props.history}
              baseUrl={this.props.baseUrl}
              cartAmount={this.state.cartAmount}
              cartSize={this.state.cartSize}
              cartList={this.state.cartList}
              restaurantDetails={this.state.restaurantDetails}
              cartModifyEvent={this.cartModifyEventHandler.bind(this)}
              snackbarEvent={this.onSnackBarEventHandler.bind(this)}
              cartName="checkout"
            />
          </Grid>
        </Grid>

        {/* snackbar msg component */}

        <div>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={this.state.snackBarOpen}
            autoHideDuration={1500}
            onClose={this.onSnackBarClose}
            TransitionComponent={this.state.transition}
            ContentProps={{
              "aria-describedby": "message-id",
            }}
            message={<span id="message-id">{this.state.snackBarMessage}</span>}
            action={
              <IconButton color="inherit" onClick={this.onSnackBarClose}>
                <CloseIcon />
              </IconButton>
            }
          />
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Details);
