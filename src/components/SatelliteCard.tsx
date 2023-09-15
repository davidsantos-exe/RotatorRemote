import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function generate(element: React.ReactElement) {
    return [0, 1, 2,3,4].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 100 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          ISS (Zarya)
        </Typography>
        <List dense={true}>
              {generate(
                <ListItem>
                  <ListItemText
                    primary="UTC: "
                  />
                </ListItem>,
              )}
            </List>
            </CardContent>
    </Card>
  );
}
