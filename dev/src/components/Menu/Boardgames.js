
import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import './Menu.css';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: '48px',
        zIndex: '5'
    },

    appbar: {
        fontFamily: 'roboto',
        fontSize: 20,
        position: 'sticky',

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

    title: {
        flexGrow: 1,
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


}

export default function Boardgames() {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = React.useState(true);
    const [currentRows, setCurrentRows] = React.useState([]);



    const handleClick = (event) => {
        history.push("/");
    }


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
        <Container disableGutters maxWidth="xs" >
            {loading ? (<div style={{ textAlign: 'center', margin: "2px" }}><CircularProgress /><Typography style={{ color: 'white', margin: "2px" }} variant="h6" >
                Loading board games
    </Typography></div>) : (<div>
                    <AppBar style={{ background: '#282c34' }} className={classes.appbar} >
                        <Toolbar variant="dense">
                            <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <ArrowBackIosIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.appbar}>
                                Board games
    </Typography>

                        </Toolbar>
                    </AppBar>


                    <Divider />
                    
    <Alert variant="filled" severity="info">
    All board games can be found in the inside bar. 10 kr and a deposit are required to borrow a game.</Alert>
                    {currentRows.map(function (row) {
                        return (<MenuItem key={row._id} properties={row} />)
                    })}
                    
                    

                </div>
                )}

        </Container>
    );


}

function MenuItem(props) {
    const classes = useStyles();


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
                                    {props.properties.title} {props.properties.language.length > 0 ? ("("+props.properties.language+")") : null}
                                </h6>
                                <p style={{ fontSize: "0.9em" }}  display="block">
                                {props.properties.type} - {props.properties.playingtime} min - {props.properties.players} players
                                </p>
                                <p style={{ fontSize: "0.7em" }} display="block">
                                    {props.properties.description}
                                </p>
                                </Grid>
  
                    </Grid >
                </div>
            </Card>
        </div>


    );
}

