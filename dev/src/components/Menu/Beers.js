import React from 'react';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


import InfoIcon from '@material-ui/icons/Info';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import {
    apiURL
} from '../../utils/shared';
const axios = require('axios');


// let rows = []



// axios.get("/api/get/beers")
//     .then(function (response) {
//         // handle success

//         for (var prop in response.data) {
//             var item = response.data[prop];

//             rows.push(item);

//         }
//         // console.log(response.data.length)
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     })
//     .then(function () {


//         // always executed
//     })

const theme = createMuiTheme({
    typography: {
        // In Chinese and Japanese the characters are usually larger,
        // so a smaller fontsize may be appropriate.
        fontSize: 11,

    },
});
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));
function Sorter(sortVariable, array){
    if (sortVariable == "title-ascending"){
        array = array.sort( function( a, b ) {
            a = a.title.toLowerCase();
            b = b.title.toLowerCase();
        
            return a < b ? -1 : a > b ? 1 : 0;
        });
        return array
    }
    if (sortVariable == "title-descending"){
        array = array.sort( function( a, b ) {
            a = a.title.toLowerCase();
            b = b.title.toLowerCase();
        
            return b < a ? -1 : b > a ? 1 : 0;
        });
        return array
    }
    if (sortVariable == "brewery-ascending"){
        array = array.sort( function( a, b ) {
            a = a.brewery.toLowerCase();
            b = b.brewery.toLowerCase();
        
            return a < b ? -1 : a > b ? 1 : 0;
        });
        return array
    }
    if (sortVariable == "brewery-descending"){
        array = array.sort( function( a, b ) {
            a = a.brewery.toLowerCase();
            b = b.brewery.toLowerCase();
        
            return b < a ? -1 : b > a ? 1 : 0;
        });
        return array
    }
    if (sortVariable == "alcohol-descending"){
        array = array.sort((c1, c2) => c2.alcohol - c1.alcohol)
        return array
    }
    if (sortVariable == "alcohol-ascending"){
        array = array.sort((c1, c2) => c1.alcohol - c2.alcohol)
        return array
    }
    if (sortVariable == "rating-descending"){
        array = array.sort((c1, c2) => c2.rating - c1.rating)
        return array
    }
    if (sortVariable == "rating-ascending"){
        array = array.sort((c1, c2) => c1.rating - c2.rating)
        return array
    }
    if (sortVariable == "ibu-descending"){
        array = array.sort((c1, c2) => c2.ibu - c1.ibu)
        return array
    }
    if (sortVariable == "ibu-ascending"){
        array = array.sort((c1, c2) => c1.ibu - c2.ibu)
        return array
    }

}

