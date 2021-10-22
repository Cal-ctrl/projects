import React from 'react';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


function FoodCard (props) {




    return (
    <Card sx={{ maxWidth: 345 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props.name}
      </Typography>
      <List>
      {props.dietInfo.map(([k,v], i) =>{
        return (v && <ListItem>Suitable for {k}</ListItem>)
      })}      
      {props.allergyInfo.map(([k,v], i) =>{
        return (v && <ListItem>Contains {k}</ListItem>)
      })}
      </List>


    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
      <Button size="small">Review</Button>
      <Link className="btn btn-lg btn-primary btn-sm" to={{
        pathname: "/allergen/" + props.id + "/add",
        state: {
              currentFood: props.foodOb
            }
          }}>Update</Link>
    </CardActions>
  </Card>

  )

}

export default FoodCard;