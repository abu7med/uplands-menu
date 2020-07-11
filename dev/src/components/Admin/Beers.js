import React from 'react';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import EditIcon from '@material-ui/icons/Edit';
import {
  apiURL
} from '../../utils/shared';
const axios = require('axios');
const cheerio = require("cheerio")
const moment = require('moment')

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),

//     },
//   },
// }));


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
axios.get(apiURL + "/api/get/beers")
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
// console.log(imageExists("https://untappd.akamaized.net/site/beer_logos/beer-3634240_8206f_sm.jpeg"))

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

export default function Beers() {
  //button
  const [avalue, changeValue] = React.useState(0);
  const [untappdURL, setURL] = React.useState("");
  const [beerID, setID] = React.useState();
  const [beerTitle, setTitle] = React.useState("");
  const [beerBrewery, setBrewery] = React.useState("");
  const [beerDescription, setDescription] = React.useState("");
  const [beerType, setType] = React.useState("");
  const [beerRating, setRating] = React.useState("");
  const [beerPrice, setPrice] = React.useState("");
  const [beerAlcohol, setAlcohol] = React.useState("");
  const [beerIBU, setIBU] = React.useState("");
  const [beerImage, setImage] = React.useState("");
  const [imageExists, setImageExists] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  //table
  const [rows, setRows] = React.useState([...initialrows]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const classes = useStyles();

  const classesToolbar = useToolbarStyles();


  const deleteRows = (event) => {
    axios.delete(apiURL + "/api/delete/beers", {
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
    setAlcohol("")
    setIBU("")
    setImage("")
    setImageExists(false)
    setOpen(false);
    setEditOpen(false);
  };

  const handleCreate = () => {
    let beerItem = {
      beerTitle: beerTitle,
      beerBrewery: beerBrewery,
      beerDescription: beerDescription,
      beerType: beerType,
      beerRating: beerRating,
      beerPrice: beerPrice,
      beerAlcohol: beerAlcohol,
      beerIBU: beerIBU,
      beerImage: beerImage,
    }
    axios.post(apiURL + '/api/add/beers', beerItem)
      .then(function (response) {
        initialrows.push(response.data);
        setRows([...initialrows])
      })
      .catch(function (error) {
        console.log(error);
      });
    setURL("")
    setTitle("")
    setBrewery("")
    setDescription("")
    setType("")
    setRating("")
    setPrice("")
    setAlcohol("")
    setIBU("")
    setImage("")
    setImageExists(false)

    setOpen(false);
    setEditOpen(false);



  };

  
  const handleEdit = () => {
    let beerItem = {
      beerID : beerID,
      beerTitle: beerTitle,
      beerBrewery: beerBrewery,
      beerDescription: beerDescription,
      beerType: beerType,
      beerRating: beerRating,
      beerPrice: beerPrice,
      beerAlcohol: beerAlcohol,
      beerIBU: beerIBU,
      beerImage: beerImage,
    }
    let initialrows = []
    axios.post(apiURL + '/api/edit/beers', beerItem)
      .then(function (response) {
        for (var prop in response.data) {
          var item = response.data[prop];
    
          initialrows.push(item);
        }
        console.log(initialrows)
        setRows(initialrows)

      })
      .catch(function (error) {
        console.log(error);
      });
    setID(0)
    setURL("")
    setTitle("")
    setBrewery("")
    setDescription("")
    setType("")
    setRating("")
    setPrice("")
    setAlcohol("")
    setIBU("")
    setImage("")
    setImageExists(false)
    setEditOpen(false);
    setOpen(false);



  };
  const handleImport = () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = untappdURL
    axios.get(proxyurl + url)
      .then(function (response) {
        // handle success
        const $ = cheerio.load(response.data);
        setTitle($('div.name').children('h1').text());
        setBrewery($('p.brewery').text());
        setType($('p.style').text());
        setAlcohol($('p.abv').text().replace(/[^\d.-]/g, ''));
        setIBU(() => { if ($('p.ibu').text().replace(/[^\d.-]/g, '') === "") { return (0) } else { return $('p.ibu').text().replace(/[^\d.-]/g, '') } });
        setRating($('span.num').text().replace(/[^\d.-]/g, ''));
        setDescription($('div.beer-descrption-read-less').text());
        setImage($('a.label').children('img').attr('src'));
        checkImageExists($('a.label').children('img').attr('src'), function(existsImage) {
          if(existsImage == true) {
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
    const html = axios.get(proxyurl + url);


  };

  const handleImageChange = (event) => {
    setImage(event.target.value)
    checkImageExists(event.target.value, function(existsImage) {
      if(existsImage == true) {
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
    if(row.URL != null)
    setURL(row.URL)
    if(row.title != null)
    setTitle(row.title)
    if(row.brewery != null)
    setBrewery(row.brewery)
    if(row.description != null)
    setDescription(row.description)
    if(row.type != null)
    setType(row.type)
    if(row.rating != null)
    setRating(row.rating)
    if(row.price != null)
    setPrice(row.price)
    if(row.alcohol != null)
    setAlcohol(row.alcohol)
    if(row.ibu != null)
    setIBU(row.ibu)
    if(row.image != null)
    setImage(row.image)
    checkImageExists(row.image, function(existsImage) {
      if(existsImage == true) {
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



  return (
    <div>
      <div >
        <Button className={classes.mainItems} variant="outlined" color="primary" onClick={handleClickOpen}>
          Create new beer
      </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Beer</DialogTitle>
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
                    Import Beer info</Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    value={beerTitle}
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
                    value={beerBrewery}
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
                    value={beerDescription}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="dense"
                    id="description"
                    label="Description"
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    value={beerType}
                    onChange={(e) => setType(e.target.value)}
                    margin="dense"
                    id="type"
                    label="Type"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    value={beerRating}
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
                    value={beerPrice}
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
                    value={beerAlcohol}
                    onChange={(e) => setAlcohol(e.target.value)}
                    margin="dense"
                    id="alcohol"
                    label="Alcohol rate"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    value={beerIBU}
                    onChange={(e) => setIBU(e.target.value)}
                    margin="dense"
                    id="ibu"
                    label="IBU"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>

                {imageExists ? (
              <img src={beerImage} width="100" height="100" />
            ) : null}
                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    value={beerImage}
                    onChange={handleImageChange}
                    margin="dense"
                    id="imageURL"
                    label="Image URL"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </div>
          </DialogContent>

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
          <DialogTitle id="form-dialog-title">New Beer</DialogTitle>
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
                    Import Beer info</Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    value={beerTitle}
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
                    value={beerBrewery}
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
                    value={beerDescription}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="dense"
                    id="description"
                    label="Description"
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    value={beerType}
                    onChange={(e) => setType(e.target.value)}
                    margin="dense"
                    id="type"
                    label="Type"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    value={beerRating}
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
                    value={beerPrice}
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
                    value={beerAlcohol}
                    onChange={(e) => setAlcohol(e.target.value)}
                    margin="dense"
                    id="alcohol"
                    label="Alcohol rate"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    value={beerIBU}
                    onChange={(e) => setIBU(e.target.value)}
                    margin="dense"
                    id="ibu"
                    label="IBU"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>

                {imageExists ? (
              <img src={beerImage} width="100" height="100" />
            ) : null}
                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    value={beerImage}
                    onChange={handleImageChange}
                    margin="dense"
                    id="imageURL"
                    label="Image URL"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </div>
          </DialogContent>

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
                  Beers
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
                        <TableCell align="right">{row.brewery}</TableCell>
                        <TableCell align="right">{row.alcohol}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
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
            rowsPerPageOptions={[10, 25]}
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


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
  { id: 'brewery', numeric: false, disablePadding: false, label: 'Brewery' },
  { id: 'alcohol', numeric: true, disablePadding: false, label: 'Alcohol rate' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Creation date' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        <TableCell padding="checkbox">
          Edit
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));


// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };



