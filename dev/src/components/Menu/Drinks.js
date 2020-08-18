
import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
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
import { PersonalAppBar, Background, checkImageExists, Sorter } from './menuUtils';
import { AdminContext } from '../Admin/Admin';
// import Box from '@material-ui/core/Box';
// import Chip from '@material-ui/core/Chip';
import './Menu.css';


const axios = require('axios');
const moment = require('moment')


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


export default function Drink(props) {
    document.body.style.background = Background
    document.body.style.backgroundSize = 'cover'
    document.title = "Svantes menu - Drinks"
    const [loading, setLoading] = React.useState(true);
    const [currentRows, setCurrentRows] = React.useState([]);
    const [itemID, setItemID] = React.useState();
    const [itemTitle, setItemTitle] = React.useState("");
    const [itemStock, setItemStock] = React.useState(true);
    const [itemNew, setItemNew] = React.useState(false);
    const [itemLocation, setItemLocation] = React.useState("Inside");
    const [itemSize, setItemSize] = React.useState("");
    const [itemDescription, setItemDescription] = React.useState("");
    const [itemIngredients, setItemIngredients] = React.useState("");
    const [itemType, setItemType] = React.useState("Regular");
    const [itemPrice, setItemPrice] = React.useState("");
    const [itemImage, setItemImage] = React.useState("");
    const [imageExists, setItemImageExists] = React.useState(false);
    const [createWindow, setCreateWindow] = React.useState(false);
    const [editWindow, setEditWindow] = React.useState(false);

    const makeCreateWindowVisible = () => {
        setCreateWindow(true);
    };
    const makeEditWindowVisible = (item) => {
        if (item._id != null)
            setItemID(item._id)
        if (item.title != null)
            setItemTitle(item.title)
            if (item.location != null)
            setItemLocation(item.location)
            if (item.size != null)
            setItemSize(item.size)
        if (item.description != null)
            setItemDescription(item.description)
        if (item.ingredients != null)
            setItemIngredients(item.ingredients)
        if (item.type != null)
            setItemType(item.type)
        if (item.stock != null)
            setItemStock(item.stock)
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
        setItemIngredients("")
        setItemType("Regular")
        setItemLocation("Inside")
        setItemSize("")
        setItemPrice("")
        setItemImage("")
        setItemImageExists(false)
        setCreateWindow(false)
        setEditWindow(false)
    };
    const handleCreateItem = () => {
        let object = {
            drinkTitle: itemTitle,
            drinkDescription: itemDescription,
            drinkIngredients: itemIngredients,
            drinkLocation: itemLocation,
            drinkSize: itemSize,
            drinkType: itemType,
            drinkStock: itemStock,
            drinkNew: itemNew,
            drinkPrice: itemPrice,
            drinkImage: itemImage,
        }
        axios.post('/api/add/drinks', object)
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
            drinkID: itemID,
            drinkTitle: itemTitle,
            drinkDescription: itemDescription,
            drinkIngredients: itemIngredients,
            drinkLocation: itemLocation,
            drinkSize: itemSize,
            drinkType: itemType,
            drinkStock: itemStock,
            drinkNew: itemNew,
            drinkPrice: itemPrice,
            drinkImage: itemImage,
        }
        axios.post('/api/edit/drinks', item)
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
        axios.delete("/api/delete/drinks", {
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
                        >{['Regular', 'Special'].map((form) => (
                            <MenuItem key={form} value={form}>
                                {form}
                            </MenuItem>
                        ))}
                        </TextField>
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
                            label="Alcohol sizes"
                            variant="outlined"
                            helperText="Ex: 4 or 4,6"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Cl</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            value={itemIngredients}
                            onChange={(e) => setItemIngredients(e.target.value)}
                            margin="dense"
                            id="ingredients"
                            label="Ingredients"
                            multiline
                            rows={2}
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
                            <img src={itemImage} alt="Drink" width="100" height="100" />
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
        axios.get("/api/get/drinks")
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
                Loading drinks
    </Typography></div>) : (<div>
                    <PersonalAppBar
                        category="Drinks"
                        logout={props.logout}
                        admin={props.admin}
                        create={makeCreateWindowVisible}
                    />

                    <Divider />
                    <Dialog open={createWindow} onClose={handleCloseWindow} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">New Drink</DialogTitle>

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
                        <DialogTitle id="form-dialog-title">Edit Drink</DialogTitle>
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
                    <Paper elevation={4} style={{ backgroundColor: '#333842' }}>
                    {/* <Alert variant="filled" severity="info">
                            All drinks are served in the inside bar. Choose between 4 cl or 6 cl alcohol.</Alert> */}

                        <h6 style={{ color: 'white', marginBottom: "10px", paddingTop: "10px", textAlign: "center", fontSize: "1em" }} >
                            Specials
    </h6>
                        {currentRows.filter(row => row.type === "Special")
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                            })}</Paper>
                    <Paper elevation={4} style={{ backgroundColor: '#333842' }}>
                        <h6 style={{ color: 'white', marginTop: "15px", marginBottom: "10px", paddingTop: "10px", textAlign: "center", fontSize: "1em" }} >
                            Regular
    </h6>
                        {currentRows.filter(row => row.type === "Regular")
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                            })}</Paper>

                    {/* {currentRows.map(function (row) {
                        return (<MenuItem key={row._id} properties={row} />)
                    })} */}



                </div>
                )}

        </Container>
    );


}

