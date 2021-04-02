import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GradeIcon from '@material-ui/icons/Grade';
import CardMedia from '@material-ui/core/CardMedia';

import './Home.css';

// Custom styles - Material Card component
const customStyles = makeStyles((theme) => ({
    root: {
        margin: '1%',
        width: 280,
        height: 'auto',
        float: 'left'
      },
      media: {
        height: 150
      },
      starIcon: {
        width: 20,
        height: 20,
        margin: '0px 5px -5px -2px'
      },
      content: {
        margin: 0,
        color: '#000000',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'left',
        justifyContent: 'left',
        textAlign: 'left'
    }
}));

export const RestaurantCard = (props) => {
    const classes = customStyles();
    const { foodAppMediaInfo, searchString } = props;
    let restaurantPosts = foodAppMediaInfo;
    // Filter restaurant(s) based on search string
    let searchParam = searchString.trim().toLowerCase();
    if(searchParam.length > 0) {
        restaurantPosts = restaurantPosts.filter(function(post) {
            return post.restaurant_name.toLowerCase().match( searchParam );
        });
    }
    
    return (
        <div className="image-card-alignment">
            {(restaurantPosts && restaurantPosts.length > 0) && restaurantPosts.map((restaurantPost) => {
                return (
                    <Card className={classes.root} key={'restaurantPost' + restaurantPost.id}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={restaurantPost.photo_URL}
                                title="Contemplative Reptile"
                            />
                            <CardContent className={classes.content}>
                                <Typography variant="h6" component="p">
                                    {restaurantPost.restaurant_name}
                                </Typography>
                                <p></p>
                                <Typography variant="body2" component="p">
                                    {restaurantPost.categories}
                                </Typography>
                                <div className="ratings-wrapper">
                                    <div>
                                        <div className="ratings-style"><GradeIcon className={classes.starIcon} />{restaurantPost.customer_rating} ({restaurantPost.number_customers_rated})</div>
                                    </div>
                                    <div className="price-tag-style"><span>&#8377;</span> {restaurantPost.average_price} for two</div>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )   
            })}
        </div>
    )
}