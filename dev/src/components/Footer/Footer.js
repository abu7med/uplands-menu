import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
const useStyles = makeStyles((theme) => ({

  text: {
    color: 'white',
    textAlign: 'center'

  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.text}>
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


