
import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import AppBar from '@material-ui/core/AppBar';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Popover from '@material-ui/core/Popover';

import { useHistory } from "react-router-dom";
import './Menu.css';
import Footer from '../Footer/Footer';


const axios = require('axios');
const country = require('country-data').lookup




const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: '45px',
        zIndex: '5'
    },

    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    appbar: {
        position: 'sticky',

    },
    sticky: {
        top: '0px',

        position: 'sticky',



    },
    iconButton: {
        padding: 10,
    },
    content: {
        marginTop: '5px',
        marginBottom: '5px',
        marginLeft: '10px',
        marginRight: '10px',
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },

    title: {
        flexGrow: 1,
    },
    label: {
        position: 'relative',
        top: '5px',
        marginBottom: '4px',
    },
    rating: {

        display: "inline",
        position: 'relative',
        top: '-3px',

    },
    img: {
        marginTop: '4px',
        border: '1px ',
        borderStyle: 'outset',
        borderRadius: '8px',
    },
    card: {
        color: 'white',
        // background: 'rgba(0, 0, 0, 0)'
        backgroundColor: '#49515F',
        marginTop: '2px',
        marginBottom: '2px',
        height: '10%'


    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    textButton: {
        position: 'relative',
        top: '-13px',
        float: 'right',



    },
}));
function Sorter(sortVariable, array) {
    if (sortVariable === "title-ascending") {
        array = array.sort(function (a, b) {
            a = a.title.toLowerCase();
            b = b.title.toLowerCase();

            return a < b ? -1 : a > b ? 1 : 0;
        });
        return array
    }
    if (sortVariable === "title-descending") {
        array = array.sort(function (a, b) {
            a = a.title.toLowerCase();
            b = b.title.toLowerCase();

            return b < a ? -1 : b > a ? 1 : 0;
        });
        return array
    }


}

export default function Ciders() {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = React.useState(true);
    const [currentRows, setCurrentRows] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        history.push("/");
    }
    const handleClickClock = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseClock = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    React.useEffect(() => {
        axios.get("/api/get/ciders")
            .then(function (response) {
                // handle success
                let importedRows = []

                for (var prop in response.data) {
                    var item = response.data[prop];

                    importedRows.push(item);

                }
                setCurrentRows(Sorter('title-ascending', [...importedRows]))
                setLoading(false)

            })
            .catch(function (error) {
                // handle error
                console.log(error);

            })
            .then(function () {
                // always executed
            })
    }, []);



    return (
        <Container disableGutters maxWidth="xs" >
            {loading ? (<div style={{ textAlign: 'center', margin: "2px" }}><CircularProgress /><Typography style={{ color: 'white', margin: "2px" }} variant="h6" >
                Loading ciders
    </Typography></div>) : (<div>
                    <AppBar style={{ background: '#282c34', height: '45px' }} className={classes.appbar} >
                        <Grid container >
                            <Grid item xs={3}  >
                                <IconButton style={{ textAlign: 'left' }} onClick={handleClick} color="inherit" aria-label="menu">
                                    <ArrowBackIosIcon style={{ marginBottom: '20px' }} />
                                    <p style={{ marginTop: '-15px', fontSize: '0.85em' }}>
                                        Menu
    </p>
                                </IconButton>

                            </Grid>
                            <Grid item xs={6} style={{ textAlign: 'center', }} >
                                <p style={{ fontSize: '1.3em', marginTop: "12px" }}>
                                    Ciders
    </p>
                            </Grid>
                            <Grid item xs={3} style={{ textAlign: 'right', marginTop: '0px' }} >
                                <IconButton color="inherit" aria-describedby={id} onClick={handleClickClock}>
                                    <ScheduleIcon />
                                </IconButton>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleCloseClock}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <p style={{ textAlign: "center", paddingTop: "10px" }} >Opening hours</p>
                                    <p style={{ textAlign: "center", paddingTop: "4px" }} >Mon-Thu: 18:00-01:00</p>
                                    <p style={{ textAlign: "center", paddingTop: "4px" }} >Fri-Sat: 18:00-02:00</p>
                                    <p style={{ textAlign: "center", paddingTop: "4px", paddingBottom: "10px", paddingLeft: "10px", paddingRight: "10px" }} >Last order 30 min before closing!</p>
                                </Popover>
                            </Grid>
                        </Grid>
                    </AppBar>
                    {/* <AppBar style={{ background: '#282c34' }} className={classes.appbar} >
                        <Toolbar variant="dense">
                            <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <ArrowBackIosIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.appbar}>
                                Ciders
    </Typography>

                        </Toolbar>
                    </AppBar> */}
                    {/* <Paper component="form" className={classes.root}>
                        <SearchIcon style={{ fontSize: 24 }} />
                        <InputBase
                            className={classes.input}
                            placeholder="Search Ciders and Breweries..."
                            onChange={handleSearchChange}
                            value={searchValue}
                        />

                        <React.Fragment key="sort">
                            <Button onClick={toggleDrawer("sort", true)}>Sort</Button>
                            <Drawer anchor="left" open={state["sort"]} onClose={toggleDrawer("sort", false)}>
                                {sortList("left")}
                            </Drawer>
                        </React.Fragment>
                        <React.Fragment key="filter">
                            <Button onClick={toggleDrawer("filter", true)}>Filter</Button>
                            <Drawer anchor="left" open={state["filter"]} onClose={toggleDrawer("filter", false)}>
                                {filterList("left")}
                            </Drawer>
                        </React.Fragment>

                    </Paper> */}

                    <Divider />
                    <h4 style={{ color: 'white', margin: "5px" }} >
                        {currentRows.length} ciders found
    </h4>

                    <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                        On tap:
    </h6>
                    {currentRows.filter(row => row.form === "Tap")
                        .map(function (row) {
                            return (<MenuItem key={row._id} properties={row} />)
                        })}
                    <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                        On bottle
    </h6>
                    {currentRows.filter(row => row.form === "Bottle")
                        .map(function (row) {
                            return (<MenuItem key={row._id} properties={row} />)
                        })}
                    {/* {currentRows.map(function (row) {
                        return (<MenuItem key={row._id} properties={row} />)
                    })} */}
                    <Divider />
                    <Footer />
                </div>
                )}

        </Container>
    );


}

