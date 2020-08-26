
import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
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
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
// import Chip from '@material-ui/core/Chip';
import Footer from '../Footer/Footer';
import { PersonalAppBar, Background, checkImageExists, Sorter } from './menuUtils';
import { AdminContext } from '../Admin/Admin';
import './Menu.css';
const moment = require('moment')


const axios = require('axios');


const useStyles = makeStyles((theme) => ({

    content: {
        marginTop: '10px',
        marginBottom: '10px',
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


export default function Food(props) {
    document.body.style.background = Background
    document.body.style.backgroundSize = 'cover'
    document.title = "Svantes menu - Food"
    const [loading, setLoading] = React.useState(true);
    const [currentRows, setCurrentRows] = React.useState([]);
    const [itemURL, setItemURL] = React.useState("");
    const [itemID, setItemID] = React.useState();
    const [itemTitle, setItemTitle] = React.useState("");
    const [itemPrice, setItemPrice] = React.useState("");
    const [itemStock, setItemStock] = React.useState(true);
    const [itemExtra, setItemExtra] = React.useState(false);
    const [itemVegan, setItemVegan] = React.useState(false);
    const [itemVegetarian, setItemVegetarian] = React.useState(false);
    const [itemGlutenfree, setItemGlutenfree] = React.useState(false);
    const [itemNew, setItemNew] = React.useState(false);
    const [itemVegandescription, setItemVegandescription] = React.useState("");
    const [itemGlutenfreedescription, setItemGlutenfreedescription] = React.useState("");
    const [itemDescription, setItemDescription] = React.useState("");
    const [itemType, setItemType] = React.useState("Burger");
    const [itemIngredients, setItemIngredients] = React.useState("");
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
        if (item.description != null)
            setItemDescription(item.description)
        if (item.glutenfreedescription != null)
            setItemGlutenfreedescription(item.glutenfreedescription)
        if (item.vegandescription != null)
            setItemVegandescription(item.vegandescription)
        if (item.type != null)
            setItemType(item.type)
        if (item.price != null)
            setItemPrice(item.price)
        if (item.stock != null)
            setItemStock(item.stock)
        if (item.new != null)
            setItemNew(item.new)
        if (item.extra != null)
            setItemExtra(item.extra)
        if (item.vegan != null)
            setItemVegan(item.vegan)
        if (item.vegetarian != null)
            setItemVegetarian(item.vegetarian)
        if (item.glutenfree != null)
            setItemGlutenfree(item.glutenfree)
        if (item.ingredients != null)
            setItemIngredients(item.ingredients)
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
        setItemType("Burger")
        setItemIngredients("")
        setItemGlutenfreedescription("")
        setItemVegandescription("")
        setItemPrice("")
        setItemImage("")
        setItemImageExists(false)
        setCreateWindow(false)
        setEditWindow(false)
    };
    const handleCreateItem = () => {
        let object = {
            foodTitle: itemTitle,
            foodDescription: itemDescription,
            foodIngredients: itemIngredients,
            foodGlutenfreedescription: itemGlutenfreedescription,
            foodVegandescription: itemVegandescription,
            foodExtra: itemExtra,
            foodVegan: itemVegan,
            foodVegetarian: itemVegetarian,
            foodGlutenfree: itemGlutenfree,
            foodType: itemType,
            foodStock: itemStock,
            foodNew: itemNew,
            foodPrice: itemPrice,
            foodImage: itemImage,
        }
        axios.post('/api/add/foods', object)
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
            foodID: itemID,
            foodTitle: itemTitle,
            foodDescription: itemDescription,
            foodGlutenfreedescription: itemGlutenfreedescription,
            foodVegandescription: itemVegandescription,
            foodExtra: itemExtra,
            foodVegan: itemVegan,
            foodVegetarian: itemVegetarian,
            foodGlutenfree: itemGlutenfree,
            foodIngredients: itemIngredients,
            foodType: itemType,
            foodStock: itemStock,
            foodNew: itemNew,
            foodPrice: itemPrice,
            foodImage: itemImage,
        }
        axios.post('/api/edit/foods', item)
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
        axios.delete("/api/delete/foods", {
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
                            select
                            value={itemType}
                            onChange={(e) => setItemType(e.target.value)}
                            margin="dense"
                            id="type"
                            label="Type"
                            variant="outlined"
                        >        >{['Burger', 'Salad', 'Dessert', 'Snacks'].map((form) => (
                            <MenuItem key={form} value={form}>
                                {form}
                            </MenuItem>
                        ))}
                        </TextField>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <TextField
                            fullWidth
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                            margin="dense"
                            id="price"
                            label="Price"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Kr</InputAdornment>,
                            }}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField
                            fullWidth
                            value={itemIngredients}
                            onChange={(e) => setItemIngredients(e.target.value)}
                            margin="dense"
                            id="Ingredients"
                            label="Ingredients"
                            multiline
                            rows={2}
                            variant="outlined"
                        />
                    </Grid> */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            value={itemDescription}
                            onChange={(e) => setItemDescription(e.target.value)}
                            margin="dense"
                            id="description"
                            label="Description"
                            multiline
                            rows={2}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            value={itemVegandescription}
                            onChange={(e) => setItemVegandescription(e.target.value)}
                            margin="dense"
                            id="vegandescription"
                            label="Optional vegan description"
                            multiline
                            rows={2}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            value={itemGlutenfreedescription}
                            onChange={(e) => setItemGlutenfreedescription(e.target.value)}
                            margin="dense"
                            id="glutenfreedescription"
                            label="Optional gluten free description"
                            multiline
                            rows={2}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: 'center' }}>
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={itemVegetarian}
                                onChange={(e) => setItemVegetarian(e.target.checked)}
                                name="stock" />}
                            label="Vegetarian"
                            style={{ marginTop: '7px' }}

                        />
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: 'center' }}>
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={itemVegan}
                                onChange={(e) => setItemVegan(e.target.checked)}
                                name="stock" />}
                            label="Vegan"
                            style={{ marginTop: '7px' }}

                        />
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: 'center' }}>
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={itemGlutenfree}
                                onChange={(e) => setItemGlutenfree(e.target.checked)}
                                name="stock" />}
                            label="Gluten free"
                            style={{ marginTop: '7px' }}

                        />
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: 'center' }}>
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={itemExtra}
                                onChange={(e) => setItemExtra(e.target.checked)}
                                name="stock" />}
                            label="Side item"
                            style={{ marginTop: '7px' }}

                        />
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: 'center' }}>
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={itemNew}
                                onChange={(e) => setItemNew(e.target.checked)}
                                name="stock" />}
                            label="New food"
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
                            <img src={itemImage} alt="Food" width="100" height="100" />
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
        axios.get("/api/get/foods")
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
                Loading food
    </Typography></div>) : (<div>
                    <PersonalAppBar
                        category="Food"
                        logout={props.logout}
                        admin={props.admin}
                        create={makeCreateWindowVisible}
                    />


                    <Divider />
                    <Dialog open={createWindow} onClose={handleCloseWindow} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">New Food</DialogTitle>

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
                        <DialogTitle id="form-dialog-title">Edit Food</DialogTitle>
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
                        <h3 style={{ color: 'white', marginTop: "10px", paddingBottom: "10px", paddingTop: "10px", textAlign: "center" }}  >
                            Burgers (18:00-22:00)
    </h3>
                        {/* <Alert variant="filled" severity="info">
                            All burgers are served on a brioche bun with a side of pommes or salad. </Alert> */}
                        {currentRows.filter(row => (row.type === "Burger" && !row.extra))
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                            })}
                        {currentRows.filter(row => (row.type === "Burger" && row.extra))
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                            })}
                    </Paper >
                    <Paper elevation={4} style={{ backgroundColor: '#333842' }}>
                        <h3 style={{ color: 'white', marginTop: "10px", paddingBottom: "10px", paddingTop: "10px", textAlign: "center" }}  >
                            Salads (18:00-22:00)
    </h3>
                        {currentRows.filter(row => row.type === "Salad")
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                            })}</Paper >
                    <Paper elevation={4} style={{ backgroundColor: '#333842' }}>
                        <h3 style={{ color: 'white', marginTop: "10px", paddingBottom: "10px", paddingTop: "10px", textAlign: "center" }}  >
                            Snacks
    </h3>
                        {currentRows.filter(row => row.type === "Snacks")
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                            })}</Paper >
                    <Paper elevation={4} style={{ backgroundColor: '#333842', marginBottom: "10px" }}>
                        <h3 style={{ color: 'white', marginTop: "10px", paddingBottom: "10px", paddingTop: "10px", textAlign: "center" }} >
                            Desserts
    </h3>
                        {currentRows.filter(row => row.type === "Dessert")
                            .map(function (row) {
                                return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                            })}</Paper >

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
        <div>


            <Card className={classes.card}>
                <div className={classes.content}>
                    <Grid container >
                        {!props.properties.stock ? (<img style={{ position: 'absolute', marginLeft: 'auto', marginRight: 'auto', left: "0", right: "0", marginTop: "0px", textAlign: "center" }} alt="new" src="../../images/soldout.png" height="50" />) : (null)}

                        {/* <Grid item xs={2}>
                                <img className={classes.img} src={props.properties.image} alt="logo" width="50" height="50" />
                            </Grid> */}
                        <Grid item xs={10}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}>
                                {props.properties.extra ? (<AddIcon style={{ marginRight: "2px" }}/>) : (null)}
                                <h6 style={{ fontSize: "1em", marginRight: "10px" }}>
                                    {props.properties.title}

                                    {props.properties.new ? (<img style={{  float: 'right', marginLeft: "5px" }} alt="new" src="../../images/new2.png" height="18" />) : (null)}
                                    {/* {props.properties.vegan ? (<p><img style={{  float: 'left', marginLeft: "5px" }} alt="new" src="../../images/vegan2.png" height="18" /><i> Vegan </i> </p>) : (null)} */}

                                </h6>
                                {props.properties.vegan ? (<span style={{ fontSize: "0.9em", marginRight: "10px" }} >
                                <i>Vegan</i>
                                <img style={{  float: 'left', marginRight: "2px" }} alt="new" src="../../images/vegan.png" height="18" />
                            </span>) : (null)}
                            {!props.properties.vegan && props.properties.vegetarian ? (<span style={{ fontSize: "0.9em", marginRight: "10px" }} >
                                <i>Vegetarian</i>
                                <img style={{  float: 'left', marginRight: "2px" }} alt="new" src="../../images/vegetarian.png" height="18" />
                            </span>) : (null)}
                            {props.properties.glutenfree ? (<span style={{ fontSize: "0.9em", marginRight: "10px" }} >
                                <i>Gluten-Free</i>
                                <img style={{  float: 'left', marginRight: "2px" }} alt="new" src="../../images/glutenfree.png" height="18" />
                            </span>) : (null)}
                            </div>

                            {/* <h6 style={{fontSize: "1em" }}>
                            <AddIcon style={{ margin: "0px" }}   />
                                {props.properties.title}
                                {props.properties.new ? (<img style={{ position: 'absolute', marginLeft: "5px" }} alt="new" src="../../images/new2.png" height="18" />) : (null)}

                            </h6> */}
                            {/* {props.properties.ingredients.split(',').map(function (ingredient) {
                                    return (<Chip  size="small" style={{ marginRight: "3px", marginTop: "3px"}} label={ingredient} />)
                                })} */}
                                
                                {/* {props.properties.vegan ? (<p><img style={{  marginRight: "2px"}} alt="vegan" src="../../images/vegan.png"  height="15"/ ><span style={{ fontSize: "0.8em", marginRight: "5px"}}  ><i> Vegan</i></span></p>) : (null)}
                             */}
                            <p style={{ fontSize: "0.9em" }} display="block">
                                {props.properties.description}
                            </p>
                            {props.properties.vegandescription.length > 0 ? <p style={{ fontSize: "0.9em" }} display="block">
                            <img style={{  float: 'left', marginRight: "4px" }} alt="new" src="../../images/vegan.png" height="18" />
                                <b>Vegan option: </b>{props.properties.vegandescription}
                            </p> : (null)}
                            {props.properties.glutenfreedescription.length > 0 ? <p style={{ fontSize: "0.9em" }} display="block">
                            <img style={{  float: 'left', marginRight: "4px" }} alt="new" src="../../images/glutenfree.png" height="18" />
                            <b>Gluten free option: </b>{props.properties.glutenfreedescription}
                            </p> : (null)}
                            {/* <p style={{ fontSize: "0.8em" }} display="block">
                                {props.properties.description}
                            </p> */}
                        </Grid>
                        <Grid item xs={2}>
                            <h6 style={{ textAlign: "center", fontSize: "1em" }} display="block">
                                {props.properties.price} kr
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

