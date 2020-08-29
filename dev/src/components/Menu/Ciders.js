
import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Skeleton from '@material-ui/lab/Skeleton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Popover from '@material-ui/core/Popover';
import Alert from '@material-ui/lab/Alert';
import './Menu.css';
import Footer from '../Footer/Footer';
import { PersonalAppBar, Background, checkImageExists, Sorter, isUserInside, pubCoordinates } from './menuUtils';
import { AdminContext } from '../Admin/Admin';

const moment = require('moment')
const axios = require('axios');
const country = require('country-data').lookup




const useStyles = makeStyles((theme) => ({


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
        height: '10%',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',


    },

}));

export default function Ciders(props) {
    document.body.style.background = Background
    document.body.style.backgroundSize = 'cover'
    document.title = "Svantes menu - Ciders"
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
    const [itemImage, setItemImage] = React.useState("");
    const [itemForm, setItemForm] = React.useState("Bottle");
    const [itemSize, setItemSize] = React.useState("");
    const [itemCountry, setItemCountry] = React.useState("");
    const [itemLocation, setItemLocation] = React.useState("Inside");
    const [imageExists, setItemImageExists] = React.useState(false);
    const [createWindow, setCreateWindow] = React.useState(false);
    const [editWindow, setEditWindow] = React.useState(false);
    const [displayPrices, setDisplayPrices] = React.useState(false);
    const [warningNotInside, setWarningNotInside] = React.useState(false);
    const [warningLocationNotEnabled, setWarningLocationNotEnabled] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [currentRows, setCurrentRows] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(locationSuccess,locationError
            );
        }

    });

    const locationSuccess = (position) => {
        let userInside = isUserInside([position.coords.latitude, position.coords.longitude],
            pubCoordinates
        )
        setDisplayPrices(
            userInside
        )
        if (!userInside){
            setWarningNotInside(true)
            setWarningLocationNotEnabled(false)
        }
        else {
            setWarningNotInside(false)
            setWarningLocationNotEnabled(false)
        }
      }
      
      const locationError = (error) => {
        setWarningNotInside(false)
        setWarningLocationNotEnabled(true)
      }

    const handleSearchClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
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
        setSearchString("")
        setItemURL("")
        setItemTitle("")
        setItemBrewery("")
        setItemDescription("")
        setItemType("")
        setItemRating("")
        setItemPrice("")
        setItemCountry("")
        setItemAlcohol("")
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
            ciderTitle: itemTitle,
            ciderBrewery: itemBrewery,
            ciderDescription: itemDescription,
            ciderType: itemType,
            ciderStock: itemStock,
            ciderNew: itemNew,
            ciderRating: itemRating,
            ciderPrice: itemPrice,
            ciderCountry: itemCountry,
            ciderAlcohol: itemAlcohol,
            ciderImage: itemImage,
            ciderForm: itemForm,
            ciderLocation: itemLocation,
            ciderSize: itemSize,
            ciderUntappd: itemURL
        }
        axios.post('/api/add/ciders', object)
            .then(function (response) {
                let item = response.data
                currentRows.push(item);
                setCurrentRows([...currentRows])
            })
            .catch(function (error) {
                console.log(error);
            });
        handleCloseWindow()

    };


    const handleEditItem = () => {
        let item = {
            ciderID: itemID,
            ciderTitle: itemTitle,
            ciderBrewery: itemBrewery,
            ciderDescription: itemDescription,
            ciderType: itemType,
            ciderStock: itemStock,
            ciderNew: itemNew,
            ciderRating: itemRating,
            ciderPrice: itemPrice,
            ciderCountry: itemCountry,
            ciderAlcohol: itemAlcohol,
            ciderImage: itemImage,
            ciderForm: itemForm,
            ciderLocation: itemLocation,
            ciderSize: itemSize,
            ciderUntappd: itemURL
        }
        axios.post('/api/edit/ciders', item)
            .then(function (response) {
                let modifiedItem = response.data[itemID]
                let oldItem = currentRows.filter(row => row._id === itemID)[0]
                if (currentRows.indexOf(oldItem) > -1) {
                    currentRows[currentRows.indexOf(oldItem)] = modifiedItem
                    setCurrentRows([...currentRows])
                }


            })
            .catch(function (error) {
                console.log(error);
            });
        handleCloseWindow()



    };
    const deleteItem = (item) => {
        axios.delete("/api/delete/ciders", {
            data: [item]
        });
        if (currentRows.indexOf(item) > -1) {
            currentRows.splice(currentRows.indexOf(item), 1);
            setCurrentRows([...currentRows])
        }



    };
    const handleSearchImportInfo = (item) => {
        setItemTitle(item.beer.beer_name);
        setItemURL("https://untappd.com/b/cider/" + item.beer.bid);
        setItemBrewery(item.brewery.brewery_name);
        setItemType(item.beer.beer_style);
        setItemAlcohol(item.beer.beer_abv);
        setItemRating(item.beer.weighted_rating_score);
        setItemDescription(item.beer.beer_description);
        setItemImage(item.beer.beer_label);
        setItemCountry(item.brewery.country_name);
        checkImageExists(item.beer.beer_label, function (existsImage) {
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
                            label="Search cider on Untappd"
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
                                        <Grid item xs={7}><p style={{ fontSize: "0.9em" }} display="block">{result.beer.beer_name}</p>
                                            <p style={{ fontSize: "0.8em" }} display="block">{result.brewery.brewery_name}</p>
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
                    <Grid item sm={6} xs={6}>
                        <TextField
                            fullWidth
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                            margin="dense"
                            id="price"
                            label="Prices"
                            variant="outlined"
                            helperText="Ex: 29 or 29/35/115"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Kr</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            fullWidth
                            value={itemSize}
                            onChange={(e) => setItemSize(e.target.value)}
                            margin="dense"
                            id="size"
                            label="Sizes"
                            variant="outlined"
                            helperText="Ex: 400 or 400/500/Pitcher"
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
                            label="New cider"
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



    return (
        <Container disableGutters maxWidth="sm" >
            {loading ? (<div style={{ textAlign: 'center', margin: "2px" }}><CircularProgress /><Typography style={{ color: 'white', margin: "2px" }} variant="h6" >
                Loading ciders
    </Typography></div>) : (<div>
                    <PersonalAppBar
                        category="Ciders"
                        logout={props.logout}
                        admin={props.admin}
                        create={makeCreateWindowVisible}
                    />

                    <Divider />
                    <Dialog open={createWindow} onClose={handleCloseWindow} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">New Cider</DialogTitle>

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
                        <DialogTitle id="form-dialog-title">Edit Cider</DialogTitle>
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
                    
    {warningNotInside ? (<Alert variant="filled" severity="warning">
  You are not currently within the serving area of Uplands so we can 
  unfortunately not show you the prices of alcohol.
</Alert>) : (null)}
{warningLocationNotEnabled ? (<Alert variant="filled" severity="error">
Please enable location sharing if you want to see the prices of alcohol.
</Alert>) : (null)}
                    {/* <h4 style={{ color: 'white', margin: "5px" }} >
                        {currentRows.length} ciders found
    </h4> */}
                    <Paper elevation={4} style={{ backgroundColor: '#333842' }}>
                        <h6 style={{ color: 'white', marginTop: "10px", paddingBottom: "10px", paddingTop: "10px", textAlign: "center", fontSize: "1em" }} >
                            On tap
    </h6>
                        {currentRows.filter(row => row.form === "Tap")
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}</Paper>
                    <Paper elevation={4} style={{ backgroundColor: '#333842' }}>
                        <h6 style={{ color: 'white', marginTop: "10px", paddingBottom: "10px", paddingTop: "10px", textAlign: "center", fontSize: "1em" }} >
                            On bottle
    </h6>
                        {currentRows.filter(cider => (cider.new)).filter(row => row.form === "Bottle" && row.alcohol > 2.25)
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}
                        {currentRows.filter(cider => (!cider.new)).filter(row => row.form === "Bottle" && row.alcohol > 2.25)
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}</Paper>
                    <Paper elevation={4} style={{ backgroundColor: '#333842', marginBottom: "10px" }}>
                        <h6 style={{ color: 'white', marginTop: "10px", paddingBottom: "10px", paddingTop: "10px", textAlign: "center", fontSize: "1em" }} >
                            On bottle, Alcohol free
    </h6>
                        {currentRows.filter(cider => (cider.new)).filter(row => row.form === "Bottle" && row.alcohol <= 2.25)
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}
                        {currentRows.filter(cider => (!cider.new)).filter(row => row.form === "Bottle" && row.alcohol <= 2.25)
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}</Paper>
                    {/* {currentRows.map(function (row) {
                        return (<MenuItem key={row._id} properties={row} />)
                    })} */}
                    <Footer />
                    <div style={{ textAlign: 'center', marginBottom: "10px" }}>
                        <img src='../../images/pbu_40_white.png' alt="Untappd logo" />
                    </div>
                </div>
                )}

        </Container>
    );


}

function MenuItemCard(props) {
    const classes = useStyles();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const xs = useMediaQuery(theme.breakpoints.up('xs'));
    const admin = React.useContext(AdminContext)
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
        else if (props.properties.country.length > 0 && country.countries({ name: props.properties.country })[0])
            setFlag('../../images/flags/' + country.countries({ name: props.properties.country })[0].alpha2.toLowerCase() + ".png")
    }, [props.properties.country]);

    return (

        <Card className={classes.card}>


            <Grid container >
                {!props.properties.stock ? (<img style={{ position: 'absolute', marginLeft: 'auto', marginRight: 'auto', left: "0", right: "0", marginTop: "5px", textAlign: "center" }} alt="new" src="../../images/soldout.png" height="50" />) : (null)}
                <Grid item xs={12} >
                    <div style={{ float: "left", height: "100%", marginRight: "10px", maxWidth: '9.5%' }}>
                        <img style={{ width: '100%', height: 'auto' }} className={classes.img} src={props.properties.image} alt="logo" />
                    </div>
                    <div style={{ float: "right", textAlign: "right" }}  >
                    {props.displayPrices || admin ? (

                        <h6 style={{ fontSize: "0.9em" }} display="block">
                            {props.properties.price} kr
                                </h6>
                    ) : (null)}

                    {props.properties.form === "Tap" ? (
                        <p style={{ fontSize: "0.8em" }} >

                            {props.properties.size.split('/').map(function (size) {
                                if (size.toLowerCase().includes("pitcher")) {
                                    return ("Pitcher")
                                }
                                else {
                                    return (parseFloat(size) / 1000 + " l/")
                                }

                            })}

                        </p>

                    ) : (
                            <p style={{ fontSize: "0.8em" }} >
                                {props.properties.size} ml
                                </p>
                        )}
                    {/* {props.properties.size.split('/').map(function (size) {
                        return (<span style={{ fontSize: "0.8em" }} >
                            {size} {size.includes("Pitcher") ? (null) : ("ml")}
                        </span>)
                    })} */}


                    {/* <Divider style={{ background: "white", marginTop: "2px", marginBottom: "2px" }} variant='middle'/> */}
                    <h6 style={{ fontSize: "0.8em" }} display="block">
                        {props.properties.location === "Inside/Outside" ? ("Both bars") : (props.properties.location + " bar")}
                    </h6>

                </div>
                    <h6 style={{ fontSize: "1em", marginRight: "5px", marginBottom: "0px" }} display="block">
                        {props.properties.title}
                        {props.properties.new ? (<img style={{ position: "absolute", marginLeft: "5px" }} alt="new" src="../../images/new2.png" height="18" />) : (null)}
                    </h6>

                    <p style={{ fontSize: "0.9em", marginTop: "3px", marginBottom: "0px" }} display="block">
                        {props.properties.brewery} <img style={{ marginLeft: "3px", marginBottom: "-1px" }} alt={props.properties.country} src={countryFlag} height="12" />
                    </p>
                    <p style={{ fontSize: "0.8em", marginRight: "10px", marginTop: "3px" }} display="block">
                        {/* {props.properties.type} - {props.properties.alcohol === 0.0 ? ("Alcohol Free") : (props.properties.alcohol + "%")} - {props.properties.ibu === 0 ? ("No IBU") : (props.properties.ibu + " IBU")} */}
                        {props.properties.type} - {props.properties.alcohol}%

                        </p>



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


                        {sm ? (props.properties.description.substring(0, 80) + '...') : null}
                        {xs && !sm ? (props.properties.description.substring(0, 40) + '...') : null}
                        <Link color="inherit" onClick={handleTextButton}>
                            [Show more]
         </Link>


                    </p>) : (<p style={{ fontSize: "0.7em" }} >{props.properties.description}</p>)

                    }</div>)}
                    {/* {showText ? (

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

                        }</div>)} */}
                </Grid>
                <Grid style={{ textAlign: "right" }} item xs={1} >
                    <a href={props.properties.untappd} target="_blank"><img alt="untappd" src="../../images/untappd.png" height="18" /></a>
                </Grid>
                {admin ? (<Grid item xs={12}><hr style={{ color: 'black', backgroundColor: 'black', borderTop: '0.5px solid' }} /> </Grid>) : (null)}
                {admin ? (<Grid style={{ textAlign: "center" }} item xs={4}>
                    <Button style={{ color: 'white' }} size="small" onClick={() => props.delete(props.properties)} startIcon={<DeleteIcon />}>Delete</Button>
                </Grid>) : (null)}
                {admin ? (<Grid style={{ textAlign: "center" }} item xs={4}>
                    <Button style={{ color: 'white' }} size="small" onClick={() => props.edit(props.properties)} startIcon={<EditIcon />}>Edit</Button>
                </Grid>) : (null)}
                {admin ? (<Grid style={{ textAlign: "center" }} item xs={4}>
                    <p style={{ fontSize: "0.9em", color: "white", paddingTop: "3px" }} display="inline">
                        Created: {moment(props.properties.created).format('YYYY-MM-DD')}
                    </p>
                </Grid>) : (null)}

            </Grid >

        </Card>


    );
}