function MenuItem(props) {
    const classes = useStyles();
    const [showText, setText] = React.useState(false);
    const [countryFlag, setFlag] = React.useState("");
    const handleTextButton = () => {
        if (showText === true)
            setText(false)
        else
            setText(true)

    };
    React.useEffect(() => {

        if (props.properties.country.length > 0)
            setFlag('../../images/flags/' + country.countries({ name: props.properties.country })[0].alpha2.toLowerCase() + ".png")
    }, [props.properties.country]);

    return (
        <div>


            <Card className={classes.card}>
                <div className={classes.content}>
                    <Grid container >

                        <Grid item xs={1}>
                            <img className={classes.img} src={props.properties.image} alt="logo" width="35" height="35" />
                        </Grid>
                        <Grid item xs={9}>

                            <h6 style={{ marginLeft: "15px", fontSize: "1em" }} display="block">
                                {props.properties.title}
                            </h6>
                            <p style={{ marginLeft: "15px", fontSize: "0.9em" }} display="inline">
                                {props.properties.brewery} <img style={{ marginLeft: "3px", marginBottom: "-1px" }} alt={props.properties.country} src={countryFlag} height="12" />
                            </p>
                            <p style={{ marginLeft: "15px", fontSize: "0.8em" }} display="block">
                                {props.properties.type} - {props.properties.alcohol === 0.0 ? ("Alcohol Free") : (props.properties.alcohol + "%")}
                            </p>

                            {/* <Rating name="read-onsly" value={props.properties.rating} readOnly display="block" /> */}
                        </Grid>
                        <Grid style={{ textAlign: "center" }} item xs={2} >
                            {props.properties.size.split(',').map(function (size) {
                                return (<p style={{ fontSize: "0.8em" }} display="block">
                                    {size} ml
                                </p>)
                            })}


                            {/* <Divider style={{ background: "white", marginTop: "2px", marginBottom: "2px" }} variant='middle'/> */}
                            <h6 style={{ fontSize: "0.8em" }} display="block">
                                {props.properties.location === "Inside/Outside" ? ("Both bars") : (props.properties.location + " bar")}
                            </h6>
                            {/* {props.properties.location.split('/').map(function (location) {
                                    return (<Typography variant="body2" key={location} display="block">
                                        {location}
                                    </Typography>)
                                })}
                                <Divider style={{ background: "white", marginTop: "2px", marginBottom: "2px" }} variant='middle' />
                                <Typography variant="body2" display="block">
                                    {props.properties.form}
                                </Typography>
                                <Divider style={{ background: "white", marginTop: "2px", marginBottom: "2px" }} variant='middle' />
                                {props.properties.size.split(',').map(function (size) {
                                    return (<Typography variant="body2" key={size} display="block">
                                        {size} ml
                                    </Typography>)
                                })} */}

                            {/* <Rating name="read-onsly" value={props.properties.rating} readOnly display="block" /> */}
                        </Grid>

                        {showText ? (

                            <p style={{ fontSize: "0.7em" }}>
                                {props.properties.description}
                                <Link color="inherit" onClick={handleTextButton}>
                                    [Show less]
                                    </Link>
                            </p>
                        ) : (<div>{(props.properties.description.length > 60) ? (<p style={{ fontSize: "0.7em" }} >


                            {props.properties.description.substring(0, 60)}...  <Link color="inherit" onClick={handleTextButton}>
                                [Show more]
                                </Link></p>) : (<p style={{ fontSize: "0.7em" }} >{props.properties.description}</p>)

                        }</div>)}

                        {/* { showText ? (<Grid item xs={12}>
                                <Grid item xs={8}>
                            <Typography variant="body1">
                                    {props.properties.description}
                                </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                <IconButton onClick={handleTextButton} className={classes.menuButton} color="inherit" aria-label="menu">
                        < IndeterminateCheckBoxIcon />
                            </IconButton>
                            </Grid></Grid>) :
                            (<Grid item xs={12}><Grid item xs={8}>
                                <Typography display="block" variant="body1">
                                    {props.properties.description.substring(0,50)}...
                                </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                <IconButton display="block" edge="start" onClick={handleTextButton}  className={classes.menuButton} color="inherit" aria-label="menu">
                        <AddBoxIcon />
                            </IconButton></Grid></Grid>)
                           
                            } */}
                    </Grid >
                </div>
            </Card>
        </div>


    );
}



