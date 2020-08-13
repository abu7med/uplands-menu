
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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Skeleton from '@material-ui/lab/Skeleton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Popover from '@material-ui/core/Popover';

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
import MenuItem from '@material-ui/core/MenuItem';

import './Menu.css';
import Footer from '../Footer/Footer';
import { PersonalAppBar, Background, checkImageExists, Sorter } from './menuUtils';
import { AdminContext } from '../Admin/Admin';
import { useHistory } from "react-router-dom";



const axios = require('axios');
const country = require('country-data').lookup
const moment = require('moment')




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


export default function Beers(props) {
    //admin stuff
    const [searchString, setSearchString] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [itemURL, setItemURL] = React.useState("");
    const [itemID, setItemID] = React.useState();
    const [itemTitle, setItemTitle] = React.useState("");
    const [itemStock, setItemStock] = React.useState(true);
    const [itemNew, setItemNew] = React.useState(false);
    const [itemBrewery, setItemBrewery] = React.useState("");
    const [itemDescription, setItemDescription] = React.useState("");
    const [itemType, setItemType] = React.useState("");
    const [itemRating, setItemRating] = React.useState("");
    const [itemPrice, setItemPrice] = React.useState("");
    const [itemAlcohol, setItemAlcohol] = React.useState("");
    const [itemIBU, setItemIBU] = React.useState("");
    const [itemImage, setItemImage] = React.useState("");
    const [itemForm, setItemForm] = React.useState("Bottle");
    const [itemSize, setItemSize] = React.useState("");
    const [itemCountry, setItemCountry] = React.useState("");
    const [itemLocation, setItemLocation] = React.useState("Inside");
    const [imageExists, setItemImageExists] = React.useState(false);
    const [createWindow, setCreateWindow] = React.useState(false);
    const [editWindow, setEditWindow] = React.useState(false);
    //
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
    const [wheatBeers, setWheatBeers] = React.useState([]);
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
        checkedVegan: false,
        checkedNew: false,
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
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleSearchOpen = (event) => {
        setAnchorEl(event.currentTarget);
        axios.get("https://api.untappd.com/v4/search/beer?client_id=00C637D891758676D4988D6A67AB581C07F2B2AF&client_secret=453BE6625A63443A627189178B9DC6E4265C2B47&limit=6&q=" + searchString)
        .then(function (response) {
            setSearchResults(response.data.response.beers.items)
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    };
    // const handleImportInfo = () => {
    //     // const proxyurl = "https://cors-anywhere.herokuapp.com/";

    //     const untappdID = itemURL.substring(itemURL.lastIndexOf('/') + 1)

    //     axios.get("https://api.untappd.com/v4/beer/info/" + untappdID + "?client_id=00C637D891758676D4988D6A67AB581C07F2B2AF&client_secret=453BE6625A63443A627189178B9DC6E4265C2B47&compact=true")
    //         .then(function (response) {
    //             // handle success

    //             setItemTitle(response.data.response.beer.beer_name);
    //             setItemBrewery(response.data.response.beer.brewery.brewery_name);
    //             setItemType(response.data.response.beer.beer_style);
    //             setItemAlcohol(response.data.response.beer.beer_abv);
    //             setItemIBU(response.data.response.beer.beer_ibu);
    //             setItemRating(response.data.response.beer.weighted_rating_score);
    //             setItemDescription(response.data.response.beer.beer_description);
    //             setItemImage(response.data.response.beer.beer_label);
    //             setItemCountry(response.data.response.beer.brewery.country_name);
    //             checkImageExists(response.data.response.beer.beer_label, function (existsImage) {
    //                 if (existsImage === true) {
    //                     setItemImageExists(true)
    //                 }
    //                 else {
    //                     setItemImageExists(false)
    //                 }
    //             });
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         })
    //         .then(function () {
    //             // always executed
    //         });



    // };

    const handleSearchClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    //admin stuff
    const makeCreateWindowVisible = () => {
        setCreateWindow(true);
    };
    const makeEditWindowVisible = (item) => {
        if (item._id != null)
            setItemID(item._id)
        if (item.untappd != null)
            setItemURL(item.untappd)
        if (item.title != null)
            setItemTitle(item.title)
        if (item.brewery != null)
            setItemBrewery(item.brewery)
        if (item.description != null)
            setItemDescription(item.description)
        if (item.type != null)
            setItemType(item.type)
        if (item.stock != null)
            setItemStock(item.stock)
        if (item.new != null)
            setItemNew(item.new)
        if (item.rating != null)
            setItemRating(item.rating)
        if (item.country != null)
            setItemCountry(item.country)
        if (item.price != null)
            setItemPrice(item.price)
        if (item.alcohol != null)
            setItemAlcohol(item.alcohol)
        if (item.ibu != null)
            setItemIBU(item.ibu)
        if (item.form != null)
            setItemForm(item.form)
        if (item.location != null)
            setItemLocation(item.location)
        if (item.size != null)
            setItemSize(item.size)
        if (item.image != null)
            setItemImage(item.image)
        checkImageExists(item.image, function (existsImage) {
            if (existsImage === true) {
                setItemImageExists(true)
            }
            else {
                setItemImageExists(false)
            }
        });
        setEditWindow(true);
    };
    const handleCloseWindow = () => {
        setItemURL("")
        setSearchString("")
        setItemTitle("")
        setItemBrewery("")
        setItemDescription("")
        setItemType("")
        setItemRating("")
        setItemPrice("")
        setItemCountry("")
        setItemAlcohol("")
        setItemIBU("")
        setItemImage("")
        setItemForm("Bottle")
        setItemSize("")
        setItemLocation("Inside")
        setItemImageExists(false)
        setCreateWindow(false)
        setEditWindow(false)
    };
    const handleCreateItem = () => {
        let object = {
            beerTitle: itemTitle,
            beerBrewery: itemBrewery,
            beerDescription: itemDescription,
            beerType: itemType,
            beerStock: itemStock,
            beerNew: itemNew,
            beerRating: itemRating,
            beerPrice: itemPrice,
            beerCountry: itemCountry,
            beerAlcohol: itemAlcohol,
            beerIBU: itemIBU,
            beerImage: itemImage,
            beerForm: itemForm,
            beerLocation: itemLocation,
            beerSize: itemSize,
            beerUntappd: itemURL
        }
        axios.post('/api/add/beers', object)
            .then(function (response) {
                let item = response.data
                rows.push(item);
                setRows([...rows])
                currentRows.push(item);
                setCurrentRows([...currentRows])

                if (!countries.includes(item.country)) {
                    countries.push(item.country);
                    filter["checked" + item.country] = false
                    setCountries(countries)
                    setFilter(filter)
                }
                if (item.form === "Tap") {
                    tapBeers.push(item);
                    setTapBeers(Sorter(value, [...tapBeers]))
                }
                else if (item.alcohol <= 2.25) {
                    alcoholFreeBeers.push(item);
                    setAlcoholFreeBeers(Sorter(value, [...alcoholFreeBeers]))
                }
                else if (item.type.includes("Pale Ale") || item.type.includes("IPA")) {
                    paleAleBeers.push(item);
                    setPaleAleBeers(Sorter(value, [...paleAleBeers]))
                }
                else if (item.type.includes("Lager") || item.type.includes("Bock") || item.type.includes("Pilsner")) {
                    lagerBeers.push(item);
                    setLagerBeers(Sorter(value, [...lagerBeers]))
                }
                else if (item.type.includes("Stout") || item.type.includes("Porter")) {
                    stoutBeers.push(item);
                    setStoutBeers(Sorter(value, [...stoutBeers]))
                }
                else if (item.type.includes("Sour")) {
                    sourBeers.push(item);
                    setSourBeers(Sorter(value, [...sourBeers]))
                }
                else if (item.type.includes("Belgian") || item.type.includes("Lambic") || item.type.includes("Flanders")) {
                    belgianBeers.push(item);
                    setBelgianBeers(Sorter(value, [...belgianBeers]))
                }
                else if (item.type.includes("Wheat Beer") || item.type.includes("Hefeweizen")) {
                    wheatBeers.push(item);
                    setWheatBeers(Sorter(value, [...wheatBeers]))
                }
                else if (item.type.includes("Ale") || item.type.includes("Barleywine") || item.type.includes("Strong Bitter")) {
                    aleBeers.push(item);
                    setAleBeers(Sorter(value, [...aleBeers]))
                }
                else {
                    otherBeers.push(item);
                    setOtherBeers(Sorter(value, [...otherBeers]))
                }

            })
            .catch(function (error) {
                console.log(error);
            });
        handleCloseWindow()

    };


    const handleEditItem = () => {
        let item = {
            beerID: itemID,
            beerTitle: itemTitle,
            beerBrewery: itemBrewery,
            beerDescription: itemDescription,
            beerType: itemType,
            beerStock: itemStock,
            beerNew: itemNew,
            beerRating: itemRating,
            beerPrice: itemPrice,
            beerCountry: itemCountry,
            beerAlcohol: itemAlcohol,
            beerIBU: itemIBU,
            beerImage: itemImage,
            beerForm: itemForm,
            beerLocation: itemLocation,
            beerSize: itemSize,
            beerUntappd: itemURL
        }
        axios.post('/api/edit/beers', item)
            .then(function (response) {
                let modifiedItem = response.data[itemID]
                let oldItem = rows.filter(row => row._id === itemID)[0]
                if (rows.indexOf(oldItem) > -1) {
                    rows[rows.indexOf(oldItem)] = modifiedItem
                    setRows([...rows])
                }
                if (currentRows.indexOf(oldItem) > -1) {
                    currentRows[currentRows.indexOf(oldItem)] = modifiedItem
                    setCurrentRows([...currentRows])
                }
                if (tapBeers.indexOf(oldItem) > -1) {
                    tapBeers[tapBeers.indexOf(oldItem)] = modifiedItem
                    setTapBeers([...tapBeers])
                }
                if (paleAleBeers.indexOf(oldItem) > -1) {
                    paleAleBeers[paleAleBeers.indexOf(oldItem)] = modifiedItem
                    setPaleAleBeers([...paleAleBeers])
                }
                if (lagerBeers.indexOf(oldItem) > -1) {
                    lagerBeers[lagerBeers.indexOf(oldItem)] = modifiedItem
                    setLagerBeers([...lagerBeers])
                }
                if (aleBeers.indexOf(oldItem) > -1) {
                    aleBeers[aleBeers.indexOf(oldItem)] = item
                    setAleBeers([...aleBeers])
                }
                if (stoutBeers.indexOf(oldItem) > -1) {
                    stoutBeers[stoutBeers.indexOf(oldItem)] = item
                    setStoutBeers([...stoutBeers])
                }
                if (belgianBeers.indexOf(oldItem) > -1) {
                    belgianBeers[belgianBeers.indexOf(oldItem)] = item
                    setBelgianBeers([...belgianBeers])
                }
                if (sourBeers.indexOf(oldItem) > -1) {
                    sourBeers[sourBeers.indexOf(oldItem)] = item
                    setSourBeers([...sourBeers])
                }
                if (otherBeers.indexOf(oldItem) > -1) {
                    otherBeers[otherBeers.indexOf(oldItem)] = item
                    setOtherBeers([...otherBeers])
                }
                if (wheatBeers.indexOf(oldItem) > -1) {
                   wheatBeers[wheatBeers.indexOf(oldItem)] = item
                    setWheatBeers([...wheatBeers])
                }
                if (alcoholFreeBeers.indexOf(oldItem) > -1) {
                    alcoholFreeBeers[alcoholFreeBeers.indexOf(oldItem)] = item
                    setAlcoholFreeBeers([...alcoholFreeBeers])
                }

            })
            .catch(function (error) {
                console.log(error);
            });
        handleCloseWindow()



    };
    const deleteItem = (item) => {
        axios.delete("/api/delete/beers", {
            data: [item]
        });
        if (rows.indexOf(item) > -1) {
            rows.splice(rows.indexOf(item), 1);
            setRows([...rows])
        }
        if (currentRows.indexOf(item) > -1) {
            currentRows.splice(currentRows.indexOf(item), 1);
            setCurrentRows([...currentRows])
        }
        if (tapBeers.indexOf(item) > -1) {
            tapBeers.splice(tapBeers.indexOf(item), 1);
            setTapBeers([...tapBeers])
        }
        if (paleAleBeers.indexOf(item) > -1) {
            paleAleBeers.splice(paleAleBeers.indexOf(item), 1);
            setPaleAleBeers([...paleAleBeers])
        }
        if (lagerBeers.indexOf(item) > -1) {
            lagerBeers.splice(lagerBeers.indexOf(item), 1);
            setLagerBeers([...lagerBeers])
        }
        if (aleBeers.indexOf(item) > -1) {
            aleBeers.splice(aleBeers.indexOf(item), 1);
            setAleBeers([...aleBeers])
        }
        if (stoutBeers.indexOf(item) > -1) {
            stoutBeers.splice(stoutBeers.indexOf(item), 1);
            setStoutBeers([...stoutBeers])
        }
        if (belgianBeers.indexOf(item) > -1) {
            belgianBeers.splice(belgianBeers.indexOf(item), 1);
            setBelgianBeers([...belgianBeers])
        }
        if (sourBeers.indexOf(item) > -1) {
            sourBeers.splice(sourBeers.indexOf(item), 1);
            setSourBeers([...sourBeers])
        }
        if (otherBeers.indexOf(item) > -1) {
            otherBeers.splice(otherBeers.indexOf(item), 1);
            setOtherBeers([...otherBeers])
        }
        if (wheatBeers.indexOf(item) > -1) {
            wheatBeers.splice(wheatBeers.indexOf(item), 1);
            setWheatBeers([...wheatBeers])
        }
        if (alcoholFreeBeers.indexOf(item) > -1) {
            alcoholFreeBeers.splice(alcoholFreeBeers.indexOf(item), 1);
            setAlcoholFreeBeers([...alcoholFreeBeers])
        }


        // for (var i = 0; i < currentRows.length; i++) {
        //   var obj = currentRows[i];

        //   if (selected.indexOf(obj._id) !== -1) {
        //     initialrows.splice(i, 1);
        //     i--;
        //   }
        // }
        // // for (var i = 0; i < currentRows.length; i++) {
        // //     var obj = currentRows[i];

        // //     if (selected.indexOf(obj._id) !== -1) {
        // //       initialrows.splice(i, 1);
        // //       i--;
        // //     }
        // //   }
        // setRows([...initialrows])
        // setSelected([])

    };
    const handleSearchImportInfo = (beer) => {
        setItemTitle(beer.beer.beer_name);
        setItemURL("https://untappd.com/b/beer/"+ beer.brewery.bid);
        setItemBrewery(beer.brewery.brewery_name);
        setItemType(beer.beer.beer_style);
        setItemAlcohol(beer.beer.beer_abv);
        setItemIBU(beer.beer.beer_ibu);
        setItemRating(beer.beer.weighted_rating_score);
        setItemDescription(beer.beer.beer_description);
        setItemImage(beer.beer.beer_label);
        setItemCountry(beer.brewery.country_name);
        checkImageExists(beer.beer.beer_label, function (existsImage) {
            if (existsImage === true) {
                setItemImageExists(true)
            }
            else {
                setItemImageExists(false)
            }
        });
        setAnchorEl(null);

    };
    const handleImportInfo = () => {
        // const proxyurl = "https://cors-anywhere.herokuapp.com/";

        const untappdID = itemURL.substring(itemURL.lastIndexOf('/') + 1)

        axios.get("https://api.untappd.com/v4/beer/info/" + untappdID + "?client_id=00C637D891758676D4988D6A67AB581C07F2B2AF&client_secret=453BE6625A63443A627189178B9DC6E4265C2B47&compact=true")
            .then(function (response) {
                // handle success

                setItemTitle(response.data.response.beer.beer_name);
                setItemBrewery(response.data.response.beer.brewery.brewery_name);
                setItemType(response.data.response.beer.beer_style);
                setItemAlcohol(response.data.response.beer.beer_abv);
                setItemIBU(response.data.response.beer.beer_ibu);
                setItemRating(response.data.response.beer.weighted_rating_score);
                setItemDescription(response.data.response.beer.beer_description);
                setItemImage(response.data.response.beer.beer_label);
                setItemCountry(response.data.response.beer.brewery.country_name);
                checkImageExists(response.data.response.beer.beer_label, function (existsImage) {
                    if (existsImage === true) {
                        setItemImageExists(true)
                    }
                    else {
                        setItemImageExists(false)
                    }
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });



    };
    const createDialogContent = () => {
        return (<DialogContent>
            <div >
                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                            margin="dense"
                            id="search"
                            label="Search beer on Untappd"
                            variant="outlined"
                        />
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleSearchClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                        <div style={{ width: '300px' }}>
                            {searchResults.map(result => 
                                (<Paper style={{ paddingTop: '6px', paddingBottom: '6px', paddingRight: '6px' }} elevation={2} ><Grid container>
                                <Grid style={{ textAlign: 'center' }} item xs={2}>
                                <img style={{ marginTop: '2px' }} src={result.beer.beer_label} alt="logo" width="35" height="35" />
 
                                </Grid >
                                <Grid item xs={7}><p style={{fontSize: "0.9em"}} display="block">{result.beer.beer_name}</p>
                                <p style={{fontSize: "0.8em"}} display="block">{result.brewery.brewery_name}</p> 
                                </Grid >
                                <Grid item xs={3}><Button fullWidth
                            onClick={() => (handleSearchImportInfo(result))}
                            variant="contained">
                            Import</Button>
                                </Grid >
                                </Grid >
                                </Paper>))}</div>
                        </Popover>
                    </Grid>

                    <Grid item xs={3}>
                        <Button fullWidth
                            style={{ marginTop: 9 }}
                            onClick={handleSearchOpen}
                            variant="contained">
                            Search</Button>
                    </Grid>

                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            value={itemURL}
                            onChange={(e) => setItemURL(e.target.value)}
                            margin="dense"
                            id="url"
                            label="Untappd URL"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button fullWidth
                            style={{ marginTop: 9 }}
                            onClick={handleImportInfo}
                            variant="contained">
                            Import</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            value={itemTitle}
                            onChange={(e) => setItemTitle(e.target.value)}
                            margin="dense"
                            id="title"
                            label="Title"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            value={itemBrewery}
                            onChange={(e) => setItemBrewery(e.target.value)}
                            margin="dense"
                            id="brewery"
                            label="Brewery"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            value={itemDescription}
                            onChange={(e) => setItemDescription(e.target.value)}
                            margin="dense"
                            id="description"
                            label="Description"
                            multiline
                            rows={3}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <TextField
                            fullWidth
                            value={itemType}
                            onChange={(e) => setItemType(e.target.value)}
                            margin="dense"
                            id="type"
                            label="Type"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <TextField
                            fullWidth
                            value={itemRating}
                            onChange={(e) => setItemRating(e.target.value)}
                            margin="dense"
                            id="rating"
                            label="Rating"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <TextField
                            fullWidth
                            value={itemCountry}
                            onChange={(e) => setItemCountry(e.target.value)}
                            margin="dense"
                            id="country"
                            label="Country"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <TextField
                            fullWidth
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                            margin="dense"
                            id="price"
                            label="Price"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <TextField
                            fullWidth
                            value={itemAlcohol}
                            onChange={(e) => setItemAlcohol(e.target.value)}
                            margin="dense"
                            id="alcohol"
                            label="Alcohol rate"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">%</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <TextField
                            fullWidth
                            value={itemIBU}
                            onChange={(e) => setItemIBU(e.target.value)}
                            margin="dense"
                            id="ibu"
                            label="IBU"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <TextField
                            fullWidth
                            select
                            value={itemLocation}
                            onChange={(e) => setItemLocation(e.target.value)}
                            margin="dense"
                            id="location"
                            label="Location"
                            variant="outlined"
                        >{['Inside', 'Outside', 'Inside/Outside'].map((location) => (
                            <MenuItem key={location} value={location}>
                                {location}
                            </MenuItem>
                        ))}
                        </TextField>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <TextField
                            fullWidth
                            select
                            value={itemForm}
                            onChange={(e) => setItemForm(e.target.value)}
                            margin="dense"
                            id="form"
                            label="Form"
                            variant="outlined"
                        >        >{['Bottle', 'Tap'].map((form) => (
                            <MenuItem key={form} value={form}>
                                {form}
                            </MenuItem>
                        ))}
                        </TextField>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <TextField
                            fullWidth
                            value={itemSize}
                            onChange={(e) => setItemSize(e.target.value)}
                            margin="dense"
                            id="size"
                            label="Sizes"
                            variant="outlined"
                            helperText="Ex: 400 or 400,500,Pitcher"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Ml</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'center' }}>
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={itemNew}
                                onChange={(e) => setItemNew(e.target.checked)}
                                name="stock" />}
                            label="New beer"
                            style={{ marginTop: '7px' }}

                        />
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'center' }}>
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={itemStock}
                                onChange={(e) => setItemStock(e.target.checked)}
                                name="stock" />}
                            label="Available"
                            style={{ marginTop: '7px' }}

                        />
                    </Grid>
                    <Grid container justify="center" item xs={12}>

                        {imageExists ? (
                            <img src={itemImage} alt="Beer" width="100" height="100" />
                        ) : (
                                <Skeleton variant="rect" width={100} height={100} />
                            )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            value={itemImage}
                            onChange={handleImageChange}
                            margin="dense"
                            id="imageURL"
                            label="Image URL"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </div>
        </DialogContent>)
    }
    const handleImageChange = (event) => {
        setItemImage(event.target.value)
        checkImageExists(event.target.value, function (existsImage) {
            if (existsImage === true) {
                setItemImageExists(true)
            }
            else {
                setItemImageExists(false)
            }
        });

    };
    //
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
            if (key === "checkedVegan" && temparray[key]) {
                tempRows = tempRows.concat(originalRows.filter(row => row.type.includes("Vegan")))
                originalRows = originalRows.filter(row => !row.type.includes("Vegan"))
            }
            if (key === "checkedNew" && temparray[key]) {
                tempRows = tempRows.concat(originalRows.filter(row => row.new))
                originalRows = originalRows.filter(row => !row.new)
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
        let newwheatBeers = []
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
            else if (item.type.includes("Hefeweizen") || item.type.includes("Wheat Beer")) {
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
        setWheatBeers(newwheatBeers)
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
        let newwheatBeers = []
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
            else if (item.type.includes("Hefeweizen") || item.type.includes("Wheat Beer")) {
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
        setWheatBeers(newwheatBeers)
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
                    else if (item.type.includes("Hefeweizen") || item.type.includes("Wheat Beer")) {
                        wheatBeers.push(item);
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
                setWheatBeers(Sorter(value, [...wheatBeers]))
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filter.checkedVegan}
                                onChange={handleFilterChange}
                                name="checkedVegan"
                                color="primary"
                            />
                        }
                        label={"Vegan (" + rows.filter(row => row.type.includes("Vegan")).length + ")"}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filter.checkedNew}
                                onChange={handleFilterChange}
                                name="checkedNew"
                                color="primary"
                            />
                        }
                        label={"New in (" + rows.filter(row => row.new).length + ")"}
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
                        logout={props.logout}
                        admin={props.admin}
                        create={makeCreateWindowVisible}
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
                    <Dialog open={createWindow} onClose={handleCloseWindow} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">New Beer</DialogTitle>

                        {createDialogContent()}
                        <DialogActions>
                            <Button onClick={handleCloseWindow} color="primary">
                                Cancel
          </Button>
                            <Button onClick={handleCreateItem} color="primary">
                                Create
          </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={editWindow} onClose={handleCloseWindow} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit Beer</DialogTitle>
                        {createDialogContent()}

                        <DialogActions>
                            <Button onClick={handleCloseWindow} color="primary">
                                Cancel
          </Button>
                            <Button onClick={handleEditItem} color="primary">
                                Edit
          </Button>
                        </DialogActions>
                    </Dialog>
                    <h4 style={{ color: 'white', margin: "5px", textAlign: "center" }} >
                        {currentRows.length} beers found
    </h4>



                    {tapBeers.length > 0 ?
                        <Accordion square={false} elevation={4} defaultExpanded style={{ backgroundColor: '#333842' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"

                            >
                                <h6 id="tap-beers" style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                                    {/* {currentRows.filter(row => row.form === "Tap").length} on tap: */}
                                    On tap ({tapBeers.length})
    </h6></AccordionSummary>{tapBeers.filter(beer => (beer.new)).map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                            })}

                            {tapBeers.filter(beer => (!beer.new)).map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                            })}
                        </Accordion> : null}
                    {/* {currentRows.filter(row => row.form === "Tap")
                    .map(function (row) {
                        return (<MenuItem key={row._id} properties={row} />)
                    })} */}



                    {paleAleBeers.length > 0 ? <Accordion elevation={4} style={{ backgroundColor: '#333842' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"

                        > <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                                On bottle, Pale Ale ({paleAleBeers.length})
    </h6></AccordionSummary>
                        {paleAleBeers.filter(beer => (beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}
                        {paleAleBeers.filter(beer => (!beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}
                    </Accordion> : null}

                    {lagerBeers.length > 0 ? <Accordion elevation={4} style={{ backgroundColor: '#333842' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"

                        ><h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                                On bottle, Lager ({lagerBeers.length})
    </h6> </AccordionSummary>
                        {lagerBeers.filter(beer => (beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}
                        {lagerBeers.filter(beer => (!beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}</Accordion> : null}

                    {stoutBeers.length > 0 ? <Accordion elevation={4} style={{ backgroundColor: '#333842' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"

                        > <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                                On bottle, Stout ({stoutBeers.length})
    </h6> </AccordionSummary>
                        {stoutBeers.filter(beer => (beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}
                        {stoutBeers.filter(beer => (!beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}</Accordion> : null}

                    {sourBeers.length > 0 ? <Accordion elevation={4} style={{ backgroundColor: '#333842' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"

                        ><h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                                On bottle, Sour ({sourBeers.length})
    </h6> </AccordionSummary>
                        {sourBeers.filter(beer => (beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}
                        {sourBeers.filter(beer => (!beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}</Accordion> : null}


                    {aleBeers.length > 0 ? <Accordion elevation={4} style={{ backgroundColor: '#333842' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"

                        > <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                                On bottle, Ale ({aleBeers.length})
    </h6> </AccordionSummary>
                        {aleBeers.filter(beer => (beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}
                        {aleBeers.filter(beer => (!beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}</Accordion> : null}

                    {belgianBeers.length > 0 ? <Accordion elevation={4} style={{ backgroundColor: '#333842' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"

                        > <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                                On bottle, Belgian ({belgianBeers.length})
    </h6> </AccordionSummary>
                        {belgianBeers.filter(beer => (beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}
                        {belgianBeers.filter(beer => (!beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}</Accordion> : null}
                                            {wheatBeers.length > 0 ? <Accordion elevation={4} style={{ backgroundColor: '#333842' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"

                        > <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                                On bottle, Wheat Beer ({wheatBeers.length})
    </h6> </AccordionSummary>
                        {wheatBeers.filter(beer => (beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}
                        {wheatBeers.filter(beer => (!beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}</Accordion> : null}

                    {otherBeers.length > 0 ? <Accordion elevation={4} style={{ backgroundColor: '#333842' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"

                        > <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                                On bottle, Other ({otherBeers.length})
    </h6> </AccordionSummary>
                        {otherBeers.filter(beer => (beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}
                        {otherBeers.filter(beer => (!beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}</Accordion> : null}

                    {alcoholFreeBeers.length > 0 ? <Accordion elevation={4} style={{ backgroundColor: '#333842' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"

                        ><h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                                On bottle, Alcohol Free ({alcoholFreeBeers.length})
    </h6> </AccordionSummary>
                        {alcoholFreeBeers.filter(beer => (beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}
                        {alcoholFreeBeers.filter(beer => (!beer.new)).map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}</Accordion> : null}
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

function MenuItemCard(props) {
    const theme = useTheme();
    const admin = React.useContext(AdminContext)

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

        <Card className={classes.card}>
            <div className={classes.content}>
                {/* {!props.properties.stock ? (<img style={{ position: 'relative', marginLeft: 'auto', marginRight: 'auto', left: "0", right: "0", marginTop: "5px", textAlign: "center" }} alt="new" src="../../images/soldout.png" height="50" />) : (null)} */}
                <div style={{ textAlign: "center", height: "0px" }}>
                {!props.properties.stock ? (<img style={{ position: 'relative',  textAlign: "center", height:"50px" }} alt="new" src="../../images/soldout.png" />) : (null)}
                </div>

                <Grid container >

                    {/* <ThemeProvider theme={fontTheme}> */}

                    <Grid item xs={1} style={{ textAlign: "right" }} >
                        <img className={classes.img} src={props.properties.image} alt="logo" width="35" height="35" />
                    </Grid>
                    <Grid item xs={9} >
                        <h6 style={{ marginLeft: "15px", fontSize: "1em" }} display="block">
                            {props.properties.title}
                            {props.properties.new ? (<img style={{ position: 'absolute', marginLeft: "5px" }} alt="new" src="../../images/new2.png" height="18" />) : (null)}
                        </h6>
                        <p style={{ marginLeft: "15px", fontSize: "0.9em" }} display="inline">
                            {props.properties.brewery} <img style={{ marginLeft: "3px", marginBottom: "-1px" }} alt={props.properties.country} src={countryFlag} height="12" />
                        </p>
                        <p style={{ marginLeft: "15px", fontSize: "0.8em" }} display="block">
                            {/* {props.properties.type} - {props.properties.alcohol === 0.0 ? ("Alcohol Free") : (props.properties.alcohol + "%")} - {props.properties.ibu === 0 ? ("No IBU") : (props.properties.ibu + " IBU")} */}
                            {props.properties.type} - {props.properties.alcohol === 0.0 ? ("Alcohol Free") : (props.properties.alcohol + "%")}

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
                                {size} {size.includes("Pitcher") ? (null) : ("ml")}
                            </p>)
                        })) : null}


                        {/* <Divider style={{ background: "white", marginTop: "2px", marginBottom: "2px" }} variant='middle'/> */}
                        <h6 style={{ fontSize: "0.8em" }} display="block">
                            {props.properties.location === "Inside/Outside" ? ("Both bars") : (props.properties.location + " bar")}
                        </h6>

                        {/* <Rating name="read-onsly" value={props.properties.rating} readOnly display="block" /> */}
                    </Grid>
                    <Grid item xs={11} >
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
                    </Grid>
                    <Grid style={{ textAlign: "right" }} item xs={1} >
                        <a href={props.properties.untappd}><img alt="untappd" src="../../images/untappd.png" height="18" /></a>
                    </Grid>


                    {admin ? (<Grid item xs={12}><hr style={{ color: 'black', backgroundColor: 'black', borderTop: '0.5px solid' }} /> </Grid>) : (null)}
                    {admin ? (<Grid style={{ textAlign: "center" }} item xs={4}>
                        <Button size="small" onClick={() => props.delete(props.properties)} startIcon={<DeleteIcon />}>Delete</Button>
                    </Grid>) : (null)}
                    {admin ? (<Grid style={{ textAlign: "center" }} item xs={4}>
                        <Button size="small" onClick={() => props.edit(props.properties)} startIcon={<EditIcon />}>Edit</Button>
                    </Grid>) : (null)}
                    {admin ? (<Grid style={{ textAlign: "center" }} item xs={4}>
                        <p style={{ fontSize: "0.9em", color: "black", paddingTop: "3px" }} display="inline">
                            Created: {moment(props.properties.created).format('YYYY-MM-DD')}
                        </p>
                    </Grid>) : (null)}




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


    );
}

