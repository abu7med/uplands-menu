import React from 'react';
import 'whatwg-fetch';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import './Menu.css';

const images = [
    {
        url: '../../images/beers.jpg',
        title: 'beers',
        width: '100%',
    },
    {
        url: '../../images/food.jpg',
        title: 'food',
        width: '100%',
    },
    {
        url: '../../images/drinks.jpg',
        title: 'drinks',
        width: '100%',
    },
    {
        url: '../../images/ciders.jpg',
        title: 'ciders',
        width: '100%',
    },
    {
        url: '../../images/soda.jpg',
        title: 'sodas',
        width: '100%',
    },
    {
        url: '../../images/wine.jpg',
        title: 'wine',
        width: '100%',
    },
    {
        url: '../../images/whiskey.jpg',
        title: 'whiskey',
        width: '100%',
    },
    {
        url: '../../images/shots.jpg',
        title: 'shots',
        width: '100%',
    },
    {
        url: '../../images/boardgames.jpeg',
        title: 'board games',
        width: '100%',
    },
];

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    appbar: {
        fontFamily: 'roboto',
        fontSize: 20,
        position: 'sticky',

    },
    image: {
        position: 'relative',
        height: 100,
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



export default function Menu() {
    const classes = useStyles();

    return (

        <Container  disableGutters maxWidth="xs" >
            <AppBar style={{ background: '#282c34' }} className={classes.appbar} >
                        <Toolbar variant="dense">
                            
                            <Typography variant="h6" className={classes.appbar}>
                                Menu
    </Typography>

                        </Toolbar>
                    </AppBar>

            <Box border={1} boxShadow={3}>
                <ButtonBases />
            </Box >
        </Container>
    );


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
                    href={'/' + image.title.split(" ").join("")}
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
                            {image.title.charAt(0).toUpperCase() + image.title.slice(1).toLowerCase()}
                            <span className={classes.imageMarked} />
                        </Typography>
                    </span>
                </ButtonBase>
            ))}
        </div>
    );
}
