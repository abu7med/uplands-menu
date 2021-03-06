
import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
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
import Link from '@material-ui/core/Link';
import Backdrop from '@material-ui/core/Backdrop';
import Footer from '../Footer/Footer';
import { PersonalAppBar, Background, checkImageExists, Sorter, isUserInside, pubCoordinates } from './menuUtils';
import { AdminContext } from '../Admin/Admin';
import './Menu.css';

const moment = require('moment')
const axios = require('axios');
const country = require('country-data').lookup


const useStyles = makeStyles((theme) => ({

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

export default function Wines(props) {
    document.body.style.background = Background
    document.body.style.backgroundSize = 'cover'
    document.title = "Svantes menu - Wine"
    const [loading, setLoading] = React.useState(true);
    const [currentRows, setCurrentRows] = React.useState([]);
    const [displayPrices, setDisplayPrices] = React.useState(false);
    const [warningNotInside, setWarningNotInside] = React.useState(false);
    const [warningLocationNotEnabled, setWarningLocationNotEnabled] = React.useState(false);
    const [itemID, setItemID] = React.useState();
    const [itemTitle, setItemTitle] = React.useState("");
    const [itemStock, setItemStock] = React.useState(true);
    const [itemNew, setItemNew] = React.useState(false);
    const [itemBrewery, setItemBrewery] = React.useState("");
    const [itemDescription, setItemDescription] = React.useState("");
    const [itemType, setItemType] = React.useState("Red");
    const [itemPrice, setItemPrice] = React.useState("");
    const [itemRegion, setItemRegion] = React.useState("");
    const [itemHouse, setItemHouse] = React.useState(false);
    const [itemGrapes, setItemGrapes] = React.useState("");
    const [itemYear, setItemYear] = React.useState("");
    const [itemAlcohol, setItemAlcohol] = React.useState("");
    const [itemImage, setItemImage] = React.useState("");
    const [itemSize, setItemSize] = React.useState("");
    const [itemCountry, setItemCountry] = React.useState("");
    const [itemLocation, setItemLocation] = React.useState("Inside");
    const [imageExists, setItemImageExists] = React.useState(false);
    const [createWindow, setCreateWindow] = React.useState(false);
    const [editWindow, setEditWindow] = React.useState(false);

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

    const makeCreateWindowVisible = () => {
        setCreateWindow(true);
    };
    const makeEditWindowVisible = (item) => {
        if (item._id != null)
            setItemID(item._id)
        if (item.title != null)
            setItemTitle(item.title)
        if (item.brewery != null)
            setItemBrewery(item.brewery)
        if (item.description != null)
            setItemDescription(item.description)
        if (item.type != null)
            setItemType(item.type)
        if (item.price != null)
            setItemPrice(item.price)
        if (item.region != null)
            setItemRegion(item.region)
        if (item.grapes != null)
            setItemGrapes(item.grapes)
        if (item.year != null)
            setItemYear(item.year)
        if (item.stock != null)
            setItemStock(item.stock)
        if (item.house != null)
            setItemHouse(item.house)
        if (item.new != null)
            setItemNew(item.new)
        if (item.country != null)
            setItemCountry(item.country)
        if (item.alcohol != null)
            setItemAlcohol(item.alcohol)
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
        setItemTitle("")
        setItemBrewery("")
        setItemDescription("")
        setItemType("Red")
        setItemYear("")
        setItemPrice("")
        setItemRegion("")
        setItemGrapes("")
        setItemCountry("")
        setItemAlcohol("")
        setItemImage("")
        setItemSize("")
        setItemLocation("")
        setItemImageExists(false)
        setCreateWindow(false)
        setEditWindow(false)
    };
    const handleCreateItem = () => {
        let object = {
            wineTitle: itemTitle,
            wineBrewery: itemBrewery,
            wineDescription: itemDescription,
            wineType: itemType,
            wineStock: itemStock,
            wineNew: itemNew,
            wineYear: itemYear,
            winePrice: itemPrice,
            wineHouse: itemHouse,
            wineRegion: itemRegion,
            wineGrapes: itemGrapes,
            wineCountry: itemCountry,
            wineAlcohol: itemAlcohol,
            wineImage: itemImage,
            wineLocation: itemLocation,
            wineSize: itemSize,
        }
        axios.post('/api/add/wines', object)
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
            wineID: itemID,
            wineTitle: itemTitle,
            wineBrewery: itemBrewery,
            wineDescription: itemDescription,
            wineType: itemType,
            wineStock: itemStock,
            wineYear: itemYear,
            winePrice: itemPrice,
            wineRegion: itemRegion,
            wineHouse: itemHouse,
            wineGrapes: itemGrapes,
            wineNew: itemNew,
            wineCountry: itemCountry,
            wineAlcohol: itemAlcohol,
            wineImage: itemImage,
            wineLocation: itemLocation,
            wineSize: itemSize,
        }
        axios.post('/api/edit/wines', item)
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
        axios.delete("/api/delete/wines", {
            data: [item]
        });
        if (currentRows.indexOf(item) > -1) {
            currentRows.splice(currentRows.indexOf(item), 1);
            setCurrentRows([...currentRows])
        }



    };

    const createDialogContent = () => {
        return (<DialogContent>
            <div >
                <Grid container spacing={1}>
                    <Grid item sm={6} xs={6}>
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
                    <Grid item sm={6} xs={6}>
                        <TextField
                            fullWidth
                            select
                            value={itemType}
                            onChange={(e) => setItemType(e.target.value)}
                            margin="dense"
                            id="type"
                            label="Type"
                            variant="outlined"
                        >{['Red', 'White', 'Rose', 'Sparkling', 'Dessert'].map((location) => (
                            <MenuItem key={location} value={location}>
                                {location}
                            </MenuItem>
                        ))}
                        </TextField>
                    </Grid>
                    <Grid item sm={6} xs={6}>
                        <TextField
                            fullWidth
                            value={itemGrapes}
                            onChange={(e) => setItemGrapes(e.target.value)}
                            margin="dense"
                            id="grapes"
                            label="Grapes"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={6} xs={6}>
                        <TextField
                            fullWidth
                            value={itemYear}
                            onChange={(e) => setItemYear(e.target.value)}
                            margin="dense"
                            id="year"
                            label="Year"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <TextField
                            fullWidth
                            value={itemBrewery}
                            onChange={(e) => setItemBrewery(e.target.value)}
                            margin="dense"
                            id="producer"
                            label="Producer"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <TextField
                            fullWidth
                            value={itemRegion}
                            onChange={(e) => setItemRegion(e.target.value)}
                            margin="dense"
                            id="region"
                            label="Region"
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
                            label="Prices"
                            helperText="Glass/Bottle (35/160) or Bottle (160)"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">kr</InputAdornment>,
                            }}
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
                            value={itemSize}
                            onChange={(e) => setItemSize(e.target.value)}
                            margin="dense"
                            id="size"
                            label="Size of bottle"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Ml</InputAdornment>,
                            }}
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



                    <Grid item xs={4} style={{ textAlign: 'center' }}>
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={itemNew}
                                onChange={(e) => setItemNew(e.target.checked)}
                                name="new" />}
                            label="New wine"
                            style={{ marginTop: '7px' }}

                        />
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: 'center' }}>
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={itemHouse}
                                onChange={(e) => setItemHouse(e.target.checked)}
                                name="housewine" />}
                            label="House wine"
                            style={{ marginTop: '7px' }}

                        />
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: 'center' }}>
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
                            <img src={itemImage} alt="Wine" width="100" height="100" />
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

    React.useEffect(() => {

        axios.get("/api/get/wines")
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
        <Container disableGutters maxWidth="sm" >
            {loading ? (<div style={{ textAlign: 'center', margin: "2px" }}><CircularProgress /><Typography style={{ color: 'white', margin: "2px" }} variant="h6" >
                Loading wine
    </Typography></div>) : (<div>
                    <PersonalAppBar
                        category="Wine"
                        logout={props.logout}
                        admin={props.admin}
                        create={makeCreateWindowVisible}
                    />


                    <Divider />
                    <Dialog open={createWindow} onClose={handleCloseWindow} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">New Wine</DialogTitle>

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
                        <DialogTitle id="form-dialog-title">Edit Wine</DialogTitle>
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
                    <Paper elevation={4} style={{ backgroundColor: '#333842' }}>

                        <h3 style={{ color: 'white', marginTop: "10px", paddingBottom: "10px", paddingTop: "10px", textAlign: "center" }} >
                            Red
    </h3>
                        {currentRows.filter(row => (row.type === "Red" && row.house))
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}
                        {currentRows.filter(row => (row.type === "Red" && !row.house))
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}

                    </Paper>
                    <Paper elevation={4} style={{ backgroundColor: '#333842' }}>
                        {/* <Alert variant="filled" severity="info">
                            All drinks are served in the inside bar. Choose between 4 cl or 6 cl alcohol.</Alert> */}

                        <h3 style={{ color: 'white', marginTop: "10px", paddingBottom: "10px", paddingTop: "10px", textAlign: "center" }} >
                            White
    </h3>
                        {currentRows.filter(row => (row.type === "White" && row.house))
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}
                        {currentRows.filter(row => (row.type === "White" && !row.house))
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}
                    </Paper>
                    <Paper elevation={4} style={{ backgroundColor: '#333842' }}>
                        {/* <Alert variant="filled" severity="info">
                            All drinks are served in the inside bar. Choose between 4 cl or 6 cl alcohol.</Alert> */}

                        <h3 style={{ color: 'white', marginTop: "10px", paddingBottom: "10px", paddingTop: "10px", textAlign: "center" }} >
                            Rosé
    </h3>
                        {currentRows.filter(row => (row.type === "Rose" && row.house))
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}
                        {currentRows.filter(row => (row.type === "Rose" && !row.house))
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}
                    </Paper>

                    <Paper elevation={4} style={{ backgroundColor: '#333842' }}>
                        {/* <Alert variant="filled" severity="info">
                            All drinks are served in the inside bar. Choose between 4 cl or 6 cl alcohol.</Alert> */}

                        <h3 style={{ color: 'white', marginTop: "10px", paddingTop: "10px", paddingBottom: "10px", textAlign: "center" }} >
                            Sparkling
    </h3>
                        {currentRows.filter(row => (row.type === "Sparkling" && row.house))
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}
                        {currentRows.filter(row => (row.type === "Sparkling" && !row.house))
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}
                    </Paper>

                    <Paper elevation={4} style={{ backgroundColor: '#333842' }}>
                        {/* <Alert variant="filled" severity="info">
                            All drinks are served in the inside bar. Choose between 4 cl or 6 cl alcohol.</Alert> */}

                        <h3 style={{ color: 'white', marginTop: "10px", marginBottom: "10px", paddingTop: "10px", paddingBottom: "10px", textAlign: "center" }} >
                            Dessert
    </h3>
                        {currentRows.filter(row => (row.type === "Dessert" && row.house))
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}
                        {currentRows.filter(row => (row.type === "Dessert" && !row.house))
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}
                    </Paper>


                    {/* <Alert variant="filled" severity="info">
                        Choose to buy the bottle or a glass of the wine.</Alert> */}


                    <Footer />

                </div>
                )}

        </Container>
    );


}

