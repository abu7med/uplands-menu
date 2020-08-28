import React from 'react';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
 import Link from '@material-ui/core/Link';
 import ReactGA from 'react-ga';
ReactGA.initialize('UA-176725373-1');
ReactGA.pageview(window.location.pathname + window.location.search);
const useStyles = makeStyles((theme) => ({

  text: {
    color: 'white',
    textAlign: 'center',
    margin: "10px"

  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer style={{ textAlign: "center",  color: '#dcdcdc', marginTop: "20px", marginBottom: "20px" }} className={classes.text}>


      <h6 style={{ fontSize: "0.7em" }}>Svantes Pub</h6>
      <p style={{ fontSize: "0.7em"}}>S:t Larsgatan 11</p>
      <p style={{ fontSize: "0.7em", marginBottom: "10px"}}>753 11 Uppsala</p>
      <h6 style={{ fontSize: "0.7em" }}>Opening Hours</h6>
      <p style={{ fontSize: "0.7em"}}>Monday - Thursday: 18-01</p>
      <p style={{ fontSize: "0.7em"}}>Friday - Saturday: 18-02</p>
      <p style={{ fontSize: "0.7em", marginBottom: "10px"}}>Sunday: Closed</p>
      <p style={{ fontSize: "0.7em"}}
      >Do you want to work at the pub? Join our <Link style={{ color: "#9999ff"}} target="_blank" href="https://www.facebook.com/groups/121349511405785" >
      Facebook group
   </Link>.</p>

      {/* <div>Flag icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
      {/* <Typography  variant="h6">
        Contact us:
        <Link color="inherit" display="block" href="#" >
        Beer enquiries
      </Link>
      <Link color="inherit" display="block" href="#" >
      Liqour enquiries
      </Link>
      <Link color="inherit" display="block" href="#" >
         Food enquiries
      </Link>
                                    </Typography> */}
    </footer>
  )
}


