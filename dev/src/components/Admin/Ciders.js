import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import EditIcon from '@material-ui/icons/Edit';
import Skeleton from '@material-ui/lab/Skeleton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {getComparator, stableSort, useToolbarStyles, EnhancedTableHead} from './tableUtils';

import {
  apiURL
} from '../../utils/shared';
const axios = require('axios');
const moment = require('moment')


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  button: {

    margin: theme.spacing(1),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  mainItems: {
    marginTop: 20,
    marginBottom: 20,
  },
}));

let initialrows = []
axios.get(apiURL + "/api/get/ciders")
  .then(function (response) {
    // handle success

    for (var prop in response.data) {
      var item = response.data[prop];

      initialrows.push(item);
    }
    // console.log(response.data.length)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {


    // always executed
  });

//   function imageExists(image_url){

//     var http = new XMLHttpRequest();

//     http.open('HEAD', image_url, false);
//     http.send();

//     return http.status != 403;

// }
// console.log(imageExists("https://untappd.akamaized.net/site/cider_logos/cider-3634240_8206f_sm.jpeg"))

function checkImageExists(imageUrl, callBack) {
  var imageData = new Image();
  imageData.onload = function() {
  callBack(true);
  };
  imageData.onerror = function() {
  callBack(false);
  };
  imageData.src = imageUrl;
  }

