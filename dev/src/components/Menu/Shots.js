
import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
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


const axios = require('axios');
const moment = require('moment')
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


export default function Shots(props) {
    document.body.style.background = Background
    document.body.style.backgroundSize = 'cover'
    document.title = "Svantes menu - Shots"
    const [loading, setLoading] = React.useState(true);
    const [displayPrices, setDisplayPrices] = React.useState(false);
    const [warningNotInside, setWarningNotInside] = React.useState(false);
    const [warningLocationNotEnabled, setWarningLocationNotEnabled] = React.useState(false);
    const [currentRows, setCurrentRows] = React.useState([]);
    const [itemID, setItemID] = React.useState();
    const [itemTitle, setItemTitle] = React.useState("");
    const [itemStock, setItemStock] = React.useState(true);
    const [itemNew, setItemNew] = React.useState(false);
    const [itemBrewery, setItemBrewery] = React.useState("");
    const [itemDescription, setItemDescription] = React.useState("");
    const [itemType, setItemType] = React.useState("");
    const [itemPrice, setItemPrice] = React.useState("");
    const [itemAlcohol, setItemAlcohol] = React.useState("");
    const [itemImage, setItemImage] = React.useState("");
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

    React.useEffect(() => {


        axios.get("/api/get/shots")
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
        if (item.price != null)
            setItemPrice(item.price)
        if (item.new != null)
            setItemNew(item.new)
        if (item.country != null)
            setItemCountry(item.country)
        if (item.alcohol != null)
            setItemAlcohol(item.alcohol)
        if (item.location != null)
            setItemLocation(item.location)
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
        setItemPrice("")
        setItemType("")
        setItemCountry("")
        setItemAlcohol("")
        setItemImage("")
        setItemLocation("")
        setItemImageExists(false)
        setCreateWindow(false)
        setEditWindow(false)
    };
    const handleCreateItem = () => {
        let object = {
            shotTitle: itemTitle,
            shotBrewery: itemBrewery,
            shotDescription: itemDescription,
            shotType: itemType,
            shotStock: itemStock,
            shotPrice: itemPrice,
            shotNew: itemNew,
            shotCountry: itemCountry,
            shotAlcohol: itemAlcohol,
            shotImage: itemImage,
            shotLocation: itemLocation,
        }
        axios.post('/api/add/shots', object)
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
            shotID: itemID,
            shotTitle: itemTitle,
            shotBrewery: itemBrewery,
            shotDescription: itemDescription,
            shotType: itemType,
            shotStock: itemStock,
            shotPrice: itemPrice,
            shotNew: itemNew,
            shotCountry: itemCountry,
            shotAlcohol: itemAlcohol,
            shotImage: itemImage,
            shotLocation: itemLocation,
        }
        axios.post('/api/edit/shots', item)
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
        axios.delete("/api/delete/shots", {
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
                    <Grid item sm={4} xs={12}>
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
                            value={itemBrewery}
                            onChange={(e) => setItemBrewery(e.target.value)}
                            margin="dense"
                            id="producer"
                            label="Producer"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                            margin="dense"
                            id="price"
                            label="Price"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">kr</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
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



                    <Grid item xs={6} style={{ textAlign: 'center' }}>
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={itemNew}
                                onChange={(e) => setItemNew(e.target.checked)}
                                name="stock" />}
                            label="New shot"
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
                            <img src={itemImage} alt="Liquor" width="100" height="100" />
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
                Loading shots
    </Typography></div>) : (<div>
                    <PersonalAppBar
                        category="Shots"
                        logout={props.logout}
                        admin={props.admin}
                        create={makeCreateWindowVisible}
                    />


                    <Divider />
                    <Dialog open={createWindow} onClose={handleCloseWindow} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">New Liquor</DialogTitle>

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
                        <DialogTitle id="form-dialog-title">Edit Liquor</DialogTitle>
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
                    {/* <Alert variant="filled" severity="info">
                        All shots are served in 4 cl cups.</Alert> */}
                        {currentRows.map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}
                    {/* <Paper elevation={4} style={{ backgroundColor: '#333842' }}>


                        <h3 style={{ color: 'white', marginTop: "10px", paddingBottom: "10px", paddingTop: "10px", textAlign: "center" }} >
                            Tequila
    </h3>
                        {currentRows.filter(row => row.type.toLowerCase().includes("tequila"))
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}</Paper>
                    <Paper elevation={4} style={{ backgroundColor: '#333842' }}>

                        <h3 style={{ color: 'white', marginTop: "10px", paddingBottom: "10px", paddingTop: "10px", textAlign: "center" }} >
                            Vodka
    </h3>
                        {currentRows.filter(row => row.type.toLowerCase().includes("vodka"))
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}</Paper>
                    <Paper elevation={4} style={{ marginBottom: "10px", backgroundColor: '#333842' }}>


                        <h3 style={{ color: 'white', marginTop: "10px", paddingTop: "10px", paddingBottom: "10px", textAlign: "center" }} >
                            Liqueur
    </h3>
                        {currentRows.filter(row => !row.type.toLowerCase().includes("tequila") && !row.type.toLowerCase().includes("vodka"))
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} displayPrices={displayPrices} />)
                            })}</Paper> */}


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
    const classes = useStyles();
    const admin = React.useContext(AdminContext)
    const [showText, setText] = React.useState(false);
    const [countryFlag, setFlag] = React.useState("");
    const [pictureOpen, setPictureOpen] = React.useState(false);
    const openPicture = () => {
        setPictureOpen(!pictureOpen);
    };
    const closePicture = () => {
        setPictureOpen(false);
    };
    const handleTextButton = () => {
        if (showText === true)
            setText(false)
        else
            setText(true)

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
            <Grid container >
                <Backdrop style={{ zIndex: 5 }} open={pictureOpen} onClick={closePicture}>
                    <img style={{ maxWidth: '75%', height: 'auto', maxHeight: '70vh' }} src={props.properties.image} alt="logo" />
                </Backdrop>
                {!props.properties.stock ? (<img style={{ position: 'absolute', marginLeft: 'auto', marginRight: 'auto', left: "0", right: "0", marginTop: "0px", textAlign: "center" }} alt="new" src="../../images/soldout.png" height="45" />) : (null)}
                <Grid onClick={openPicture} style={{ display: 'flex', alignItems: 'center', justifyContent: "center", maxHeight: '60px' }} item xs={1}>

                    <img style={{ maxWidth: '100%', height: 'auto', maxHeight: '60px' }} src={props.properties.image} alt="logo" />
                </Grid>
                <Grid item xs={11}>
                    <div style={{ float: "right", textAlign: "right" }}>
                        {props.displayPrices || admin ? (
                            <h6 style={{ fontSize: "1em" }} display="block">
                                {props.properties.price} kr
                                </h6>) : (null)}
                        {/* <Divider style={{ background: "white", marginTop: "2px", marginBottom: "2px" }} variant='middle'/> */}
                        <h6 style={{ fontSize: "0.8em" }} display="block">
                            {props.properties.location === "Inside/Outside" ? ("Both bars") : (props.properties.location + " bar")}
                        </h6>

                        {/* <Rating name="read-onsly" value={props.properties.rating} readOnly display="block" /> */}
                    </div>
                    <h6 style={{ fontSize: "1em", marginLeft: '10px' }} display="block">
                        {props.properties.title} <img style={{ marginLeft: "3px", marginBottom: "-1px" }} alt={props.properties.country} src={countryFlag} height="12" />
                        {props.properties.new ? (<img style={{ position: 'absolute', marginLeft: "5px" }} alt="new" src="../../images/new2.png" height="18" />) : (null)}

                    </h6>
                    <p style={{ fontSize: "0.9em", marginLeft: '10px' }} display="block">
                        {props.properties.type} - {props.properties.alcohol}%
                                </p>

                    {showText ? (

                        <p style={{ fontSize: "0.7em", marginLeft: '10px' }}>
                            {props.properties.description}
                            <Link color="inherit" onClick={handleTextButton}>
                                [Show less]
</Link>
                        </p>
                    ) : (<div>{(props.properties.description.length > 60) ? (<p style={{ fontSize: "0.7em", marginLeft: '10px' }} >


                        {sm ? (props.properties.description.substring(0, 80) + '...') : null}
                        {xs && !sm ? (props.properties.description.substring(0, 50) + '...') : null}
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

