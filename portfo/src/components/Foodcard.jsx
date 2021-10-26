import React from 'react';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AllergyDataService from "../services/allergy";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


function FoodCard (props) {

  function handleDelete(id) {
    try {
      AllergyDataService.deleteFoodItem(id)
      .then(responce => {
        console.log(responce.data)
      return props.getAll();

      })
    } catch(e) {
      console.error(`error in Allergy Data service delete req: ${e}`)
    }

  }




    return (
    <Card sx={{ maxWidth: 345 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props.name}
      </Typography>
      <List>
      {props.dietInfo.map(([k,v], i) =>{
        k = k.replace(/_/g, " ")
        return (v && <ListItem>Suitable for {k}</ListItem>)
      })}      
      {props.allergyInfo.map(([k,v], i) =>{
        k = k.replace(/_/g, " ")
        return (v && <ListItem>Contains {k}</ListItem>)
      })}
      </List>


    </CardContent>
    <CardActions>
    <Link variant="button" className="btn btn-outline-primary btn-sm" to={{
        pathname: "/allergen/" + props.id,
        state: {
          currentFood: props.foodOb
        }
          }}>Learn More</Link>
    <Button color="primary" size="small" variant="outlined" sx={{ml: "10px"}} onClick={(e) => {
    e.preventDefault();
    handleDelete(props.id)}}>Delete</Button>
    <Link variant="button" className="btn btn-outline-primary btn-sm" to={{
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