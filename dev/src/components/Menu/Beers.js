
import React from 'react';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Popover from '@material-ui/core/Popover';
import { useHistory } from "react-router-dom";
import './Menu.css';
import Footer from '../Footer/Footer';


const axios = require('axios');
const country        = require('country-data').lookup




// const fontTheme = createMuiTheme({
//     typography: {
//         // In Chinese and Japanese the characters are usually larger,
//         // so a smaller fontsize may be appropriate.

//         fontFamily: 'Roboto',
//         fontSize: 11,

//     },

// });
// const defaultTheme = createMuiTheme({
//     typography: {
//         // In Chinese and Japanese the characters are usually larger,
//         // so a smaller fontsize may be appropriate.

//         fontFamily: 'Roboto',
//         fontSize: 14,

//     },

// });
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
        position: 'sticky',

        flexGrow: 1,
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
    // rating: {

    //     display: "inline",
    //     position: 'relative',
    //     top: '-4px',

    // },
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
    // if (sortVariable === "brewery-ascending") {
    //     array = array.sort(function (a, b) {
    //         a = a.brewery.toLowerCase();
    //         b = b.brewery.toLowerCase();

    //         return a < b ? -1 : a > b ? 1 : 0;
    //     });
    //     return array
    // }
    // if (sortVariable === "brewery-descending") {
    //     array = array.sort(function (a, b) {
    //         a = a.brewery.toLowerCase();
    //         b = b.brewery.toLowerCase();

    //         return b < a ? -1 : b > a ? 1 : 0;
    //     });
    //     return array
    // }
    // if (sortVariable === "alcohol-descending") {
    //     array = array.sort((c1, c2) => c2.alcohol - c1.alcohol)
    //     return array
    // }
    // if (sortVariable === "alcohol-ascending") {
    //     array = array.sort((c1, c2) => c1.alcohol - c2.alcohol)
    //     return array
    // }
    // if (sortVariable === "rating-descending") {
    //     array = array.sort((c1, c2) => c2.rating - c1.rating)
    //     return array
    // }
    // if (sortVariable === "rating-ascending") {
    //     array = array.sort((c1, c2) => c1.rating - c2.rating)
    //     return array
    // }
    // if (sortVariable === "ibu-descending") {
    //     array = array.sort((c1, c2) => c2.ibu - c1.ibu)
    //     return array
    // }
    // if (sortVariable === "ibu-ascending") {
    //     array = array.sort((c1, c2) => c1.ibu - c2.ibu)
    //     return array
    // }

}