export default function Beers() {
    const classes = useStyles();
    const [rows, setRows] = React.useState([]);
    const [filteredRows, setFilteredRows] = React.useState([]);
    const [searchedRows, setSearchedRows] = React.useState([]);
    const [currentRows, setCurrentRows] = React.useState([]);
    const [state, setState] = React.useState({
        sort: false,
        filter: false
    });
    const [filter, setFilter] = React.useState({
        checkedAlcoholFree: false,
        checkedGlutenFree: false,
        checkedAle: false,
        checkedLager: false,
        checkedWheatBeer: false,
        checkedSour: false,
        checkedStout: false,
        checkedFruity: false,
        checkedIPA: false,
        checkedBelgian: false,
        checkedPorter: false,
    });
    const [value, setValue] = React.useState('title-ascending');
    const [searchValue, setSearchValue] = React.useState('');

  const handleSortChange = (event) => {
    setValue(event.target.value);
    setCurrentRows(Sorter(event.target.value, currentRows))    
  };

    const handleFilterChange = (event) => {
        setFilter({ ...filter, [event.target.name]: event.target.checked });
        let tempRows = [];
        let newRows = [];

        let temparray = ({ ...filter, [event.target.name]: event.target.checked });
        for (var key in temparray) {
            if (key == "checkedAlcoholFree" && temparray[key])
            tempRows = tempRows.concat(rows.filter(row => row.alcohol <= 2.25  ))
            
            if (key == "checkedGlutenFree" && temparray[key])
            tempRows = tempRows.concat(rows.filter(row => row.type.includes("Gluten-Free")))
            
            if (key == "checkedWheatBeer" && temparray[key])
            tempRows = tempRows.concat(rows.filter(row => row.type.includes("Wheat Beer")))
            
            if (key == "checkedAle" && temparray[key])
            tempRows = tempRows.concat(rows.filter(row => row.type.includes("Ale")))
            
            if (key == "checkedLager" && temparray[key])
            tempRows = tempRows.concat(rows.filter(row => row.type.includes("Lager")))
            
            if (key == "checkedBelgian" && temparray[key])
            tempRows = tempRows.concat(rows.filter(row => row.type.includes("Belgian")))
            
            if (key == "checkedSour" && temparray[key])
            tempRows = tempRows.concat(rows.filter(row => row.type.includes("Sour")))
            
            if (key == "checkedIPA" && temparray[key])
            tempRows = tempRows.concat(rows.filter(row => row.type.includes("IPA")))
            
            if (key == "checkedFruity" && temparray[key])
            tempRows = tempRows.concat(rows.filter(row => row.type.includes("Fruit")))
            
            if (key == "checkedPorter" && temparray[key])
            tempRows = tempRows.concat(rows.filter(row => row.type.includes("Porter")))
            
            if (key == "checkedStout" && temparray[key])
            tempRows = tempRows.concat(rows.filter(row => row.type.includes("Stout")))
        }

        if(tempRows.length == 0)
            tempRows=rows;

        setFilteredRows(tempRows);
        tempRows.map(tempRow => 
            searchedRows.map(searchedRow => {
                if (tempRow._id == searchedRow._id){
                    newRows.push(tempRow)
                }
            })

        )
        setCurrentRows(Sorter(value, newRows))

      };
      const handleSearchChange = (event) => {
        setSearchValue(event.target.value.toLowerCase())
        let tempRows = [...rows]
        let newRows = []
        tempRows = rows.filter(row => (row.title.toLowerCase().includes(event.target.value.toLowerCase()) || 
        row.brewery.toLowerCase().includes(event.target.value.toLowerCase()) ))
        setSearchedRows(tempRows);
        tempRows.map(tempRow => 
            filteredRows.map(filteredRow => {
                if (tempRow._id == filteredRow._id){
                    newRows.push(tempRow)
                }
            })

        )
        setCurrentRows(Sorter(value, newRows))
     
      };
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    React.useEffect(() => {
        axios.get(apiURL + "/api/get/beers")
            .then(function (response) {
                // handle success
                let importedRows = []

                for (var prop in response.data) {
                    var item = response.data[prop];

                    importedRows.push(item);

                }
                setRows(importedRows)
                setSearchedRows([...importedRows])
                setFilteredRows([...importedRows])
                setCurrentRows(Sorter(value, [...importedRows]))
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {


                // always executed
            })
    }, []);

    const sortList = (anchor) => (
        <ThemeProvider theme={theme}>
        <Container maxWidth="xs">
            <div
                className={clsx(classes.list, {
                    [classes.fullList]: anchor === 'top' || anchor === 'bottom',
                })}
                role="presentation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
            >
               <FormControl component="fieldset">
               <FormLabel component="legend">Sort by</FormLabel>
  <RadioGroup aria-label="sortVariables" name="sortVariables" value={value} onChange={handleSortChange}>
    <FormControlLabel value="title-ascending" control={<Radio />} label="Title, A-Z" />
    <FormControlLabel value="title-descending" control={<Radio />} label="Title, Z-A" />
    <FormControlLabel value="brewery-ascending" control={<Radio />} label="Brewery, A-Z" />
    <FormControlLabel value="brewery-descending" control={<Radio />} label="Brewery, Z-A" />
    <FormControlLabel value="alcohol-ascending" control={<Radio />} label="Alcohol rate, Ascending" />
    <FormControlLabel value="alcohol-descending" control={<Radio />} label="Alcohol rate, Descending" />
    <FormControlLabel value="rating-ascending" control={<Radio />} label="Untappd rating, Ascending" />
    <FormControlLabel value="rating-descending" control={<Radio />} label="Untappd rating, Descending" />
    <FormControlLabel value="ibu-ascending" control={<Radio />} label="IBU, Ascending" />
    <FormControlLabel value="ibu-descending" control={<Radio />} label="IBU, Descending" />
  </RadioGroup>
</FormControl>
            </div>
        </Container>
        </ThemeProvider>
    );

    const filterList = (anchor) => (
        <ThemeProvider theme={theme}>
        <Container maxWidth="xs">
            <div
                className={clsx(classes.list, {
                    [classes.fullList]: anchor === 'top' || anchor === 'bottom',
                })}
                role="presentation"
                onClick={toggleDrawer("filter", true)}
                onKeyDown={toggleDrawer("filter", true)}
            >
                <FormGroup >
                <FormLabel component="legend">Filter by</FormLabel>
                <FormControlLabel
        control={
          <Checkbox
            checked={filter.checkedAlcoholFree}
            onChange={handleFilterChange}
            name="checkedAlcoholFree"
            color="primary"
          />
        }
        label="Alcohol Free (<2.25%)"
      />
      <Divider />
      <FormControlLabel
        control={
          <Checkbox
            checked={filter.checkedGlutenFree}
            onChange={handleFilterChange}
            name="checkedGlutenFree"
            color="primary"
          />
        }
        label="Gluten Free"
      />
                  <FormControlLabel
        control={
          <Checkbox
            checked={filter.checkedAle}
            onChange={handleFilterChange}
            name="checkedAle"
            color="primary"
          />
        }
        label="Ale"
      />
            <FormControlLabel
        control={
          <Checkbox
            checked={filter.checkedLager}
            onChange={handleFilterChange}
            name="checkedLager"
            color="primary"
          />
        }
        label="Lager"
      />
            <FormControlLabel
        control={
          <Checkbox
            checked={filter.checkedSour}
            onChange={handleFilterChange}
            name="checkedSour"
            color="primary"
          />
        }
        label="Sour"
      />
                  <FormControlLabel
        control={
          <Checkbox
            checked={filter.checkedStout}
            onChange={handleFilterChange}
            name="checkedStout"
            color="primary"
          />
        }
        label="Stout"
      />
                              <FormControlLabel
        control={
          <Checkbox
            checked={filter.checkedIPA}
            onChange={handleFilterChange}
            name="checkedIPA"
            color="primary"
          />
        }
        label="IPA"
      />
                                    <FormControlLabel
        control={
          <Checkbox
            checked={filter.checkedFruity}
            onChange={handleFilterChange}
            name="checkedFruity"
            color="primary"
          />
        }
        label="Fruity"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={filter.checkedPorter}
            onChange={handleFilterChange}
            name="checkedPorter"
            color="primary"
          />
        }
        label="Porter"
      />
                        <FormControlLabel
        control={
          <Checkbox
            checked={filter.checkedWheatBeer}
            onChange={handleFilterChange}
            name="checkedWheatBeer"
            color="primary"
          />
        }
        label="Wheat Beer"
      />
                              <FormControlLabel
        control={
          <Checkbox
            checked={filter.checkedBelgian}
            onChange={handleFilterChange}
            name="checkedBelgian"
            color="primary"
          />
        }
        label="Belgian"
      />
      
                </FormGroup>
            </div>
        </Container>
        </ThemeProvider>
        
    );

    return (
        <Container maxWidth="xs">
            <Paper component="form" className={classes.root}>
                <SearchIcon style={{ fontSize: 24 }} />
                <InputBase
                    className={classes.input}
                    placeholder="Search Beers and Breweries..."
                    onChange={handleSearchChange}
                    value={searchValue}
                />

                <React.Fragment key="sort">
                    <Button onClick={toggleDrawer("sort", true)}>Sort</Button>
                    <Drawer anchor="left" open={state["sort"]} onClose={toggleDrawer("sort", false)}>
                        {sortList("left")}
                    </Drawer>
                </React.Fragment>
                <React.Fragment key="filter">
                    <Button onClick={toggleDrawer("filter", true)}>Filter</Button>
                    <Drawer anchor="left" open={state["filter"]} onClose={toggleDrawer("filter", false)}>
                        {filterList("left")}
                    </Drawer>
                </React.Fragment>

            </Paper>
            <Divider />
            {currentRows.map(function (row) {
                return (<MenuItem key={row._id} properties={row} />)
            })}
        </Container>
    );


}

