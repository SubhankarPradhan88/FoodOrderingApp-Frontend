import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faRupeeSign} from '@fortawesome/free-solid-svg-icons';
import './Home.css';

// Custom styles - Material Card component
const customStyles = makeStyles((theme) => ({
    root: {
        width: 280,
        height: 'auto',
        float: 'left',
        // Breakpoints for different screen resolutions
        [theme.breakpoints.down('xs')]: {
            margin: '0% 1% 4% 1%',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0% 1% 3% 1%',
        },
        [theme.breakpoints.up('md')]: {
            margin: '1%',
        },
        [theme.breakpoints.up('lg')]: {
            margin: '1%',
        }
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
                    <Card 
                        className={classes.root} 
                        key={'restaurantPost' + restaurantPost.id} 
                        onClick={() => props.redirectDetailsHandler(restaurantPost.id)}
                    >
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
                                        <div className="ratings-style"><FontAwesomeIcon icon={faStar} /> {restaurantPost.customer_rating} ({restaurantPost.number_customers_rated})</div>
                                    </div>
                                    <div className="price-tag-style"><FontAwesomeIcon icon={faRupeeSign} />{restaurantPost.average_price} for two</div>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )   
            })}
        </div>
    )
}