// function ImgMediaCard() {
//     const classes = useStyles();

//     return (
//         <Card className={classes.root}>
//             <CardMedia
//                 className={classes.image}
//                 component="img"
//                 alt="Contemplative Reptile"

//                 image="../../images/beers/gehenna.jpeg"
//                 title="Gehenna"
//             />


//             <div className={classes.details}>

//                 <CardContent>
//                     <div className={classes.names}>
//                         <Typography variant="h5" component="h2" >
//                             Gehenna
//             </Typography>
//                         <Typography className={classes.brewery} variant="subtitle1">
//                             Tempel Brygghus
//             </Typography>
//                     </div>
//                     <Typography variant="body2" color="textSecondary" component="p">
//                     Sour ale dry hopped with the New Zealand hop Motueka. Updated recipe compared to the old edition, with different yeast used and more hops.
//             </Typography>
//                     <div className={classes.details}>
//                         <Typography variant="button" >
//                             Sour
//             </Typography>
//                         <Typography variant="button">
//                             5.2% ABV
//             </Typography>
//                         <Typography variant="button">
//                             No IBU
//             </Typography>
//                     </div>
//                     <div className={classes.details}>

//                         <Typography variant="h6">
//                             3.48/5.00
//             </Typography>
//                         <Typography variant="h6">
//                             50 kr
//             </Typography>
//                     </div>
//                 </CardContent>
//             </div>


//         </Card>
//     );
// }

// const useStyles = makeStyles({
//     root: {
//         display: 'flex',

//     },
//     image: {
//         flex: '1 0 auto',
//         width: 150,
//         height: 150,
//         margin: 10
//     },
//     details: {

//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     names: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'baseline'
//     },
//     brewery: {

//     },
// });