export default function Beers() {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const [countries, setCountries] = React.useState([]);
    const [filteredRows, setFilteredRows] = React.useState([]);
    const [searchedRows, setSearchedRows] = React.useState([]);
    const [currentRows, setCurrentRows] = React.useState([]);
    const [state, setState] = React.useState({
        sort: false,
        filter: false
    });
    const [filter, setFilter] = React.useState({
        checkedAlcoholFree: false,
        checkedGlutenFree: false,
        checkedAle: false,
        checkedLager: false,
        checkedWheatBeer: false,
        checkedSour: false,
        checkedStout: false,
        checkedFruity: false,
        checkedIPA: false,
        checkedBelgian: false,
        checkedPorter: false,
        checkedOther: false,
    });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = React.useState('title-ascending');
    const [searchValue, setSearchValue] = React.useState('');

    // const handleSortChange = (event) => {
    //     setValue(event.target.value);
    //     setCurrentRows(Sorter(event.target.value, currentRows))
    //     window.scrollTo(0, 0)
    // };
    const handleClickClock = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleCloseClock = () => {
        setAnchorEl(null);
      };
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;
    const handleFilterChange = (event) => {

        setFilter({ ...filter, [event.target.name]: event.target.checked });
        let tempRows = [];
        let newRows = [];

        let temparray = ({ ...filter, [event.target.name]: event.target.checked });
        for (var key in temparray) {
            if (key === "checkedAlcoholFree" && temparray[key])
                tempRows = tempRows.concat(rows.filter(row => row.alcohol <= 2.25))

            if (key === "checkedGlutenFree" && temparray[key])
                tempRows = tempRows.concat(rows.filter(row => row.type.includes("Gluten-Free")))

            if (key === "checkedWheatBeer" && temparray[key])
                tempRows = tempRows.concat(rows.filter(row => (row.type.includes("Wheat Beer")|| row.type.includes("Hefeweizen"))))

            if (key === "checkedAle" && temparray[key])
                tempRows = tempRows.concat(rows.filter(row => (row.type.includes("Ale") || row.type.includes("Barleywine") || row.type.includes("Strong Bitter"))))

            if (key === "checkedLager" && temparray[key])
                tempRows = tempRows.concat(rows.filter(row => (row.type.includes("Lager") || row.type.includes("Bock") || row.type.includes("Pilsner"))))

            if (key === "checkedBelgian" && temparray[key])
                tempRows = tempRows.concat(rows.filter(row => (row.type.includes("Belgian") || row.type.includes("Lambic") || row.type.includes("Flanders"))))

            if (key === "checkedSour" && temparray[key])
                tempRows = tempRows.concat(rows.filter(row => row.type.includes("Sour")))

            if (key === "checkedIPA" && temparray[key])
                tempRows = tempRows.concat(rows.filter(row => (row.type.includes("IPA") || row.type.includes("Pale Ale"))))

            if (key === "checkedFruity" && temparray[key])
                tempRows = tempRows.concat(rows.filter(row => row.type.includes("Fruit")))

            if (key === "checkedStout" && temparray[key])
                tempRows = tempRows.concat(rows.filter(row => (row.type.includes("Stout") || row.type.includes("Porter"))))

            if (key === "checkedOther" && temparray[key])
                tempRows = tempRows.concat(rows.filter(row => row.type.includes("Rauchbier")))

            countries.filter(country => (key === "checked"+country && temparray[key])).map(filteredCountry => {
                tempRows = tempRows.concat(rows.filter(row => row.country.includes(filteredCountry))) }
            )
        }

        if (tempRows.length === 0)
            tempRows = rows;

        setFilteredRows(tempRows);
        tempRows.map(tempRow =>
            searchedRows.map(searchedRow => {
                if (tempRow._id === searchedRow._id) {
                    newRows.push(tempRow)
                }
            })

        )
        setCurrentRows(Sorter(value, newRows))
        window.scrollTo(0, 0)

    };
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value.toLowerCase())
        let tempRows = [...rows]
        let newRows = []
        tempRows = rows.filter(row => (row.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
            row.brewery.toLowerCase().includes(event.target.value.toLowerCase())))
        setSearchedRows(tempRows);
        tempRows.map(tempRow =>
            filteredRows.map(filteredRow => {
                if (tempRow._id === filteredRow._id) {
                    newRows.push(tempRow)
                }
            })

        )
        setCurrentRows(Sorter(value, newRows))
        window.scrollTo(0, 0)

    };
    const handleClick = (event) => {
        history.push("/");
    }


    const toggleDrawer = (anchor, open) => (event) => {

        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });

    };
    React.useEffect(() => {
        console.log("c")
        axios.get("/api/get/beers")
            .then(function (response) {
                // handle success
                let importedRows = []

                for (var prop in response.data) {
                    var item = response.data[prop];

                    importedRows.push(item);

                    if (!countries.includes(item.country)){
                    countries.push(item.country);
                    filter["checked"+item.country] = false
                    }

                }
                setCountries(countries)
                setFilter(filter)
                console.log("a")
                setRows(importedRows)
                setSearchedRows([...importedRows])
                setFilteredRows([...importedRows])

                setCurrentRows(Sorter(value, [...importedRows]))
                console.log("d")
                setLoading(false)
                console.log("b")

            })
            .catch(function (error) {
                // handle error
                console.log(error);

            })
            .then(function () {


                // always executed
            })
    }, []);

    // const sortList = (anchor) => (
    //     <Container maxWidth="xs">
    //         <div
    //             className={clsx(classes.list, {
    //                 [classes.fullList]: anchor === 'top' || anchor === 'bottom',
    //             })}
    //             role="presentation"
    //             onClick={toggleDrawer(anchor, false)}
    //             onKeyDown={toggleDrawer(anchor, false)}
    //         >

    //             <FormControl component="fieldset">
    //                 <FormLabel className={classes.label} component="legend">Sort by</FormLabel>
    //                 <RadioGroup aria-label="sortVariables" name="sortVariables" value={value} onChange={handleSortChange}>
    //                     <FormControlLabel value="title-ascending" control={<Radio />} label="Title, A-Z" />
    //                     <FormControlLabel value="title-descending" control={<Radio />} label="Title, Z-A" />
    //                     <FormControlLabel value="brewery-ascending" control={<Radio />} label="Brewery, A-Z" />
    //                     <FormControlLabel value="brewery-descending" control={<Radio />} label="Brewery, Z-A" />
    //                     <FormControlLabel value="alcohol-ascending" control={<Radio />} label="Alcohol rate, Ascending" />
    //                     <FormControlLabel value="alcohol-descending" control={<Radio />} label="Alcohol rate, Descending" />
    //                     <FormControlLabel value="rating-ascending" control={<Radio />} label="Untappd rating, Ascending" />
    //                     <FormControlLabel value="rating-descending" control={<Radio />} label="Untappd rating, Descending" />
    //                     <FormControlLabel value="ibu-ascending" control={<Radio />} label="IBU, Ascending" />
    //                     <FormControlLabel value="ibu-descending" control={<Radio />} label="IBU, Descending" />
    //                 </RadioGroup>
    //             </FormControl>
    //         </div>
    //     </Container>


    // );

    const filterList = (anchor) => (

        <Container maxWidth="xs">
            <div
                className={clsx(classes.list, {
                    [classes.fullList]: anchor === 'top' || anchor === 'bottom',
                })}
                role="presentation"
                onClick={toggleDrawer("filter", true)}
                onKeyDown={toggleDrawer("filter", true)}
            >
                <FormGroup >
                    <FormLabel className={classes.label} component="legend">Filter by</FormLabel>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filter.checkedAlcoholFree}
                                onChange={handleFilterChange}
                                name="checkedAlcoholFree"
                                color="primary"
                            />
                        }
                        label={"Alcohol Free (<2.25%) (" + currentRows.filter(row => row.alcohol <= 2.25).length + ")"}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filter.checkedGlutenFree}
                                onChange={handleFilterChange}
                                name="checkedGlutenFree"
                                color="primary"
                            />
                        }
                        label={"Gluten Free (" + currentRows.filter(row => row.type.includes("Gluten-Free")).length + ")"}
                    />
                    <Divider />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filter.checkedAle}
                                onChange={handleFilterChange}
                                name="checkedAle"
                                color="primary"
                            />
                        }
                        label={"Ale (" + currentRows.filter(row => (row.type.includes("Ale") || row.type.includes("Barleywine") || row.type.includes("Strong Bitter"))).length + ")"}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filter.checkedLager}
                                onChange={handleFilterChange}
                                name="checkedLager"
                                color="primary"
                            />
                        }
                        label={"Lager (" + currentRows.filter(row => (row.type.includes("Lager") || row.type.includes("Bock") || row.type.includes("Pilsner"))).length + ")"}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filter.checkedSour}
                                onChange={handleFilterChange}
                                name="checkedSour"
                                color="primary"
                            />
                        }
                        label={"Sour (" + currentRows.filter(row => row.type.includes("Sour")).length + ")"}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filter.checkedStout}
                                onChange={handleFilterChange}
                                name="checkedStout"
                                color="primary"
                            />
                        }
                        label={"Stout/Porter (" + currentRows.filter(row => (row.type.includes("Stout") || row.type.includes("Porter"))).length + ")"}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filter.checkedIPA}
                                onChange={handleFilterChange}
                                name="checkedIPA"
                                color="primary"
                            />
                        }
                        label={"Pale Ale (" + currentRows.filter(row => (row.type.includes("IPA") || row.type.includes("Pale Ale"))).length + ")"}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filter.checkedFruity}
                                onChange={handleFilterChange}
                                name="checkedFruity"
                                color="primary"
                            />
                        }
                        label={"Fruity (" + currentRows.filter(row => row.type.includes("Fruit")).length + ")"}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filter.checkedWheatBeer}
                                onChange={handleFilterChange}
                                name="checkedWheatBeer"
                                color="primary"
                            />
                        }
                        label={"Wheat Beer (" + currentRows.filter(row => (row.type.includes("Wheat Beer")|| row.type.includes("Hefeweizen"))).length + ")"}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filter.checkedBelgian}
                                onChange={handleFilterChange}
                                name="checkedBelgian"
                                color="primary"
                            />
                        }
                        label={"Belgian (" + currentRows.filter(row => (row.type.includes("Belgian") || row.type.includes("Lambic") || row.type.includes("Flanders"))).length + ")"}
                    />
                                        <FormControlLabel
                        control={
                            <Checkbox
                                checked={filter.checkedOther}
                                onChange={handleFilterChange}
                                name="checkedOther"
                                color="primary"
                            />
                        }
                        label={"Other (" + currentRows.filter(row => row.type.includes("Rauchbier")).length + ")"}
                    />

                    <FormLabel className={classes.label} component="legend">Origins</FormLabel>
{countries.map(function (country) {
                        return (<FormControlLabel
                            control={
                                <Checkbox
                                    checked={filter["checked"+country]}
                                    onChange={handleFilterChange}
                                    name={"checked"+country}
                                    color="primary"
                                />
                            }
                            label={country + " ("+rows.filter(row => row.country.includes(country)).length + ")"}
                        />)
                    })}
                    {/* <FormLabel className={classes.label} component="legend">Breweries</FormLabel>
{breweries.map(function (brewery) {
                        return (<FormControlLabel
                            control={
                                <Checkbox

                                    onChange={handleFilterChange}
                                    name={"checked"+brewery}
                                    color="primary"
                                />
                            }
                            label={brewery}
                        />)
                    })} */}

                </FormGroup>
            </div>
        </Container>


    );

    return (
        <Container style={{ backgroundColor: '#282c34'}} disableGutters maxWidth="xs" >
            {loading ? (<div style={{ textAlign: 'center', margin: "2px" }}><CircularProgress /><Typography style={{ color: 'white', margin: "2px" }} variant="h6" >
                Loading beers
    </Typography></div>) : (<div>
                    <AppBar style={{ background: '#282c34' }} className={classes.appbar} >
                        <Toolbar variant="dense">
                            <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <ArrowBackIosIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.appbar}>
                                Beers
    </Typography>
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
        <p style={{ textAlign: "center", paddingTop: "4px", paddingBottom: "10px" , paddingLeft: "10px", paddingRight: "10px"}} >Last order 30 min before closing!</p>
      </Popover>
                        </Toolbar>
                    </AppBar>
                    <Paper component="form" className={classes.root}>
                        <SearchIcon style={{ fontSize: 24 }} />
                        <InputBase
                            className={classes.input}
                            placeholder="Search Beers and Breweries..."
                            onChange={handleSearchChange}
                            value={searchValue}
                        />

                        {/* <React.Fragment key="sort">
                            <Button onClick={toggleDrawer("sort", true)}>Sort</Button>
                            <Drawer anchor="left" open={state["sort"]} onClose={toggleDrawer("sort", false)}>
                                {sortList("left")}
                            </Drawer>
                        </React.Fragment> */}
                        <React.Fragment key="filter">
                            <Button onClick={toggleDrawer("filter", true)}>Filter</Button>
                            <Drawer anchor="left" open={state["filter"]} onClose={toggleDrawer("filter", false)}>
                                {filterList("left")}
                            </Drawer>
                        </React.Fragment>

                    </Paper>

                    <Divider />
                    <h4 style={{ color: 'white', margin: "5px" }} >
                        {currentRows.length} beers found
    </h4>
    <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                        On tap
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
        if (props.properties.country === "England")
        setFlag("../../images/flags/gb-eng.png")
        else if (props.properties.country === "Scotland")
        setFlag("../../images/flags/gb-sct.png")
        else if (props.properties.country === "Northern Ireland")
        setFlag("../../images/flags/gb-nir.png")
        else if (props.properties.country === "Wales")
        setFlag("../../images/flags/gb-wls.png")
        else if (props.properties.country.length > 0)
        setFlag('../../images/flags/' + country.countries({name: props.properties.country})[0].alpha2.toLowerCase() + ".png")

      }, [props.properties.country]);

    return (
        <div>


            <Card className={classes.card}>
                <div className={classes.content}>
                    <Grid container >
                        {/* <ThemeProvider theme={fontTheme}> */}

                            <Grid item xs={1}  >
                                <img className={classes.img} src={props.properties.image} alt="logo" width="35" height="35" />
                            </Grid>
                            <Grid item xs={9} >
                                <h6 style={{ marginLeft: "15px", fontSize: "1em"}} display="block">
                                    {props.properties.title}
                                </h6>
                                <p style={{ marginLeft: "15px", fontSize: "0.9em"}} display="inline">
                                {props.properties.brewery} <img style={{ marginLeft: "5px", marginBottom: "-1px"  }} alt="Country" src={countryFlag} height="12" />
                                </p>
                                <p style={{ marginLeft: "15px", fontSize: "0.8em"}} display="block">
                                {props.properties.type} - {props.properties.alcohol === 0.0 ? ("Alcohol Free") : (props.properties.alcohol + "%")} - {props.properties.ibu === 0 ? ("No IBU") : (props.properties.ibu + " IBU")}
                                </p>
                                {/* <Typography style={{ marginLeft: "15px" }} variant="subtitle2" >
                                    {props.properties.type} - {props.properties.alcohol === 0.0 ? ("Alcohol Free") : (props.properties.alcohol + "%")} - {props.properties.ibu === 0 ? ("No IBU") : (props.properties.ibu + " IBU")}
                                </Typography> */}
                                {/* <Box style={{ marginLeft: "15px" }} display="inline" borderColor="transparent">
                                    <Rating name="read-only" value={props.properties.rating} precision={0.1} readOnly />
                                    <Typography className={classes.rating}>({props.properties.rating.toFixed(1)})</Typography>
                                </Box> */}
                                {/* <Typography variant="body1" display="block">
                                    {props.properties.location} bar: {props.properties.form}
                                </Typography> */}
                                {/* <Rating name="read-onsly" value={props.properties.rating} readOnly display="block" /> */}
                            </Grid>
                            <Grid style={{ textAlign: "center"  }} item xs={2} >
                            {props.properties.size.split(',').map(function (size) {
                                    return (<p style={{ fontSize: "0.8em"}} display="block">
                                    {size} ml
                                </p>)
                                })}
                            

                                {/* <Divider style={{ background: "white", marginTop: "2px", marginBottom: "2px" }} variant='middle'/> */}
                                <h6 style={{ fontSize: "0.8em"}} display="block">
                                    {props.properties.location === "Inside/Outside" ? ("Both bars") : (props.properties.location + " bar")}
                                </h6>
                            
                                {/* <Rating name="read-onsly" value={props.properties.rating} readOnly display="block" /> */}
                            </Grid>

                                {showText ? (

                                    <p style={{ fontSize: "0.7em"}}>
                                        {props.properties.description}
                                        <Link  color="inherit" onClick={handleTextButton}>
                                            [Show less]
                                     </Link>
                                    </p>
                                ) : (<div>{(props.properties.description.length > 60) ? (<p  style={{ fontSize: "0.7em"}} >


                                        {props.properties.description.substring(0, 60)}...  <Link color="inherit" onClick={handleTextButton}>
                                            [Show more]
                                     </Link></p>) : (<p style={{ fontSize: "0.7em"}} >{props.properties.description}</p>)

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
                        {/* </ThemeProvider> */}
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