function MenuItemCard(props) {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const xs = useMediaQuery(theme.breakpoints.up('xs'));
    const [showText, setText] = React.useState(false);
    const handleTextButton = () => {
        if (showText === true)
            setText(false)
        else
            setText(true)

    };
    const classes = useStyles();
    const admin = React.useContext(AdminContext)


    return (
        <div>


            <Card className={classes.card}>
                <div className={classes.content}>
                    <Grid container >
                        {!props.properties.stock ? (<img style={{ position: 'absolute', marginLeft: 'auto', marginRight: 'auto', left: "0", right: "0", marginTop: "0px", textAlign: "center" }} alt="new" src="../../images/soldout.png" height="50" />) : (null)}


                        {/* <Grid item xs={1}>
                                <img className={classes.img} src={props.properties.image} alt="logo" width="35" height="35" />
                            </Grid> */}
                        <Grid item xs={10}>
                            <h6 style={{ fontSize: "1em" }} display="block">
                                {props.properties.title}
                            </h6>
                            {/* <Box style={{ marginLeft: "15px"}}>
                                {props.properties.ingredients.split(',').map(function (ingredient) {
                                    return (<Chip  size="small" style={{ marginRight: "3px", marginTop: "3px"}} label={ingredient} />)
                                })}
                                </Box> */}
                            <p style={{ fontSize: "0.9em" }} display="block">
                                {props.properties.ingredients}
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
                            {props.properties.size.split(',').map(function (size) {
                                return (<p style={{ fontSize: "0.8em" }} display="block">
                                    {size.length > 0 ? (size + " cl") : (null)} 
                                </p>)
                            })}


                            {/* <Divider style={{ background: "white", marginTop: "2px", marginBottom: "2px" }} variant='middle'/> */}
                            <h6 style={{ fontSize: "0.8em" }} display="block">
                                {props.properties.location === "Inside/Outside" ? ("Both bars") : (props.properties.location + " bar")}
                            </h6>

                        </Grid>
                        {admin ? (<Grid item xs={12}><hr style={{ color: 'black', backgroundColor: 'black', borderTop: '0.5px solid' }} /> </Grid>) : (null)}
                        {admin ? (<Grid style={{ textAlign: "center" }} item xs={4}>
                            <Button  style={{ color: 'white' }}  size="small" onClick={() => props.delete(props.properties)} startIcon={<DeleteIcon />}>Delete</Button>
                        </Grid>) : (null)}
                        {admin ? (<Grid style={{ textAlign: "center" }} item xs={4}>
                            <Button  style={{ color: 'white' }}  size="small" onClick={() => props.edit(props.properties)} startIcon={<EditIcon />}>Edit</Button>
                        </Grid>) : (null)}
                        {admin ? (<Grid style={{ textAlign: "center" }} item xs={4}>
                            <p style={{ fontSize: "0.9em", color: "white", paddingTop: "3px" }} display="inline">
                                Created: {moment(props.properties.created).format('YYYY-MM-DD')}
                            </p>
                        </Grid>) : (null)}

                    </Grid >
                </div>
            </Card>
        </div>


    );
}

