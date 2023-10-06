import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function SearchBar() {
  return (
    <Paper
      elevation={0}
      component="form"
      sx={{boxShadow: "inset 0 0 10px #000000", p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", maxWidth:300, backgroundColor:"#181C20" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color:"#8C92A4", fontFamily: "Roboto Mono, monospace" }}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' ,color:"#8C92A4"  }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton  sx={{ p: '10px',color:"#8C92A4" }} aria-label="directions">
        <FilterAltIcon />
      </IconButton>
    </Paper>
  );
}