
import React from 'react';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom";
import './Menu.css';
import Footer from '../Footer/Footer';


const axios = require('axios');
const country = require('country-data').lookup




const fontTheme = createMuiTheme({
    typography: {
        // In Chinese and Japanese the characters are usually larger,
        // so a smaller fontsize may be appropriate.

        fontFamily: 'Roboto',
        fontSize: 11,

    },

});

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: '48px',
        zIndex: '5'
    },

    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    appbar: {
        fontFamily: 'roboto',
        fontSize: 20,
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
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '10px',
        marginRight: '10px',
    },
    list: {
        width: 250,
    },
    options: {
        fontFamily: 'Roboto',
        fontSize: 14,
    },
    fullList: {
        width: 'auto',
    },
    menuitem: {
        fontFamily: 'Kalam',
        fontSize: 11,
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

    const handleClick = (event) => {
        history.push("/");
    }



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
                    <AppBar style={{ background: '#282c34' }} className={classes.appbar} >
                        <Toolbar variant="dense">
                            <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <ArrowBackIosIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.appbar}>
                                Ciders
    </Typography>

                        </Toolbar>
                    </AppBar>
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
                    <Typography style={{ color: 'white', margin: "2px" }} variant="h6" >
                        {currentRows.length} ciders found
    </Typography>
                    {currentRows.map(function (row) {
                        return (<MenuItem key={row._id} properties={row} />)
                    })}
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
                        <ThemeProvider theme={fontTheme}>

                            <Grid item xs={1}>
                                <img className={classes.img} src={props.properties.image} alt="logo" width="35" height="35" />
                            </Grid>
                            <Grid item xs={9}>
                                <Typography style={{ marginLeft: "15px" }} variant="h6" display="block">
                                    {props.properties.title}
                                </Typography>

                                <Typography style={{ marginLeft: "15px" }} variant="subtitle1" display="inline">
                                    {props.properties.brewery}
                                </Typography>
                                <img style={{ marginLeft: "5px", marginBottom: "-1px", }} alt="Country" src={countryFlag} height="12" />
                                <Typography style={{ marginLeft: "15px" }} variant="subtitle2" display="block">
                                    {props.properties.type} - {props.properties.alcohol === 0.0 ? ("Alcohol Free") : (props.properties.alcohol + "%")}
                                </Typography>
                                <Box style={{ marginLeft: "15px" }} borderColor="transparent">
                                    <Rating name="read-only" value={props.properties.rating} precision={0.1} readOnly />
                                    <Typography className={classes.rating}>({props.properties.rating.toFixed(1)})</Typography>
                                </Box>
                                {/* <Rating name="read-onsly" value={props.properties.rating} readOnly display="block" /> */}
                            </Grid>
                            <Grid style={{ textAlign: "center" }} item xs={2} >
                                {props.properties.location.split('/').map(function (location) {
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
                                })}
                                
                                {/* <Rating name="read-onsly" value={props.properties.rating} readOnly display="block" /> */}
                            </Grid>

                            {showText ? (

                                <Typography display="inline" variant="body2">
                                    {props.properties.description}
                                    <Link color="inherit" onClick={handleTextButton}>
                                        [Show less]
                                     </Link>
                                </Typography>
                            ) : (<div>{(props.properties.description.length > 60) ? (<Typography display="inline" variant="body2">


                                {props.properties.description.substring(0, 60)}...  <Link color="inherit" onClick={handleTextButton}>
                                    [Show more]
                                     </Link></Typography>) : (<Typography display="inline" variant="body2">{props.properties.description}</Typography>)

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
                        </ThemeProvider>
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
