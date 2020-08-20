import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";
const moment = require('moment')
const useStyles = makeStyles((theme) => ({

  appbar: {
    // borderStyle: 'solid',
    // borderWidth: '1px', 
    // borderColor: 'black',
    height: '40px', 
    width: '100%', 
    background: '#333842', 
    position: 'sticky', 
    top: '0px', 
    color: "white", 
    zIndex: "50"  

  },

}));
// export const Background = 'url("images/uplandsblur50.jpg") no-repeat center fixed'
export const Background = ''
export const pubCoordinates = 
[[59.860278869486905,17.629380555858567],
[59.85990985382229,17.628766329994157],
[59.85995295075336,17.630260320415452],
[59.8596135609098,17.62947979759212],]

export function PersonalAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [timeLeft, setTimeLeft] = React.useState("");
  const history = useHistory();
  const handleClickClock = (event) => {
    let currentday = moment().day()
    console.log(moment().day())
    console.log(moment().isBetween('2020-08-20 03:00', '2020-08-20 03:30'))
    console.log(moment().isBetween('2020-08-20 03:00', '2020-08-20 03:30'))
    // setTimeLeft(moment( {hours:'12', minutes:'00'}).isBetween({hours:'9', minutes:'00'}, {hours:'15', minutes:'00'}))
    setAnchorEl(event.currentTarget);
    // console.log(document.getElementById('tap-beers').style.top)
    // window.scrollTo(0, 500);
};
const handleCloseClock = () => {
    setAnchorEl(null);
};
const handleClick = (event) => {
  if (props.admin){
    history.go(0)
  }else{
    history.push("/");
  }
  
}
const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;

  return (
    <Paper square={true} elevation={4} className={classes.appbar}>
      <Grid container >
        <Grid item xs={1} style={{ textAlign: 'right' }} >
        {props.category.length >0 ? (<IconButton onClick={handleClick} color="inherit" style={{ paddingTop: '9px' }} >
            <ArrowBackIosIcon />
           
          </IconButton>): null}
          </Grid>
<Grid item xs={3} style={{ textAlign: 'left' }} >
          <p style={{ fontSize: '1.3em', marginTop: '9px' }}>
          Menu
</p>
        </Grid>
          

        
        <Grid item xs={4} style={{ textAlign: 'center' }} >
        {props.admin && props.category.length >0  ? (<Button
          style={{ marginTop: '6px', color: 'white' }}
       
        onClick={() => props.create()}
        size="small"
        startIcon={<AddIcon />}
      >
        Add new
      </Button>)
        :
          (<p style={{ fontSize: '1.3em', marginTop: '9px' }}>
          {props.category}
</p>)}
        </Grid>
        {props.admin  ? (
          <Grid item xs={4} style={{ textAlign: 'right' }} >
          <Button
          style={{ marginTop: '6px', marginRight: '1vw', color: 'white' }}
        

        size="small"
        onClick={() => props.logout()}
        startIcon={<ExitToAppIcon />}
      >
        Sign out
      </Button>
          {/* <p style={{ fontSize: '1.3em', marginTop: '9px', marginRight: '2vw' }}>Sign out</p> */}
          
        </Grid>
        )
        : (
          <Grid item xs={4} style={{ textAlign: 'right' }} >
          {/* <IconButton style={{ paddingTop: '9px', marginRight: '2vw' }} color="inherit" aria-describedby={id} onClick={handleClickClock}>
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
            <p style={{ textAlign: "center", padding: "10px" }} >{timeLeft} </p> */}
            {/* <p style={{ textAlign: "center", paddingTop: "4px" }} >Mon-Thu: 18:00-01:00</p>
            <p style={{ textAlign: "center", paddingTop: "4px" }} >Fri-Sat: 18:00-02:00</p>
            <p style={{ textAlign: "center", paddingTop: "4px", paddingBottom: "10px", paddingLeft: "10px", paddingRight: "10px" }} >Last order 30 min before closing!</p> */}
          {/* </Popover> */}
          
        </Grid>
        )
        }
        
      </Grid>
    </Paper>

  );
}
export function isUserInside(point, vs) {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
  
  var x = point[0], y = point[1];
  
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];
      
      var intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  
  return inside;
};

export function checkImageExists(imageUrl, callBack) {
  var imageData = new Image();
  imageData.onload = function () {
    callBack(true);
  };
  imageData.onerror = function () {
    callBack(false);
  };
  imageData.src = imageUrl;
}
export function Sorter(sortVariable, array) {
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
  // if (sortVariable === "brewery-ascending") {
  //     array = array.sort(function (a, b) {
  //         a = a.brewery.toLowerCase();
  //         b = b.brewery.toLowerCase();

  //         return a < b ? -1 : a > b ? 1 : 0;
  //     });
  //     return array
  // }
  // if (sortVariable === "brewery-descending") {
  //     array = array.sort(function (a, b) {
  //         a = a.brewery.toLowerCase();
  //         b = b.brewery.toLowerCase();

  //         return b < a ? -1 : b > a ? 1 : 0;
  //     });
  //     return array
  // }
  // if (sortVariable === "alcohol-descending") {
  //     array = array.sort((c1, c2) => c2.alcohol - c1.alcohol)
  //     return array
  // }
  // if (sortVariable === "alcohol-ascending") {
  //     array = array.sort((c1, c2) => c1.alcohol - c2.alcohol)
  //     return array
  // }
  // if (sortVariable === "rating-descending") {
  //     array = array.sort((c1, c2) => c2.rating - c1.rating)
  //     return array
  // }
  // if (sortVariable === "rating-ascending") {
  //     array = array.sort((c1, c2) => c1.rating - c2.rating)
  //     return array
  // }
  // if (sortVariable === "ibu-descending") {
  //     array = array.sort((c1, c2) => c2.ibu - c1.ibu)
  //     return array
  // }
  // if (sortVariable === "ibu-ascending") {
  //     array = array.sort((c1, c2) => c1.ibu - c2.ibu)
  //     return array
  // }

}

{/* <AppBar style={{ background: '#282c34', height: '45px'  }} className={classes.appbar} >
                    <Grid container >
                        <Grid item xs={3}  >
                            <IconButton style={{ textAlign: 'left' }} onClick={handleClick}  color="inherit" aria-label="menu">
                                <ArrowBackIosIcon style={{ marginBottom: '20px'}}/>
                                <p  style={{ marginTop: '-15px', fontSize: '0.85em'}}>
                                Menu
</p>
                            </IconButton>
                            
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'center',  }} >
                            <p style={{ fontSize: '1.3em', marginTop: "12px" }}>
                                Beers
</p>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: 'right', marginTop: '0px' }} >
                            <IconButton  color="inherit" aria-describedby={id} onClick={handleClickClock}>
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

            </AppBar> */}