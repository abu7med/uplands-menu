
import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Popover from '@material-ui/core/Popover';
import { useHistory } from "react-router-dom";
import './Menu.css';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: '45px',
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
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickClock = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseClock = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


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
        <AppBar style={{ background: '#282c34', height: '45px' }} className={classes.appbar} >
                        <Grid container >
                            <Grid item xs={3}  >
                                <IconButton style={{ textAlign: 'left' }} onClick={handleClick} color="inherit" aria-label="menu">
                                    <ArrowBackIosIcon style={{ marginBottom: '20px' }} />
                                    <p style={{ marginTop: '-15px', fontSize: '0.85em' }}>
                                        Menu
    </p>
                                </IconButton>

                            </Grid>
                            <Grid item xs={6} style={{ textAlign: 'center', }} >
                                <p style={{ fontSize: '1em', marginTop: "13px" }}>
                                 Board games
    </p>
                            </Grid>
                            <Grid item xs={3} style={{ textAlign: 'right', marginTop: '0px' }} >
                                <IconButton color="inherit" aria-describedby={id} onClick={handleClickClock}>
                                    <ScheduleIcon />
                                </IconButton>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleCloseClock}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <p style={{ textAlign: "center", paddingTop: "10px" }} >Opening hours</p>
                                    <p style={{ textAlign: "center", paddingTop: "4px" }} >Mon-Thu: 18:00-01:00</p>
                                    <p style={{ textAlign: "center", paddingTop: "4px" }} >Fri-Sat: 18:00-02:00</p>
                                    <p style={{ textAlign: "center", paddingTop: "4px", paddingBottom: "10px", paddingLeft: "10px", paddingRight: "10px" }} >Last order 30 min before closing!</p>
                                </Popover>
                            </Grid>
                        </Grid>
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