function MenuItemCard(props) {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const xs = useMediaQuery(theme.breakpoints.up('xs'));
    const [imageExists, setItemImageExists] = React.useState(false);
    const [pictureOpen, setPictureOpen] = React.useState(false);
    const classes = useStyles();
    const admin = React.useContext(AdminContext)
    const [showText, setText] = React.useState(false);
    const [countryFlag, setFlag] = React.useState("");
    const handleTextButton = () => {
        if (showText === true)
            setText(false)
        else
            setText(true)

    };
    const openPicture = () => {
        setPictureOpen(!pictureOpen);
    };
    const closePicture = () => {
        setPictureOpen(false);
    };
    React.useEffect(() => {
        checkImageExists(props.properties.image, function (existsImage) {
            if (existsImage === true) {
                setItemImageExists(true)
            }
            else {
                setItemImageExists(false)
            }
        });
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
            <Grid container  >
                {!props.properties.stock ? (<img style={{ position: 'absolute', marginLeft: 'auto', marginRight: 'auto', left: "0", right: "0", marginTop: "0px", textAlign: "center" }} alt="new" src="../../images/soldout.png" height="45" />) : (null)}
                <Backdrop style={{ zIndex: 5 }} open={pictureOpen} onClick={closePicture}>
                    <img style={{ maxWidth: '75%', height: 'auto', maxHeight: '70vh' }} src={props.properties.image} alt="logo" />
                </Backdrop>
                <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: "center", maxHeight: '80px' }} item xs={1}>
                    <img onClick={openPicture} style={{ maxWidth: '100%', height: 'auto', maxHeight: '80px' }} src={props.properties.image} alt="logo" />
                </Grid>
                <Grid item xs={11}>
                    <div style={{ float: "right", textAlign: "right" }}>
                        {/* {props.properties.size != null ? (props.properties.size.split(',').map(function (size) {
                            return (<p style={{ fontSize: "0.8em" }} display="block">
                                {size} ml
                            </p>)
                        })) : null} */}
                        {props.displayPrices || admin ? (
    //                         props.properties.price.split('/').map(function (size) {
    //                             return (<h6 style={{ fontSize: "0.9em" }} display="block">
    //                                 {size} 
    // </h6>)
    //                         })

                            <h6 style={{ fontSize: "0.9em" }} display="block">
                                {props.properties.price} kr
                                </h6>
                        ) : (null)}


                        <h6 style={{ fontSize: "0.8em" }} display="block">
                            {props.properties.location === "Inside/Outside" ? ("Both bars") : (props.properties.location + " bar")}
                        </h6>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        marginLeft: '10px'

                    }}>
                        <h6 style={{ fontSize: "1em", marginRight: "10px", marginBottom: "0px" }} display="inline">
                            {props.properties.title}
                            {/* {props.properties.house ? <span style={{ fontSize: "0.9em" }}><i> House Wine</i></span> : (null)} */}
                            {props.properties.new ? (<img style={{ position: 'absolute', marginLeft: "5px" }} alt="new" src="../../images/new2.png" height="18" />) : (null)}

                        </h6>
                        {props.properties.house ? (<span style={{ fontSize: "0.9em" }} >
                            <i>House Wine</i>
                            <img style={{ float: 'left', marginRight: "2px" }} alt="new" src="../../images/housewine.png" height="18" />
                        </span>) : (null)}
                    </div>

                    {/* <p style={{ fontSize: "0.9em" }} display="block">
                            <i> <b>{props.properties.brewery} </b></i>
                            </p> */}
                    <p style={{ fontSize: "0.9em", marginLeft: '10px' }} display="block">
                        {props.properties.brewery} - {props.properties.region} - {props.properties.country}  <img style={{ marginLeft: "3px", marginBottom: "-1px" }} alt={props.properties.country} src={countryFlag} height="12" />
                    </p>
                    <p style={{ fontSize: "0.8em", marginLeft: '10px' }} display="block">
                        {props.properties.grapes} - {props.properties.alcohol}%
                                </p>



                    {showText ? (

                        <p style={{ fontSize: "0.7em", marginLeft: '10px' }}>
                            {props.properties.description}
                            <Link color="inherit" onClick={handleTextButton}>
                                [Show less]
</Link>
                        </p>
                    ) : (<div>{(props.properties.description.length > 60) ? (<p style={{ fontSize: "0.7em", marginLeft: '10px' }} >


                        {sm ? (props.properties.description.substring(0, 70) + '...') : null}
                        {xs && !sm ? (props.properties.description.substring(0, 40) + '...') : null}
                        <Link color="inherit" onClick={handleTextButton}>
                            [Show more]
</Link>


                    </p>) : (<p style={{ fontSize: "0.7em", marginLeft: '10px' }} >{props.properties.description}</p>)

                    }</div>)}
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

