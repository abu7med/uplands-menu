
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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { PersonalAppBar, Background, checkImageExists, Sorter } from './menuUtils';
import { AdminContext } from '../Admin/Admin';
import './Menu.css';

const moment = require('moment')
const axios = require('axios');

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


export default function Boardgames(props) {
    document.body.style.background = Background
    document.body.style.backgroundSize = 'cover'
    document.title = "Svantes menu - Board games"
    const [loading, setLoading] = React.useState(true);
    const [currentRows, setCurrentRows] = React.useState([]);


    const [itemID, setItemID] = React.useState();
    const [itemTitle, setItemTitle] = React.useState("");
    const [itemDescription, setItemDescription] = React.useState("");
    const [itemType, setItemType] = React.useState("");
    const [itemRank, setItemRank] = React.useState("");
    const [itemImage, setItemImage] = React.useState("");
    const [itemPlayingtime, setItemPlayingtime] = React.useState("");
    const [itemPlayers, setItemPlayers] = React.useState("");
    const [itemLanguage, setItemLanguage] = React.useState("");
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
        if (item.type != null)
            setItemType(item.type)
        if (item.rank != null)
            setItemRank(item.rank)
        if (item.playingtime != null)
            setItemPlayingtime(item.playingtime)
        if (item.players != null)
            setItemPlayers(item.players)
        if (item.language != null)
            setItemLanguage(item.language)
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
        setItemRank("")
        setItemImage("")
        setItemPlayingtime("")
        setItemPlayers("")
        setItemLanguage("")
        setItemImageExists(false)
        setCreateWindow(false)
        setEditWindow(false)
    };
    const handleCreateItem = () => {
        let object = {
            boardgameTitle: itemTitle,
            boardgameDescription: itemDescription,
            boardgameType: itemType,
            boardgameRank: itemRank,
            boardgameImage: itemImage,
            boardgamePlayingtime: itemPlayingtime,
            boardgamePlayers: itemPlayers,
            boardgameLanguage: itemLanguage,
        }
        axios.post('/api/add/boardgames', object)
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
            boardgameID: itemID,
            boardgameTitle: itemTitle,
            boardgameDescription: itemDescription,
            boardgameType: itemType,
            boardgameRank: itemRank,
            boardgameImage: itemImage,
            boardgamePlayingtime: itemPlayingtime,
            boardgamePlayers: itemPlayers,
            boardgameLanguage: itemLanguage,
        }
        axios.post('/api/edit/boardgames', item)
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
        axios.delete("/api/delete/boardgames", {
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
                            value={itemPlayers}
                            onChange={(e) => setItemPlayers(e.target.value)}
                            margin="dense"
                            id="players"
                            label="Players"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <TextField
                            fullWidth
                            value={itemPlayingtime}
                            onChange={(e) => setItemPlayingtime(e.target.value)}
                            margin="dense"
                            id="playingtime"
                            label="Playing time"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">min</InputAdornment>,
                              }}
                        />
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <TextField
                            fullWidth
                            select
                            value={itemLanguage}
                            onChange={(e) => setItemLanguage(e.target.value)}
                            margin="dense"
                            id="language"
                            label="Language"
                            variant="outlined"
                            >        {['Swedish','English'].map((language) => (
                                <MenuItem key={language} value={language}>
                                {language}
                                </MenuItem>
                              ))}
                              </TextField>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <TextField
                            fullWidth
                            value={itemRank}
                            onChange={(e) => setItemRank(e.target.value)}
                            margin="dense"
                            id="rank"
                            label="BGG rank"
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

                    <Grid container justify="center" item xs={12}>

                        {imageExists ? (
                            <img src={itemImage} alt="Board game" width="100" height="100" />
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


    React.useEffect(() => {
        axios.get("/api/get/boardgames")
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
                Loading board games
    </Typography></div>) : (<div>
                    <PersonalAppBar
                        category="Board games"
                        logout={props.logout}
                        admin={props.admin}
                        create={makeCreateWindowVisible}
                    />
                    <Divider />
                    <Dialog open={createWindow} onClose={handleCloseWindow} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">New board game</DialogTitle>

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
                        <DialogTitle id="form-dialog-title">Edit board game</DialogTitle>
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
                        All board games can be found in the inside bar. 10 kr and a deposit are required to borrow a game.</Alert>
                    {currentRows.map(function (row) {
                        return (<MenuItemCard key={row._id} properties={row} delete={deleteItem} edit={makeEditWindowVisible} />)
                    })}



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

                        {/* <Grid item xs={1}>
                                <img className={classes.img} src={props.properties.image} alt="logo" width="35" height="35" />
                            </Grid> */}
                        <Grid item xs={12}>
                            <h6 style={{ fontSize: "1em" }} display="block">
                                {props.properties.title} {props.properties.language.length > 0 ? ("(" + props.properties.language + ")") : null}
                            </h6>
                            <p style={{ fontSize: "0.9em" }} display="block">
                                {props.properties.type} - {props.properties.playingtime} min - {props.properties.players} players
                                </p>
                            <p style={{ fontSize: "0.7em" }} display="block">
                                {props.properties.description}
                            </p>
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

