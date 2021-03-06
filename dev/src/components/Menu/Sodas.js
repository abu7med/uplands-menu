
import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
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
import Footer from '../Footer/Footer';
import { PersonalAppBar, Background, checkImageExists, Sorter } from './menuUtils';
import { AdminContext } from '../Admin/Admin';
import './Menu.css';


const axios = require('axios');
const moment = require('moment')


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


export default function Sodas(props) {
    document.body.style.background = Background
    document.body.style.backgroundSize = 'cover'
    document.title = "Svantes menu - Sodas"
    const [loading, setLoading] = React.useState(true);
    const [currentRows, setCurrentRows] = React.useState([]);
    const [itemID, setItemID] = React.useState();
    const [itemTitle, setItemTitle] = React.useState("");
    const [itemStock, setItemStock] = React.useState(true);
    const [itemBrewery, setItemBrewery] = React.useState("");
    const [itemDescription, setItemDescription] = React.useState("");
    const [itemType, setItemType] = React.useState("");
    const [itemPrice, setItemPrice] = React.useState("");
    const [itemImage, setItemImage] = React.useState("");
    const [itemForm, setItemForm] = React.useState("Bottle");
    const [itemSize, setItemSize] = React.useState("");
    const [itemLocation, setItemLocation] = React.useState("Inside");
    const [imageExists, setItemImageExists] = React.useState(false);
    const [createWindow, setCreateWindow] = React.useState(false);
    const [editWindow, setEditWindow] = React.useState(false);


    React.useEffect(() => {
        axios.get("/api/get/sodas")
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
        if (item.description != null)
            setItemDescription(item.description)
        if (item.type != null)
            setItemType(item.type)
        if (item.stock != null)
            setItemStock(item.stock)
        if (item.size != null)
            setItemSize(item.size)
        if (item.location != null)
            setItemLocation(item.location)
        if (item.price != null)
            setItemPrice(item.price)
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
        setItemDescription("")
        setItemType("")
        setItemPrice("")
        setItemSize("")
        setItemLocation("Inside")
        setItemImage("")
        setItemImageExists(false)
        setCreateWindow(false)
        setEditWindow(false)
    };
    const handleCreateItem = () => {
        let object = {
            sodaTitle: itemTitle,
            sodaDescription: itemDescription,
            sodaType: itemType,
            sodaSize: itemSize,
            sodaLocation: itemLocation,
            sodaStock: itemStock,
            sodaPrice: itemPrice,
            sodaImage: itemImage,
        }
        axios.post('/api/add/sodas', object)
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
            sodaID: itemID,
            sodaTitle: itemTitle,
            sodaDescription: itemDescription,
            sodaSize: itemSize,
            sodaLocation: itemLocation,
            sodaType: itemType,
            sodaStock: itemStock,
            sodaPrice: itemPrice,
            sodaImage: itemImage,
        }
        axios.post('/api/edit/sodas', item)
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
        axios.delete("/api/delete/sodas", {
            data: [item]
        });
        if (currentRows.indexOf(item) > -1) {
            currentRows.splice(currentRows.indexOf(item), 1);
            setCurrentRows([...currentRows])
        }



    };

    const createDialogContent = () => {
        return (<DialogContent>
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
                        value={itemPrice}
                        onChange={(e) => setItemPrice(e.target.value)}
                        margin="dense"
                        id="price"
                        label="Price"
                        variant="outlined"
                    />
                </Grid>
                <Grid item sm={6} xs={6}>
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
                <Grid item sm={6} xs={6}>
                    <TextField
                        fullWidth
                        value={itemSize}
                        onChange={(e) => setItemSize(e.target.value)}
                        margin="dense"
                        id="size"
                        label="Size"
                        variant="outlined"
                        helperText=""
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



                <Grid item xs={12} style={{ textAlign: 'center' }}>
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
                        <img src={itemImage} alt="Soda" width="100" height="100" />
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
                Loading sodas
    </Typography></div>) : (<div>
                    <PersonalAppBar
                        category="Sodas"
                        logout={props.logout}
                        admin={props.admin}
                        create={makeCreateWindowVisible}
                    />


                    <Divider />
                    <Dialog open={createWindow} onClose={handleCloseWindow} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">New Soda</DialogTitle>

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
                        <DialogTitle id="form-dialog-title">Edit Soda</DialogTitle>
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
                    {/* <Alert variant="filled" severity="info">
                        10 kr per 330 ml bottle. Served in both bars.</Alert> */}
                    <Paper elevation={4} style={{ backgroundColor: '#333842' }}>
                        <h6 style={{ color: 'white', marginTop: "10px", marginBottom: "10px", paddingTop: "10px", textAlign: "center", fontSize: "1em" }} >
                            On bottle
    </h6>
                        {currentRows.map(function (row) {
                            return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                        })}</Paper>
<Footer />
                </div>
                )}

        </Container>
    );


}

function MenuItemCard(props) {
    const classes = useStyles();
    const admin = React.useContext(AdminContext)


    return (

        <Card className={classes.card}>
            <Grid container >
                {!props.properties.stock ? (<img style={{ position: 'absolute', marginLeft: 'auto', marginRight: 'auto', left: "0", right: "0", marginTop: "0px", textAlign: "center" }} alt="new" src="../../images/soldout.png" height="25" />) : (null)}
                {/* <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: "center", maxHeight: '60px' }} item xs={1}>

                    <img style={{ maxWidth: '100%', height: 'auto', maxHeight: '60px' }} src={props.properties.image} alt="logo" />
                </Grid> */}
                <Grid item xs={12}>
                    <div style={{ float: "right", textAlign: "center" }}>
                        <h6 style={{ fontSize: "1em" }} variant="h6" display="block">
                            {props.properties.price} kr
                            </h6>

                        {props.properties.size.split(',').map(function (size) {
                            return (<p style={{ fontSize: "0.8em" }} display="block">
                                {size} ml
                                </p>)
                        })}


                        {/* <Divider style={{ background: "white", marginTop: "2px", marginBottom: "2px" }} variant='middle'/> */}
                        <h6 style={{ fontSize: "0.8em" }} display="block">
                            {props.properties.location === "Inside/Outside" ? ("Both bars") : (props.properties.location + " bar")}
                        </h6>

                    </div>
                    <h6 style={{ fontSize: "1em" }} display="block">
                        {props.properties.title}
                    </h6>

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

