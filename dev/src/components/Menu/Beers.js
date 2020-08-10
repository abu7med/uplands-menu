
import React from 'react';
import { Container, Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Rating from '@material-ui/lab/Rating';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
// import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';

// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
// import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';

import CircularProgress from '@material-ui/core/CircularProgress';
import FilterListIcon from '@material-ui/icons/FilterList';
import Link from '@material-ui/core/Link';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './Menu.css';
import Footer from '../Footer/Footer';
import {PersonalAppBar, Background} from './menuUtils';


const axios = require('axios');
const country = require('country-data').lookup




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
        top: '40px',
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
        marginTop: '10px',
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
    document.body.style.background = Background
    document.body.style.backgroundSize = 'cover'
    document.title = "Svantes menu - Beers"
    const classes = useStyles();

    const [tapBeers, setTapBeers] = React.useState([]);
    const [paleAleBeers, setPaleAleBeers] = React.useState([]);
    const [lagerBeers, setLagerBeers] = React.useState([]);
    const [aleBeers, setAleBeers] = React.useState([]);
    const [stoutBeers, setStoutBeers] = React.useState([]);
    const [belgianBeers, setBelgianBeers] = React.useState([]);
    const [sourBeers, setSourBeers] = React.useState([]);
    const [otherBeers, setOtherBeers] = React.useState([]);
    const [alcoholFreeBeers, setAlcoholFreeBeers] = React.useState([]);
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

    const [value, setValue] = React.useState('title-ascending');
    const [searchValue, setSearchValue] = React.useState('');

    // const handleSortChange = (event) => {
    //     setValue(event.target.value);
    //     setCurrentRows(Sorter(event.target.value, currentRows))
    //     window.scrollTo(0, 0)
    // };

    const handleFilterChange = (event) => {

        setFilter({ ...filter, [event.target.name]: event.target.checked });
        let tempRows = [];
        let newRows = [];

        // let originalRows = [...rows];

        // let temparray = ({ ...filter, [event.target.name]: event.target.checked });
        // for (var key in temparray) {
        //     if (key === "checkedAlcoholFree" && temparray[key])
        //         tempRows = tempRows.concat(originalRows.filter(row => row.alcohol <= 2.25))
        //         originalRows = originalRows.filter(row => row.alcohol > 2.25)

        //     if (key === "checkedGlutenFree" && temparray[key])
        //         tempRows = tempRows.concat(rows.filter(row => originalRows.type.includes("Gluten-Free")))

        //     if (key === "checkedWheatBeer" && temparray[key])
        //         tempRows = tempRows.concat(rows.filter(row => (originalRows.type.includes("Wheat Beer")|| originalRows.type.includes("Hefeweizen"))))

        //     if (key === "checkedAle" && temparray[key])
        //         tempRows = tempRows.concat(rows.filter(row => (originalRows.type.includes("Ale") || originalRows.type.includes("Barleywine") || originalRows.type.includes("Strong Bitter"))))

        //     if (key === "checkedLager" && temparray[key])
        //         tempRows = tempRows.concat(rows.filter(row => (originalRows.type.includes("Lager") || originalRows.type.includes("Bock") || originalRows.type.includes("Pilsner"))))

        //     if (key === "checkedBelgian" && temparray[key])
        //         tempRows = tempRows.concat(rows.filter(row => (originalRows.type.includes("Belgian") || originalRows.type.includes("Lambic") || originalRows.type.includes("Flanders"))))

        //     if (key === "checkedSour" && temparray[key])
        //         tempRows = tempRows.concat(rows.filter(row => originalRows.type.includes("Sour")))

        //     if (key === "checkedIPA" && temparray[key])
        //         tempRows = tempRows.concat(rows.filter(row => (row.type.includes("IPA") || row.type.includes("Pale Ale"))))

        //     if (key === "checkedFruity" && temparray[key])
        //         tempRows = tempRows.concat(rows.filter(row => row.type.includes("Fruit")))

        //     if (key === "checkedStout" && temparray[key])
        //         tempRows = tempRows.concat(rows.filter(row => (row.type.includes("Stout") || row.type.includes("Porter"))))

        //     if (key === "checkedOther" && temparray[key])
        //         tempRows = tempRows.concat(rows.filter(row => row.type.includes("Rauchbier")))

        //     countries.filter(country => (key === "checked"+country && temparray[key])).map(filteredCountry => {
        //         tempRows = tempRows.concat(rows.filter(row => row.country.includes(filteredCountry))) }
        //     )
        // }
        let originalRows = [...rows];

        let temparray = ({ ...filter, [event.target.name]: event.target.checked });
        for (var key in temparray) {
            if (key === "checkedAlcoholFree" && temparray[key]) {
                tempRows = tempRows.concat(originalRows.filter(row => row.alcohol <= 2.25))
                originalRows = originalRows.filter(row => row.alcohol > 2.25)
            }
            if (key === "checkedGlutenFree" && temparray[key]) {
                tempRows = tempRows.concat(originalRows.filter(row => row.type.includes("Gluten-Free")))
                originalRows = originalRows.filter(row => !row.type.includes("Gluten-Free"))
            }

            if (key === "checkedWheatBeer" && temparray[key]) {
                tempRows = tempRows.concat(originalRows.filter(row => (row.type.includes("Wheat Beer") || row.type.includes("Hefeweizen"))))
                originalRows = originalRows.filter(row => (!row.type.includes("Wheat Beer") || !row.type.includes("Hefeweizen")))
            }
            if (key === "checkedAle" && temparray[key]) {
                tempRows = tempRows.concat(originalRows.filter(row => (row.type.includes("Ale") || row.type.includes("Barleywine") || row.type.includes("Strong Bitter"))))
                originalRows = originalRows.filter(row => (!row.type.includes("Ale") && !row.type.includes("Barleywine") && !row.type.includes("Strong Bitter")))
            }
            if (key === "checkedLager" && temparray[key]) {
                tempRows = tempRows.concat(originalRows.filter(row => (row.type.includes("Lager") || row.type.includes("Bock") || row.type.includes("Pilsner"))))
                originalRows = originalRows.filter(row => (!row.type.includes("Lager") || !row.type.includes("Bock") || !row.type.includes("Pilsner")))
            }
            if (key === "checkedBelgian" && temparray[key]) {
                tempRows = tempRows.concat(originalRows.filter(row => (row.type.includes("Belgian") || row.type.includes("Lambic") || row.type.includes("Flanders"))))
                originalRows = originalRows.filter(row => (!row.type.includes("Belgian") || !row.type.includes("Lambic") || !row.type.includes("Flanders")))
            }
            if (key === "checkedSour" && temparray[key]) {
                tempRows = tempRows.concat(originalRows.filter(row => row.type.includes("Sour")))
                originalRows = originalRows.filter(row => !row.type.includes("Sour"))
            }
            if (key === "checkedIPA" && temparray[key]) {
                tempRows = tempRows.concat(originalRows.filter(row => (row.type.includes("IPA") || row.type.includes("Pale Ale"))))
                originalRows = originalRows.filter(row => (!row.type.includes("IPA") || !row.type.includes("Pale Ale")))
            }

            if (key === "checkedFruity" && temparray[key]) {
                tempRows = tempRows.concat(originalRows.filter(row => row.type.includes("Fruit")))
                originalRows = originalRows.filter(row => !row.type.includes("Fruit"))
            }

            if (key === "checkedStout" && temparray[key]) {
                tempRows = tempRows.concat(originalRows.filter(row => (row.type.includes("Stout") || row.type.includes("Porter"))))
                originalRows = originalRows.filter(row => (!row.type.includes("Stout") || !row.type.includes("Porter")))
            }

            if (key === "checkedOther" && temparray[key]) {
                tempRows = tempRows.concat(originalRows.filter(row => row.type.includes("Rauchbier")))
                originalRows = originalRows.filter(row => !row.type.includes("Rauchbier"))

            }
            countries.filter(country => (key === "checked" + country && temparray[key])).map(filteredCountry => {
                tempRows = tempRows.concat(originalRows.filter(row => row.country.includes(filteredCountry)))
            }
            )
        }

        if (tempRows.length === 0) {
            tempRows = rows;
        }

        setFilteredRows(tempRows);
        tempRows.map(tempRow =>
            searchedRows.map(searchedRow => {
                if (tempRow._id === searchedRow._id) {
                    newRows.push(tempRow)
                }
            })

        )
        setCurrentRows(Sorter(value, newRows))
        let newtapBeers = []
        let newpaleAleBeers = []
        let newlagerBeers = []
        let newaleBeers = []
        let newstoutBeers = []
        let newbelgianBeers = []
        let newsourBeers = []
        let newotherBeers = []
        let newalcoholFreeBeers = []
        Sorter(value, newRows).map(item => {
            if (item.form === "Tap") {
                newtapBeers.push(item);
            }
            else if (item.alcohol <= 2.25) {
                newalcoholFreeBeers.push(item);
            }
            else if (item.type.includes("Pale Ale") || item.type.includes("IPA")) {
                newpaleAleBeers.push(item);
            }
            else if (item.type.includes("Lager") || item.type.includes("Bock") || item.type.includes("Pilsner")) {
                newlagerBeers.push(item);
            }
            else if (item.type.includes("Stout") || item.type.includes("Porter")) {
                newstoutBeers.push(item);
            }
            else if (item.type.includes("Sour")) {
                newsourBeers.push(item);
            }
            else if (item.type.includes("Belgian") || item.type.includes("Lambic") || item.type.includes("Flanders")) {
                newbelgianBeers.push(item);
            }
            else if (item.type.includes("Ale") || item.type.includes("Barleywine") || item.type.includes("Strong Bitter")) {
                newaleBeers.push(item);
            }
            else {
                newotherBeers.push(item);
            }
        })

        setTapBeers(newtapBeers)
        setPaleAleBeers(newpaleAleBeers)
        setLagerBeers(newlagerBeers)
        setAleBeers(newaleBeers)
        setStoutBeers(newstoutBeers)
        setBelgianBeers(newbelgianBeers)
        setSourBeers(newsourBeers)
        setOtherBeers(newotherBeers)
        setAlcoholFreeBeers(newalcoholFreeBeers)
        window.scrollTo(0, 0)

    };
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value.toLowerCase())
        let tempRows = [...rows]
        let newRows = []
        let newtapBeers = []
        let newpaleAleBeers = []
        let newlagerBeers = []
        let newaleBeers = []
        let newstoutBeers = []
        let newbelgianBeers = []
        let newsourBeers = []
        let newotherBeers = []
        let newalcoholFreeBeers = []
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
        Sorter(value, newRows).map(item => {
            if (item.form === "Tap") {
                newtapBeers.push(item);
            }
            else if (item.alcohol <= 2.25) {
                newalcoholFreeBeers.push(item);
            }
            else if (item.type.includes("Pale Ale") || item.type.includes("IPA")) {
                newpaleAleBeers.push(item);
            }
            else if (item.type.includes("Lager") || item.type.includes("Bock") || item.type.includes("Pilsner")) {
                newlagerBeers.push(item);
            }
            else if (item.type.includes("Stout") || item.type.includes("Porter")) {
                newstoutBeers.push(item);
            }
            else if (item.type.includes("Sour")) {
                newsourBeers.push(item);
            }
            else if (item.type.includes("Belgian") || item.type.includes("Lambic") || item.type.includes("Flanders")) {
                newbelgianBeers.push(item);
            }
            else if (item.type.includes("Ale") || item.type.includes("Barleywine") || item.type.includes("Strong Bitter")) {
                newaleBeers.push(item);
            }
            else {
                newotherBeers.push(item);
            }
        })

        setTapBeers(newtapBeers)
        setPaleAleBeers(newpaleAleBeers)
        setLagerBeers(newlagerBeers)
        setAleBeers(newaleBeers)
        setStoutBeers(newstoutBeers)
        setBelgianBeers(newbelgianBeers)
        setSourBeers(newsourBeers)
        setOtherBeers(newotherBeers)
        setAlcoholFreeBeers(newalcoholFreeBeers)
        window.scrollTo(0, 0)

    };



    const toggleDrawer = (anchor, open) => (event) => {

        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });

    };
    React.useEffect(() => {
        axios.get("/api/get/beers")
            .then(function (response) {
                // handle success
                let importedRows = []
                let originalRows = []
                for (var prop in response.data) {
                    var item = response.data[prop];

                    importedRows.push(item);

                    if (!countries.includes(item.country)) {
                        countries.push(item.country);
                        filter["checked" + item.country] = false
                    }
                    if (item.form === "Tap") {
                        tapBeers.push(item);
                    }
                    else if (item.alcohol <= 2.25) {
                        alcoholFreeBeers.push(item);
                    }
                    else if (item.type.includes("Pale Ale") || item.type.includes("IPA")) {
                        paleAleBeers.push(item);
                    }
                    else if (item.type.includes("Lager") || item.type.includes("Bock") || item.type.includes("Pilsner")) {
                        lagerBeers.push(item);
                    }
                    else if (item.type.includes("Stout") || item.type.includes("Porter")) {
                        stoutBeers.push(item);
                    }
                    else if (item.type.includes("Sour")) {
                        sourBeers.push(item);
                    }
                    else if (item.type.includes("Belgian") || item.type.includes("Lambic") || item.type.includes("Flanders")) {
                        belgianBeers.push(item);
                    }
                    else if (item.type.includes("Ale") || item.type.includes("Barleywine") || item.type.includes("Strong Bitter")) {
                        aleBeers.push(item);
                    }
                    else {
                        otherBeers.push(item);
                    }

                }
                setTapBeers(Sorter(value, [...tapBeers]))
                setAlcoholFreeBeers(Sorter(value, [...alcoholFreeBeers]))
                setPaleAleBeers(Sorter(value, [...paleAleBeers]))
                setLagerBeers(Sorter(value, [...lagerBeers]))
                setStoutBeers(Sorter(value, [...stoutBeers]))
                setSourBeers(Sorter(value, [...sourBeers]))
                setAleBeers(Sorter(value, [...aleBeers]))
                setBelgianBeers(Sorter(value, [...belgianBeers]))
                setOtherBeers(Sorter(value, [...otherBeers]))


                setCountries(countries)
                setFilter(filter)
                setRows(importedRows)
                setSearchedRows([...importedRows])
                setFilteredRows([...importedRows])

                setCurrentRows(Sorter(value, [...importedRows]))
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
                    {/* <h6 style={{ margin: "6px", textAlign: "center", fontSize: "1.2em" }} >
                        Filter by
    </h6> */}
                    <h6 style={{ marginTop: "10px", marginBottom: "3px", fontSize: "1.1em" }}>Categories</h6>
                    <FormControlLabel
                        control={
                            <Checkbox style={{ margin: "0px", fontSize: '1em' }}
                                checked={filter.checkedAlcoholFree}
                                onChange={handleFilterChange}
                                name="checkedAlcoholFree"
                                color="primary"
                            />
                        }
                        label={"Alcohol Free (<2.25%) (" + rows.filter(row => row.alcohol <= 2.25).length + ")"}
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
                        label={"Gluten Free (" + rows.filter(row => row.type.includes("Gluten-Free")).length + ")"}
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
                        label={"Ale (" + rows.filter(row => (row.type.includes("Ale") || row.type.includes("Barleywine") || row.type.includes("Strong Bitter"))).length + ")"}
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
                        label={"Lager (" + rows.filter(row => (row.type.includes("Lager") || row.type.includes("Bock") || row.type.includes("Pilsner"))).length + ")"}
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
                        label={"Sour (" + rows.filter(row => row.type.includes("Sour")).length + ")"}
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
                        label={"Stout/Porter (" + rows.filter(row => (row.type.includes("Stout") || row.type.includes("Porter"))).length + ")"}
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
                        label={"Pale Ale (" + rows.filter(row => (row.type.includes("IPA") || row.type.includes("Pale Ale"))).length + ")"}
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
                        label={"Fruity (" + rows.filter(row => row.type.includes("Fruit")).length + ")"}
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
                        label={"Wheat Beer (" + rows.filter(row => (row.type.includes("Wheat Beer") || row.type.includes("Hefeweizen"))).length + ")"}
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
                        label={"Belgian (" + rows.filter(row => (row.type.includes("Belgian") || row.type.includes("Lambic") || row.type.includes("Flanders"))).length + ")"}
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
                        label={"Other (" + rows.filter(row => row.type.includes("Rauchbier")).length + ")"}
                    />

                    <h6 style={{ marginTop: "10px", marginBottom: "3px", fontSize: "1.1em" }}>Origins</h6>
                    {countries.map(function (country) {
                        return (<FormControlLabel
                            control={
                                <Checkbox
                                    checked={filter["checked" + country]}
                                    onChange={handleFilterChange}
                                    name={"checked" + country}
                                    color="primary"
                                />
                            }
                            label={country + " (" + rows.filter(row => row.country.includes(country)).length + ")"}
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
        <Container style={{ backgroundColor: '#282c34' }} disableGutters maxWidth="sm" >
            {loading ? (<div style={{ textAlign: 'center', margin: "2px" }}><CircularProgress /><Typography style={{ color: 'white', margin: "2px" }} variant="h6" >
                Loading beers
    </Typography></div>) : (<div>
  <PersonalAppBar
  category="Beers"
  />
                    <Grid className={classes.root} style={{ background: '#282c34' }} container >
                        <Grid item xs={9}  >
                            <Paper component="form" className={classes.root} style={{ zIndex: 24 }} >
                                <SearchIcon style={{ fontSize: 24 }} />
                                <InputBase style={{ zIndex: 24 }}
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


                            </Paper>
                        </Grid>
                        <Grid item xs={3}  >
                            <React.Fragment key="filter">
                                <Button fullWidth
                                style={{ zIndex: 24 }}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<FilterListIcon />}
                                    onClick={toggleDrawer("filter", true)}>Filter</Button>
                                <Drawer anchor="left" open={state["filter"]} onClose={toggleDrawer("filter", false)}>
                                    {filterList("left")}
                                </Drawer>
                            </React.Fragment>
                        </Grid>
                    </Grid>

                    <Divider />
                    <h4 style={{ color: 'white', margin: "5px" }} >
                        {currentRows.length} beers found
    </h4>
                    {tapBeers.length > 0 ? <h6 id="tap-beers" style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                        {/* {currentRows.filter(row => row.form === "Tap").length} on tap: */}
                        On tap:
    </h6> : null}
                    {/* {currentRows.filter(row => row.form === "Tap")
                    .map(function (row) {
                        return (<MenuItem key={row._id} properties={row} />)
                    })} */}
                    {tapBeers.map(function (row) {
                        return (<MenuItem key={row._id} properties={row} />)
                    })}

                    {paleAleBeers.length > 0 ? <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                        On bottle, Pale Ale:
    </h6> : null}
                    {paleAleBeers.map(function (row) {
                        return (<MenuItem key={row._id} properties={row} />)
                    })}
                    {lagerBeers.length > 0 ? <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                        On bottle, Lager:
    </h6> : null}
                    {lagerBeers.map(function (row) {
                        return (<MenuItem key={row._id} properties={row} />)
                    })}
                    {stoutBeers.length > 0 ? <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                        On bottle, Stout:
    </h6> : null}
                    {stoutBeers.map(function (row) {
                        return (<MenuItem key={row._id} properties={row} />)
                    })}
                    {sourBeers.length > 0 ? <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                        On bottle, Sour:
    </h6> : null}
                    {sourBeers.map(function (row) {
                        return (<MenuItem key={row._id} properties={row} />)
                    })}
                    {aleBeers.length > 0 ? <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                        On bottle, Ale:
    </h6> : null}
                    {aleBeers.map(function (row) {
                        return (<MenuItem key={row._id} properties={row} />)
                    })}
                    {belgianBeers.length > 0 ? <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                        On bottle, Belgian:
    </h6> : null}
                    {belgianBeers.map(function (row) {
                        return (<MenuItem key={row._id} properties={row} />)
                    })}
                    {otherBeers.length > 0 ? <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                        On bottle, Other:
    </h6> : null}
                    {otherBeers.map(function (row) {
                        return (<MenuItem key={row._id} properties={row} />)
                    })}
                    {alcoholFreeBeers.length > 0 ? <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                        On bottle, Alcohol Free:
    </h6> : null}
                    {alcoholFreeBeers.map(function (row) {
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
    const theme = useTheme();

    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const xs = useMediaQuery(theme.breakpoints.up('xs'));
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
            setFlag('../../images/flags/' + country.countries({ name: props.properties.country })[0].alpha2.toLowerCase() + ".png")

    }, [props.properties.country]);

    return (
        <div>


            <Card className={classes.card}>
                <div className={classes.content}>
                    <Grid container >
                        {/* <ThemeProvider theme={fontTheme}> */}

                        <Grid item xs={1} style={{ textAlign: "right" }} >
                            <img  className={classes.img} src={props.properties.image} alt="logo" width="35" height="35" />
                        </Grid>
                        <Grid item xs={9} >
                            <h6 style={{ marginLeft: "15px", fontSize: "1em" }} display="block">
                                {props.properties.title}
                            </h6>
                            <p style={{ marginLeft: "15px", fontSize: "0.9em" }} display="inline">
                                {props.properties.brewery} <img style={{ marginLeft: "3px", marginBottom: "-1px" }} alt={props.properties.country} src={countryFlag} height="12" />
                            </p>
                            <p style={{ marginLeft: "15px", fontSize: "0.8em" }} display="block">
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
                        <Grid style={{ textAlign: "center" }} item xs={2} >
                            {props.properties.size != null ? (props.properties.size.split(',').map(function (size) {
                                return (<p style={{ fontSize: "0.8em" }} display="block">
                                    {size} ml
                                </p>)
                            })) : null}


                            {/* <Divider style={{ background: "white", marginTop: "2px", marginBottom: "2px" }} variant='middle'/> */}
                            <h6 style={{ fontSize: "0.8em" }} display="block">
                                {props.properties.location === "Inside/Outside" ? ("Both bars") : (props.properties.location + " bar")}
                            </h6>

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


                           {sm ? (props.properties.description.substring(0, 90) + '...') : null}  
                           {xs && !sm ? (props.properties.description.substring(0, 50) + '...') : null} 
                           <Link color="inherit" onClick={handleTextButton}>
                                [Show more] 
                                     </Link>
                                     
                                     
                                     </p>) : (<p style={{ fontSize: "0.7em" }} >{props.properties.description}</p>)

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