export default function Ciders() {

  const [untappdURL, setURL] = React.useState("");
  const [ciderID, setID] = React.useState();
  const [ciderTitle, setTitle] = React.useState("");
  const [ciderStock, setStock] = React.useState(true);
  const [ciderBrewery, setBrewery] = React.useState("");
  const [ciderDescription, setDescription] = React.useState("");
  const [ciderType, setType] = React.useState("");
  const [ciderRating, setRating] = React.useState("");
  const [ciderPrice, setPrice] = React.useState("");
  const [ciderAlcohol, setAlcohol] = React.useState("");
  const [ciderImage, setImage] = React.useState("");
  const [ciderForm, setForm] = React.useState("");
  const [ciderSize, setSize] = React.useState("");
  const [ciderCountry, setCountry] = React.useState("");
  const [ciderLocation, setLocation] = React.useState("");
  const [imageExists, setImageExists] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  //table
  const [rows, setRows] = React.useState([...initialrows]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(initialrows.length);

  const classes = useStyles();

  const classesToolbar = useToolbarStyles();


  const deleteRows = (event) => {
    axios.delete(apiURL + "/api/delete/ciders", {
      data: selected
    });
    for (var i = 0; i < initialrows.length; i++) {
      var obj = initialrows[i];
  
      if (selected.indexOf(obj._id) !== -1) {
        initialrows.splice(i, 1);
          i--;
      }
  }
  setRows([...initialrows])
  setSelected([])

  };
  //create new item functions

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setURL("")
    setTitle("")
    setBrewery("")
    setDescription("")
    setType("")
    setRating("")
    setPrice("")
    setCountry("")
    setAlcohol("")
    setImage("")
    setForm("")
    setSize("")
    setLocation("")
    setImageExists(false)
    setOpen(false);
    setEditOpen(false);
    setRowsPerPage(initialrows.length)
  };

  const handleCreate = () => {
    let ciderItem = {
      ciderTitle: ciderTitle,
      ciderBrewery: ciderBrewery,
      ciderDescription: ciderDescription,
      ciderStock: ciderStock,
      ciderType: ciderType,
      ciderRating: ciderRating,
      ciderPrice: ciderPrice,
      ciderCountry: ciderCountry,
      ciderAlcohol: ciderAlcohol,
      ciderImage: ciderImage,
      ciderForm: ciderForm,
      ciderLocation: ciderLocation,
      ciderSize: ciderSize,
      ciderUntappd: untappdURL
    }
    axios.post(apiURL + '/api/add/ciders', ciderItem)
      .then(function (response) {
        initialrows.push(response.data);
        setRows([...initialrows])
      })
      .catch(function (error) {
        console.log(error);
      });
      handleClose()


  };

  
  const handleEdit = () => {
    let ciderItem = {
      ciderID : ciderID,
      ciderTitle: ciderTitle,
      ciderBrewery: ciderBrewery,
      ciderDescription: ciderDescription,
      ciderStock: ciderStock,
      ciderType: ciderType,
      ciderRating: ciderRating,
      ciderPrice: ciderPrice,
      ciderCountry: ciderCountry,
      ciderAlcohol: ciderAlcohol,
      ciderImage: ciderImage,
      ciderForm: ciderForm,
      ciderLocation: ciderLocation,
      ciderSize: ciderSize,
      ciderUntappd: untappdURL
    }
    let initialrows = []
    axios.post(apiURL + '/api/edit/ciders', ciderItem)
      .then(function (response) {
        for (var prop in response.data) {
          var item = response.data[prop];
    
          initialrows.push(item);
        }
        setRows(initialrows)

      })
      .catch(function (error) {
        console.log(error);
      });
    setID(0)
    handleClose()



  };
  const handleImport = () => {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const untappdID = untappdURL.substring(untappdURL.lastIndexOf('/') + 1)

    axios.get("https://api.untappd.com/v4/beer/info/"+untappdID+"?client_id=00C637D891758676D4988D6A67AB581C07F2B2AF&client_secret=453BE6625A63443A627189178B9DC6E4265C2B47&compact=true")
      .then(function (response) {
        // handle success

        setTitle(response.data.response.beer.beer_name);
        setBrewery(response.data.response.beer.brewery.brewery_name);
        setType(response.data.response.beer.beer_style);
        setAlcohol(response.data.response.beer.beer_abv);
        setRating(response.data.response.beer.weighted_rating_score);
        setDescription(response.data.response.beer.beer_description);
        setImage(response.data.response.beer.beer_label);
        setCountry(response.data.response.beer.brewery.country_name);
        checkImageExists(response.data.response.beer.beer_label, function(existsImage) {
          if(existsImage === true) {
            setImageExists(true)
          }
          else {
            setImageExists(false)
          }
          });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  

  };

  const handleImageChange = (event) => {
    setImage(event.target.value)
    checkImageExists(event.target.value, function(existsImage) {
      if(existsImage === true) {
        setImageExists(true)
      }
      else {
        setImageExists(false)
      }
      });

  };
  //table functions

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {

    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleEditOpen = (event, row) => {
    if(row._id != null)
    setID(row._id)
    if(row.untappd != null)
    setURL(row.untappd)
    if(row.title != null)
    setTitle(row.title)
    if(row.stock != null)
    setStock(row.stock)
    if(row.brewery != null)
    setBrewery(row.brewery)
    if(row.description != null)
    setDescription(row.description)
    if(row.type != null)
    setType(row.type)
    if(row.rating != null)
    setRating(row.rating)
    if(row.country != null)
    setCountry(row.country)
    if(row.price != null)
    setPrice(row.price)
    if(row.alcohol != null)
    setAlcohol(row.alcohol)
    if(row.form != null)
    setForm(row.form)
    if(row.location != null)
    setLocation(row.location)
    if(row.size != null)
    setSize(row.size)
    if(row.image != null)
    setImage(row.image)
    checkImageExists(row.image, function(existsImage) {
      if(existsImage === true) {
        setImageExists(true)
      }
      else {
        setImageExists(false)
      }
      });
    setEditOpen(true);
    
  };

  const handleClick = (event, _id) => {

    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const createDialogContent = () => {
    return(
  <DialogContent>
  <div className={classes.root}>
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          value={untappdURL}
          onChange={(e) => setURL(e.target.value)}
          margin="dense"
          id="url"
          label="Untappd URL"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <Button fullWidth
          onClick={handleImport}
          variant="contained"
          className={classes.button}>
          Import Cider info</Button>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          value={ciderTitle}
          onChange={(e) => setTitle(e.target.value)}
          margin="dense"
          id="title"
          label="Title"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          value={ciderBrewery}
          onChange={(e) => setBrewery(e.target.value)}
          margin="dense"
          id="brewery"
          label="Brewery"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={ciderDescription}
          onChange={(e) => setDescription(e.target.value)}
          margin="dense"
          id="description"
          label="Description"
          multiline
          rows={3}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          value={ciderType}
          onChange={(e) => setType(e.target.value)}
          margin="dense"
          id="type"
          label="Type"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          value={ciderRating}
          onChange={(e) => setRating(e.target.value)}
          margin="dense"
          id="rating"
          label="Rating"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          value={ciderCountry}
          onChange={(e) => setCountry(e.target.value)}
          margin="dense"
          id="country"
          label="Country"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          value={ciderPrice}
          onChange={(e) => setPrice(e.target.value)}
          margin="dense"
          id="price"
          label="Price"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          value={ciderAlcohol}
          onChange={(e) => setAlcohol(e.target.value)}
          margin="dense"
          id="alcohol"
          label="Alcohol rate"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4} style={{ textAlign: 'center' }}>
      <FormControlLabel 
        control={<Checkbox color="primary" checked={ciderStock} 
        onChange={(e) => setStock(e.target.checked)} 
        name="stock" />}
        label="Available"
        style={{ marginTop: '7px' }}

      />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          select
          value={ciderLocation}
          onChange={(e) => setLocation(e.target.value)}
          margin="dense"
          id="location"
          label="Location"
          variant="outlined"
          >{['Inside','Outside', 'Inside/Outside'].map((location) => (
            <MenuItem key={location} value={location}>
            {location}
            </MenuItem>
          ))}
           </TextField>
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          select
          value={ciderForm}
          onChange={(e) => setForm(e.target.value)}
          margin="dense"
          id="form"
          label="Form"
          variant="outlined"
          >        >{['Bottle','Tap'].map((form) => (
            <MenuItem key={form} value={form}>
            {form}
            </MenuItem>
          ))}
          </TextField>
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          value={ciderSize}
          onChange={(e) => setSize(e.target.value)}
          margin="dense"
          id="size"
          label="Sizes"
          variant="outlined"
          helperText="Ex: 400 or 400,500,1500"
              InputProps={{
                startAdornment: <InputAdornment position="start">Ml</InputAdornment>,
              }}
        />
      </Grid>
      <Grid container justify="center" item xs={12}>

      {imageExists ? (
    <img src={ciderImage} alt="Cider" width="100" height="100" />
  ) :(
    <Skeleton variant="rect" width={100} height={100} />
  )}
      </Grid>
      <Grid item xs={12}>
      <TextField
          fullWidth
          value={ciderImage}
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


  return (
    <div>
      <div >
        <Button className={classes.mainItems} variant="outlined" color="primary" onClick={handleClickOpen}>
          Create new cider
      </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Cider</DialogTitle>
          {createDialogContent()}

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={handleCreate} color="primary">
              Create
          </Button>
          </DialogActions>
        </Dialog>

                <Dialog open={editOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Cider</DialogTitle>
          {createDialogContent()}

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={handleEdit} color="primary">
              Edit
          </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Toolbar
            className={clsx(classesToolbar.root, {
              [classesToolbar.highlight]: selected.length > 0,
            })}
          >
            {selected.length > 0 ? (
              <Typography className={classesToolbar.title} color="inherit" variant="subtitle1" component="div">
                {selected.length} selected
        </Typography>
            ) : (
                <Typography className={classesToolbar.title} variant="h6" id="tableTitle" component="div">
                  Ciders
        </Typography>
              )}

            {selected.length > 0 ? (
              <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={deleteRows}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                  <IconButton aria-label="filter list">
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
              )}
          </Toolbar>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='medium'
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover

                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => handleClick(event, row._id)}
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell padding="checkbox">
                        <IconButton  onClick={(event) => handleEditOpen(event, row)} aria-label="edit">
  <EditIcon />
</IconButton>
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.title}
                        </TableCell>
                        <TableCell >{row.brewery}</TableCell>
                        <TableCell >{row.location}</TableCell>
                        <TableCell >{row.stock ? "Yes" : "No"}</TableCell>
                        <TableCell align="right">{moment(row.created).format('YYYY-MM-DD')}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}


const headCells = [
  { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
  { id: 'brewery', numeric: false, disablePadding: false, label: 'Brewery' },
  { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
  { id: 'stock', numeric: false, disablePadding: false, label: 'Available' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Creation date' },
];