function MenuItem(props) {

    return (
        <div>
            <ThemeProvider theme={theme}>
            <Accordion>
            <AccordionSummary
            expandIcon={<InfoIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <img src={props.properties.image} width="75" height="75" />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h6" display="inline">
                            {props.properties.title}
                        </Typography>
                        <Typography variant="subtitle1" display="inline">
                            {props.properties.brewery}
                        </Typography>
                        <Typography variant="subtitle2" display="block">
                            {props.properties.type} - {props.properties.alcohol == 0.0 ? ("Alcohol Free") : (props.properties.alcohol + "%") } - {props.properties.ibu == 0 ? ("No IBU") : (props.properties.ibu + " IBU") }
                        </Typography>
                        <Box borderColor="transparent">
                            <Rating name="read-only" value={props.properties.rating} precision={0.1} readOnly />
                            <Typography display="inline">({props.properties.rating})</Typography>
                        </Box>
                        {/* <Rating name="read-only" value={props.properties.rating} readOnly display="block" /> */}
                    </Grid>
    
                </Grid >
            <Divider />
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {props.properties.description}
                </Typography>
            </AccordionDetails>

            </Accordion>
            </ThemeProvider>
        </div>


    );
}



// function ImgMediaCard() {
//     const classes = useStyles();

//     return (
//         <Card className={classes.root}>
//             <CardMedia
//                 className={classes.image}
//                 component="img"
//                 alt="Contemplative Reptile"

//                 image="../../images/beers/gehenna.jpeg"
//                 title="Gehenna"
//             />


//             <div className={classes.details}>

//                 <CardContent>
//                     <div className={classes.names}>
//                         <Typography variant="h5" component="h2" >
//                             Gehenna
//             </Typography>
//                         <Typography className={classes.brewery} variant="subtitle1">
//                             Tempel Brygghus
//             </Typography>
//                     </div>
//                     <Typography variant="body2" color="textSecondary" component="p">
//                     Sour ale dry hopped with the New Zealand hop Motueka. Updated recipe compared to the old edition, with different yeast used and more hops.
//             </Typography>
//                     <div className={classes.details}>
//                         <Typography variant="button" >
//                             Sour
//             </Typography>
//                         <Typography variant="button">
//                             5.2% ABV
//             </Typography>
//                         <Typography variant="button">
//                             No IBU
//             </Typography>
//                     </div>
//                     <div className={classes.details}>

//                         <Typography variant="h6">
//                             3.48/5.00
//             </Typography>
//                         <Typography variant="h6">
//                             50 kr
//             </Typography>
//                     </div>
//                 </CardContent>
//             </div>


//         </Card>
//     );
// }

// const useStyles = makeStyles({
//     root: {
//         display: 'flex',

//     },
//     image: {
//         flex: '1 0 auto',
//         width: 150,
//         height: 150,
//         margin: 10
//     },
//     details: {

//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     names: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'baseline'
//     },
//     brewery: {

//     },
// });
