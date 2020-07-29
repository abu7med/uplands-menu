
import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import {PersonalAppBar} from './menuUtils';
// import Box from '@material-ui/core/Box';
// import Chip from '@material-ui/core/Chip';
import './Menu.css';


const axios = require('axios');


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: '40px',
        zIndex: '5'
    },

    appbar: {
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

export default function Drink() {
    document.title = "Svantes menu - Drinks"
    const [loading, setLoading] = React.useState(true);
    const [currentRows, setCurrentRows] = React.useState([]);



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
        <Container disableGutters maxWidth="xs" >
            {loading ? (<div style={{ textAlign: 'center', margin: "2px" }}><CircularProgress /><Typography style={{ color: 'white', margin: "2px" }} variant="h6" >
                Loading drinks
    </Typography></div>) : (<div>
        <PersonalAppBar
  category="Drinks"
  />


                    <Divider />

    <Alert variant="filled" severity="info">
    All drinks are served in the inside bar. Choose between 4 cl or 6 cl alcohol.</Alert>
    <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                        Specials:
    </h6>
                    {currentRows.filter(row => row.type === "Special")
                        .map(function (row) {
                            return (<MenuItem key={row._id} properties={row} />)
                        })}
                        <h6 style={{ color: 'white', margin: "6px", textAlign: "center", fontSize: "1em" }} >
                        Regular:
    </h6>
                    {currentRows.filter(row => row.type === "Regular")
                        .map(function (row) {
                            return (<MenuItem key={row._id} properties={row} />)
                        })}
                    
                    {/* {currentRows.map(function (row) {
                        return (<MenuItem key={row._id} properties={row} />)
                    })} */}



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

