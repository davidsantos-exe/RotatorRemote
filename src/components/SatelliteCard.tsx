import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function BasicCard() {
  return (
    
      <CardContent
        sx={{
          padding: "8px",
          paddingLeft: "16px",
          paddingTop: "4px",
          "&.MuiCardContent-root": { paddingBottom: "8px" },
        }}
      >
        <Typography variant="h6" component="div">
          ISS (Zarya)
        </Typography>

        <List
          dense={true}
          sx={{
            ".MuiListItem-root": { padding:"0px" },
            ".MuiListItemText-root": { margin:"0px", width:"100%"},
            paddingBottom:'0px'
          }}
        >
          <ListItem>
            <ListItemText primary="UTC" />
            <ListItemText secondary=" 18:50:30 " sx={{paddingLeft:"8px"}}/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Local" />
            <ListItemText secondary=" 23:50:36 " sx={{paddingLeft:"8px"}}/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Next Pass" />
            <ListItemText secondary=" 5 min " sx={{paddingLeft:"8px"}}/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Latitude" />
            <ListItemText secondary=" -20.95 " sx={{paddingLeft:"8px"}}/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Longitude" />
            <ListItemText secondary=" 148.83 " sx={{paddingLeft:"8px"}}/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Height" />
            <ListItemText secondary=" 252 mi " sx={{paddingLeft:"8px"}}/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Max E" />
            <ListItemText secondary=" 420 mi" sx={{paddingLeft:"8px"}}/>
          </ListItem>
        </List>
      </CardContent>
    
  );
}
