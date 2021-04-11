import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopCircle, faRupeeSign } from "@fortawesome/free-solid-svg-icons";

import React, { Component } from "react";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: this.props.cartList,
      cartAmount: this.props.cartAmount,
      cartSize: this.props.cartSize,
      restaurantDetails: this.props.restaurantDetails,
      badgeVisible: sessionStorage.getItem("registrationModalState"),
    };

    this.addAnItemFromCart = this.addAnItemFromCart.bind(this);
    this.removeAnItemFromCart = this.removeAnItemFromCart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      //   cartList: nextProps.cartList,
      //   cartAmount: nextProps.cartAmount,
      //   cartSize: nextProps.cartSize,
      //   restaurantDetails: nextProps.restaurantDetails,
      ...nextProps,
    });
  }

  checkOutCart = (e) => {
    const myCartItem = this.state.cartList;
    if (myCartItem.length <= 0) {
      this.props.snackbarEvent("Please add an item to your cart!");

      return;
    } else {
      if (sessionStorage.getItem("access-token") === null) {
        this.props.snackbarEvent("Please login first!");
        return;
      } else {
        sessionStorage.setItem(
          "restaurantDetails",
          JSON.stringify(this.state.restaurantDetails)
        );
        //Redirecting to Checkout page
        this.props.history.push({
          pathname: "/checkout",
          state: {
            chcartItems: this.state.cartList,
            totalCartItemsValue: this.state.cartAmount,
          },
        });
      }
    }
  };

  // Removing the item from cart
  removeAnItemFromCart = (removeCartItem, index) => {
    this.props.cartModifyEvent("remove", removeCartItem, index);
  };

  addAnItemFromCart = (addCartItem, index, event) => {
    this.props.cartModifyEvent("add", addCartItem, index);
  };

  toggleBadgeHandler() {
    return sessionStorage.getItem("registrationModalState")
      ? "hideBadgeonModal"
      : "showBadgeonModal";
  }

  render() {
    let badgeFlag = sessionStorage.getItem("registrationModalState");
    return (
      <>
        <Card className="cardRoot">
          <CardContent className="cardContentRoot">
            <Grid item xs={12} justify="space-around" alignItems="stretch">
              <Grid item xs={12}>
                {this.state.cartName === "checkout" ? (
                  <Grid item container justify="flex-start" alignItems="center">
                    <Grid item xs={1}>
                      <Badge
                        badgeContent={
                          this.state.cartSize === 0 ? "0" : this.state.cartSize
                        }
                        color="primary"
                      >
                        <ShoppingCartIcon />
                      </Badge>
                    </Grid>
                    <Grid item xs={5}>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "25px",
                          marginLeft: "10px",
                        }}
                      >
                        My Cart
                      </span>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <CardHeader
                      style={{ fontWeight: "bolder" }}
                      title="Summary"
                      titleTypographyProps={{ variant: "h4" }}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                {this.state.cartName !== "checkout" && (
                  <div
                    style={{
                      marginLeft: "3%",
                      fontSize: "200%",
                      color: "grey",
                      fontWeight: "bold",
                    }}
                  >
                    {this.state.restaurantDetails.name}
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                {(this.state.cartList || []).map((cartItem, index) => (
                  <div className="myCartItemList" key={cartItem.id}>
                    <Grid
                      item
                      container
                      xs={12}
                      justify="center"
                      alignItems="stretch"
                    >
                      <Grid item xs={1} justify="center" alignItems="center">
                        <span
                          style={{
                            paddingLeft: "10px",
                          }}
                        >
                          {cartItem.itemType === "VEG" ? (
                            <FontAwesomeIcon
                              icon={faStopCircle}
                              style={{
                                color: "#67bd68",
                              }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faStopCircle}
                              style={{
                                color: "#a0413e",
                              }}
                            />
                          )}
                        </span>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        alignItems="center"
                        alignContent="center"
                        justify="center"
                      >
                        <span
                          style={{
                            color: "grey",
                            fontSize: 20,
                            marginLeft: 8,
                            textTransform: "capitalize",
                          }}
                        >
                          {cartItem.name}
                        </span>
                      </Grid>
                      <Grid
                        item
                        container
                        xs={4}
                        className="addRemove"
                        justify="center"
                        alignItems="center"
                      >
                        {this.state.cartName === "checkout" && (
                          <Grid item>
                            <IconButton
                              aria-label="Remove Item"
                              onClick={this.removeAnItemFromCart.bind(
                                this,
                                cartItem,
                                index
                              )}
                            >
                              <RemoveIcon
                                style={{
                                  fontSize: 22,
                                  fontWeight: "bold",
                                  fill: "black",
                                }}
                              />
                            </IconButton>
                          </Grid>
                        )}
                        <Grid item>
                          <Typography
                            style={{
                              PaddingTop: "10%",
                              fontSize: 20,
                              fill: "grey",
                              display: "block",
                              paddingTop: "5px",
                            }}
                          >
                            {cartItem.quantity}
                          </Typography>
                        </Grid>
                        {this.state.cartName === "checkout" && (
                          <Grid item>
                            <IconButton
                              aria-label="Add Item"
                              onClick={this.addAnItemFromCart.bind(
                                this,
                                cartItem,
                                index
                              )}
                            >
                              <AddIcon
                                style={{
                                  fontSize: 22,
                                  fontWeight: "bold",
                                  fill: "black",
                                }}
                              />
                            </IconButton>
                          </Grid>
                        )}
                      </Grid>
                      <Grid
                        container
                        item
                        xs={3}
                        justify="flex-end"
                        alignItems="center"
                      >
                        {/* <Grid item justify="flex-end" alignItems="center"> */}
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "grey",
                            fontSize: "120%",
                            display: "inline-block",
                            paddingTop: "10px",
                          }}
                        >
                          <FontAwesomeIcon icon={faRupeeSign} />
                          <span>{cartItem.totalAmount.toFixed(2)}</span>
                        </span>
                        {/* </Grid> */}
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </Grid>
              <Grid item container xs={12} justify="space-between">
                <Grid item xs={6}>
                  <Typography
                    style={{ fontSize: "170%", fontWeight: "bold" }}
                    gutterBottom
                    className="bold"
                  >
                    Total Amount
                  </Typography>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                  item
                  xs={6}
                >
                  <Grid item justify="flex-end" alignItems="center">
                    <Typography
                      style={{ fontSize: "170%", fontWeight: "bold" }}
                      gutterBottom
                      className="bold"
                    >
                      <i className="fa fa-inr"></i>
                      <span> {this.state.cartAmount.toFixed(2)}</span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <CardActions>
                  <Button
                    style={{ width: "100%", fontSize: " 20px" }}
                    variant="contained"
                    onClick={this.checkOutCart.bind(this)}
                    color="primary"
                  >
                    CHECKOUT
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </>
    );
  }
}
