import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Popover from '@material-ui/core/Popover';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({

  appbar: {
    // borderStyle: 'solid',
    // borderWidth: '1px', 
    // borderColor: 'black',
    height: '40px', 
    width: '100%', 
    background: '#282c34', 
    position: 'sticky', 
    top: '0px', 
    color: "white", 
    zIndex: "50"  

  },

}));
// export const Background = 'url("images/uplandsblur50.jpg") no-repeat center fixed'
export const Background = ''

export function PersonalAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const handleClickClock = (event) => {
    setAnchorEl(event.currentTarget);
    // console.log(document.getElementById('tap-beers').style.top)
    // window.scrollTo(0, 500);
};
const handleCloseClock = () => {
    setAnchorEl(null);
};
const handleClick = (event) => {
  history.push("/");
}
const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;

  return (
    <div className={classes.appbar}>
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
          <p style={{ fontSize: '1.3em', marginTop: '9px' }}>
          {props.category}
</p>
        </Grid>
        {props.admin ? (
          <Grid item xs={4} style={{ textAlign: 'right' }} >
          <p style={{ fontSize: '1.3em', marginTop: '9px', marginRight: '2vw' }}>Sign out</p>
          
        </Grid>
        )
        : (
          <Grid item xs={4} style={{ textAlign: 'right' }} >
          <IconButton style={{ paddingTop: '9px', marginRight: '2vw' }} color="inherit" aria-describedby={id} onClick={handleClickClock}>
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
        )
        }
        
      </Grid>
    </div>

  );
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