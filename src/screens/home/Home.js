import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TextField from "@material-ui/core/TextField";
import { red } from '@material-ui/core/colors';

import './Home.css';

// Custom styles - Material Card component
const customStyles = (theme) => ({ 
    root: {
        margin: '1%',
        width: 280,
        height: 'auto',
        float: 'left',
      },
      media: {
        height: 150
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
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodAppMediaInfo: []
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
    render() {
        const { classes } = this.props;
        const { foodAppMediaInfo } = this.state;
        return (
            <React.Fragment>
                <div className="image-card-alignment">
                    {(foodAppMediaInfo && foodAppMediaInfo.length > 0) && foodAppMediaInfo.map((restaurantPost) => {
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
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                         )   
                    })};
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(customStyles)(Home);