import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
  withStyles,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

import React, { Component } from "react";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: this.props.cartList,
      cartAmount: this.props.cartAmount,
      cartSize: this.props.cartSize,
      restaurantDetails: this.props.restaurantDetails,
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

  render() {
    return (
      <>
        <div
        // className="myCart"
        >
          <Grid item xs={12}>
            <Grid item xs={12}>
              {this.state.cartName === "checkout" ? (
                <>
                  <Grid item xs={2}>
                    <Badge
                      // className="hideBadgeonModal"
                      badgeContent={
                        this.state.cartSize === 0 ? "0" : this.state.cartSize
                      }
                      color="primary"
                    >
                      <ShoppingCartIcon />
                    </Badge>
                  </Grid>
                  <Grid item xs={10}>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "30px",
                        marginLeft: "6%",
                      }}
                    >
                      My Cart
                    </span>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12}>
                    <CardHeader
                      style={{ fontWeight: "bolder" }}
                      title="Summary"
                      titleTypographyProps={{ variant: "h4" }}
                    />
                  </Grid>
                </>
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
            <Grid item xs={12}></Grid>
            <Card className="cardRoot" style={{ border: "1px solid red" }}>
              <CardContent className="cardContentRoot">
                {/* <Badge
                  className="hideBadgeonModal"
                  badgeContent={
                    this.state.cartSize === 0 ? "0" : this.state.cartSize
                  }
                  color="primary"
                >
                  <ShoppingCartIcon />
                </Badge>
                <span
                // style={{
                //   fontWeight: "bold",
                //   fontSize: "30px",
                //   marginLeft: "6%",
                // }}
                >
                  My Cart
                </span>
                <br />
                <br /> */}
                <div>
                  {(this.state.cartList || []).map((cartItem, index) => (
                    <div className="myCartItemList" key={cartItem.id}>
                      <Grid container className="itemNameinCart">
                        <Grid item xs={1}>
                          <span>
                            {cartItem.itemType === "VEG" ? (
                              <span>
                                <span>
                                  <i
                                    className="fa fa-stop-circle-o"
                                    style={{
                                      color: "#a0413e",
                                      width: "1",
                                      height: "1",
                                    }}
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </span>
                            ) : (
                              <span>
                                <span>
                                  <i
                                    className="fa fa-stop-circle-o"
                                    style={{ color: "#67bd68" }}
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </span>
                            )}
                          </span>
                        </Grid>
                        <Grid item xs={5}>
                          <span
                            style={{
                              color: "grey",
                              fontSize: 20,
                              marginLeft: 8,
                            }}
                          >
                            {cartItem.name}
                          </span>
                        </Grid>
                        <Grid
                          item
                          container
                          xs={3}
                          className="addRemove"
                          style={{ border: "1px solid green" }}
                        >
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
                              //   style={{
                              //     fontSize: 22,
                              //     fontWeight: "bold",
                              //     fill: "black",
                              //   }}
                              />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <Typography
                            // style={{
                            //   marginTop: "8%",
                            //   fontSize: 20,
                            //   fill: "grey",
                            // }}
                            >
                              {cartItem.quantity}
                            </Typography>
                          </Grid>
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
                              //   style={{
                              //     fontSize: 22,
                              //     fontWeight: "bold",
                              //     fill: "black",
                              //   }}
                              />
                            </IconButton>
                          </Grid>
                        </Grid>
                        <Grid item xs={3}>
                          <div style={{ paddingTop: "2%" }}>
                            <span
                              style={{
                                fontWeight: "bold",
                                color: "grey",
                                fontSize: "120%",
                              }}
                            >
                              <i className="fa fa-inr"></i>
                              <span> {cartItem.totalAmount}</span>
                            </span>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                </div>
                <Grid
                  item
                  xs
                  container
                  justify="space-between"
                  style={{ marginTop: 16 }}
                >
                  <Grid item>
                    <Typography
                      style={{ fontSize: "170%", fontWeight: "bold" }}
                      gutterBottom
                      className="bold"
                    >
                      Total Amount
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      style={{ fontSize: "170%", fontWeight: "bold" }}
                      gutterBottom
                      className="bold"
                    >
                      <i className="fa fa-inr"></i>
                      <span> {this.state.cartAmount}</span>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
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
            </Card>
          </Grid>
        </div>
      </>
    );
  }
}
