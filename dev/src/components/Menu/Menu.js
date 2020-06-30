import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom'
import 'whatwg-fetch';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const images = [
    {
        url: '../../images/beers.jpg',
        title: 'Beers',
        width: '50%',
    },
    {
        url: '../../images/food.jpg',
        title: 'Food',
        width: '50%',
    },
    {
        url: '../../images/drinks.jpg',
        title: 'Drinks',
        width: '50%',
    },
    {
        url: '../../images/ciders.jpg',
        title: 'Ciders',
        width: '50%',
    },
    {
        url: '../../images/soda.jpg',
        title: 'Sodas',
        width: '50%',
    },
    {
        url: '../../images/wine.jpg',
        title: 'Wine',
        width: '50%',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));



class Menu extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {

        return (
            <Container maxWidth="sm">
                <Typography variant="h3" gutterBottom>
                    <Box textAlign="center" letterSpacing={3} >
                        menu
        </Box >
                </Typography>

                <Box border={1} boxShadow={3}>
                    <ButtonBases />
                </Box >
            </Container>
        );
    }

}

function ButtonBases() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {images.map((image) => (
                <ButtonBase
                    focusRipple
                    key={image.title}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: image.width,
                    }}
                    href={'/'+image.title}
                >
                    <span
                        className={classes.imageSrc}
                        style={{
                            backgroundImage: `url(${image.url})`,
                        }}
                    />
                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton}>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                        >
                            {image.title}
                            <span className={classes.imageMarked} />
                        </Typography>
                    </span>
                </ButtonBase>
            ))}
        </div>
    );
}

export default Menu;