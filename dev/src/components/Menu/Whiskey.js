
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
import { PersonalAppBar, Background, checkImageExists, Sorter } from './menuUtils';
import { AdminContext } from '../Admin/Admin';
import './Menu.css';

const moment = require('moment')
const axios = require('axios');
const country = require('country-data').lookup


const useStyles = makeStyles((theme) => ({


    content: {
        marginTop: '5px',
        marginBottom: '5px',
        marginLeft: '10px',
        marginRight: '10px',
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

}));


export default function Whiskey(props) {
    document.body.style.background = Background
    document.body.style.backgroundSize = 'cover'
    document.title = "Svantes menu - Whiskey"
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

    const [loading, setLoading] = React.useState(true);
    const [currentRows, setCurrentRows] = React.useState([]);

    // const [state, setState] = React.useState({
    //     sort: false,

    // });

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
            if (item.location != null)
            setItemLocation(item.location)
        if (item.description != null)
            setItemDescription(item.description)
        if (item.type != null)
            setItemType(item.type)
        if (item.stock != null)
            setItemStock(item.stock)
        if (item.new != null)
            setItemNew(item.new)
        if (item.country != null)
            setItemCountry(item.country)
        if (item.alcohol != null)
            setItemAlcohol(item.alcohol)
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
        setItemLocation("Inside")
        setItemType("")
        setItemCountry("")
        setItemAlcohol("")
        setItemImage("")

        setItemImageExists(false)
        setCreateWindow(false)
        setEditWindow(false)
    };
    const handleCreateItem = () => {
        let object = {
            whiskeyTitle: itemTitle,
            whiskeyBrewery: itemBrewery,
            whiskeyDescription: itemDescription,
            whiskeyLocation: itemLocation,
            whiskeyType: itemType,
            whiskeyStock: itemStock,
            whiskeyNew: itemNew,
            whiskeyCountry: itemCountry,
            whiskeyAlcohol: itemAlcohol,
            whiskeyImage: itemImage,
        }
        axios.post('/api/add/whiskeys', object)
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
            whiskeyID: itemID,
            whiskeyTitle: itemTitle,
            whiskeyBrewery: itemBrewery,
            whiskeyDescription: itemDescription,
            whiskeyLocation: itemLocation,
            whiskeyType: itemType,
            whiskeyStock: itemStock,
            whiskeyNew: itemNew,
            whiskeyCountry: itemCountry,
            whiskeyAlcohol: itemAlcohol,
            whiskeyImage: itemImage,
        }
        axios.post('/api/edit/whiskeys', item)
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
        axios.delete("/api/delete/whiskeys", {
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
                    <Grid item sm={4} xs={6}>
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
                            label="New whiskey"
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
                            <img src={itemImage} alt="Whiskey" width="100" height="100" />
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
        axios.get("/api/get/whiskeys")
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
                Loading whiskey
    </Typography></div>) : (<div>
                    <PersonalAppBar
                        category="Whiskey"
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
                    <Alert variant="filled" severity="info">
                        All whiskey is priced per Cl.</Alert>
                    {currentRows.map(function (row) {
                        return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                    })}



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
        else if (props.properties.country.length > 0)
            setFlag('../../images/flags/' + country.countries({ name: props.properties.country })[0].alpha2.toLowerCase() + ".png")
    }, [props.properties.country]);

    return (
        <div>


            <Card className={classes.card}>
                <div className={classes.content}>
                    <Grid container >
                        {!props.properties.stock ? (<img style={{ position: 'absolute', marginLeft: 'auto', marginRight: 'auto', left: "0", right: "0", marginTop: "0px", textAlign: "center" }} alt="new" src="../../images/soldout.png" height="50" />) : (null)}


                        {/* <Grid item xs={1}>
                                <img className={classes.img} src={props.properties.image} alt="logo" width="35" height="35" />
                            </Grid> */}
                            <Grid style={{ textAlign: "center" }} item xs={2}>
                               {imageExists ? ( <img style={{ maxWidth: '90%',  height: 'auto', maxHeight: '40px', paddingTop: "2px" }}  src={props.properties.image} alt="logo" />) : (null)}
                            </Grid>
                        <Grid item xs={8}>
                            <h6 style={{ fontSize: "1em" }} display="inline">
                                {props.properties.title} <img style={{ marginLeft: "3px", marginBottom: "-1px" }} alt={props.properties.country} src={countryFlag} height="12" />
                                {props.properties.new ? (<img style={{ position: 'absolute', marginLeft: "5px" }} alt="new" src="../../images/new2.png" height="18" />) : (null)}
                            </h6>

                            <p style={{ fontSize: "0.9em" }} display="block">
                                {props.properties.type} - {props.properties.alcohol}%
                                </p>

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
                        <Grid style={{ textAlign: "center" }} item xs={2} >
 

                            {/* <Divider style={{ background: "white", marginTop: "2px", marginBottom: "2px" }} variant='middle'/> */}
                            <h6 style={{ fontSize: "0.8em" }} display="block">
                                {props.properties.location === "Inside/Outside" ? ("Both bars") : (props.properties.location + " bar")}
                            </h6>

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

                    </Grid >
                </div>
            </Card>
        </div>


    );
}

