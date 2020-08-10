import React from 'react';
import 'whatwg-fetch';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Beers from './Beers';
import {
    Route,
    Switch
  } from 'react-router-dom'
import './Menu.css';
import {PersonalAppBar, Background} from './menuUtils';

const images = [

    {
        url: '../../images/food.jpg',
        title: 'food',
        width: '100%',
    },
    {
        url: '../../images/beers.jpg',
        title: 'beers',
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
        url: '../../images/drinks.jpg',
        title: 'drinks',
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
//     test1: {
//         backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/5/53/Upplands_nation1.jpg")',

//         filter: 'blur(8px)',
//         WebkitFilter: 'blur(8px)',


//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         backgroundSize: 'cover',
//         zIndex: -1,
//         width: '100%',
//   height: '100%',
 
//     },
//     text2: {
//         zIndex: '0',


//       },
    
}));



export default function Menu(props) {
    const classes = useStyles();
    document.body.style.background = Background
    document.body.style.backgroundSize = 'cover'
    // document.body.style.filter = 'blur(8px)'
    // document.body.style.WebkitFilter = 'blur(8px)'

    // document.body.style.height = '100%'
    return (
        <div >
            {/* <div className={classes.test1}></div> */}
            <Container  disableGutters maxWidth="sm" >
            <PersonalAppBar
  category=""
logout={props.logout}
admin={props.admin}
  />

                <Box border={1} boxShadow={3}>
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
                            {props.admin ? 
                                ("Edit " + image.title.slice(0).toLowerCase())
                                :(image.title.charAt(0).toUpperCase() + image.title.slice(1).toLowerCase())}
                            <span className={classes.imageMarked} />
                        </Typography>
                    </span>
                </ButtonBase>
            ))}
        </div>
                </Box >
                <Switch>
        <Route path="/beers" component={Beers}/>

      </Switch>
            </Container>
        </div>
        

    );


}

