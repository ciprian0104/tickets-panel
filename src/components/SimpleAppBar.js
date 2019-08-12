import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import "./App.css";


/**To be modified
TODO: Add functionality later

*/
export default function SimpleAppBar() {
  return (
    <div >
      <AppBar position="static" style={{ backgroundColor: "#7fffd4", marginBottom: 10 }}

>
        <Toolbar>
          <Typography variant="h6">
            Tickets panel App
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}