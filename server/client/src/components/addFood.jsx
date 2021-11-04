import React, { useState } from 'react';
import AllergyDataService from "../services/allergy";
import schema from '../schema';
import Form from 'react-bootstrap/Form'
import Switch from '@mui/material/Switch';
import Button from 'react-bootstrap/Button'
import { Container } from '@mui/material';
import DietForm from './DietForm';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from '@mui/system';



function AddFood(props) {
    let updateOrReview = false
    let initialFood = schema

    const { getAccessTokenSilently } = useAuth0();
    
    const style = {
        display: 'grid',
        gap: 1,
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"}




     if (props.location.state && props.location.state.currentFood) {
        updateOrReview = true;
        initialFood = props.location.state.currentFood;
      }

    const [newFoodItem, setFoodItem] = useState(initialFood)


    const [submitted, setSubmitted] = useState(false)

    async function addFood(data) {
        const token = await getAccessTokenSilently();
        AllergyDataService.createFoodItem(data, token)
            .then(responce =>{
                setSubmitted(true);
                console.log(responce.data); }
                )
        ;
    }

    async function updateFood(data) {
        const token = await getAccessTokenSilently();

        AllergyDataService.updateFoodItem(data, token)
            .then(r => {
                setSubmitted(true);
                console.log(r.data);
            })

    }

    function handleChange(e){
        const temp = {...newFoodItem}
        if (e.target.name === "currentMenu") {
            temp.currentMenu = e.target.checked
        } else {
        temp[[e.target.name]] = e.target.value
        }
        setFoodItem(temp)
        console.log(newFoodItem);
    }

    function handleDietChange (e) {
        const d = {...newFoodItem}
        d.diets[[e.target.name]] = e.target.checked
        setFoodItem(d)
        console.log(newFoodItem);
    }
    function handleAllergenChange (e) {
        const a = {...newFoodItem}
        a.allergyInfo[[e.target.name]] = e.target.checked
        setFoodItem(a)
        console.log(newFoodItem);

    }





    return (
        <Container fluid>
        {submitted ? <div><h1>Submitted!</h1><Link to="/allergen">Back to Allergy Page</Link></div> : 
        
        <Form>

  <Form.Group className="mb-3" controlId="formFoodName">
    <Form.Label>Name</Form.Label>
    <Form.Control onChange={handleChange} type="text" placeholder="Enter Food item here" name="name" value={newFoodItem.name}/>
  </Form.Group>
        <Box sx={style}>
    <div>
  <h1>Diet Info</h1>
  <DietForm newDietInfo={newFoodItem.diets} onChange={handleDietChange} />
  <h3>Menu Information</h3>
  <Form.Group >
  <Form.Select onChange={handleChange} name="type" value={newFoodItem.type}>  
  <option>Choose menu type</option>
  <option value="Starter">Starter</option>
  <option value="Main">Main</option>
  <option value="Dessert">Dessert</option>
  <option value="Side">Side</option>
  <option value="Drink">Drink</option>
  </Form.Select>

  <Switch onChange={handleChange} name="currentMenu" checked={newFoodItem.currentMenu} />
  <Form.Label >Current Menu</Form.Label>
  </Form.Group>
  {updateOrReview ?   <Button variant="primary" type="submit" onClick={(e) => {
                                                            e.preventDefault();
                                                            updateFood(newFoodItem);}}>
    Update
  </Button>

  :
  <Button variant="primary" type="submit" onClick={(e) => {
                                                            e.preventDefault();
                                                            addFood(newFoodItem);}}>
    Submit
  </Button>}

  </div>
  <div>
  <h1>Allergy Info</h1>
  <Box sx={{display: 'grid',
        gap: 1,
        gridTemplateColumns: "repeat(2, 1fr)"}}>
  <DietForm newDietInfo={newFoodItem.allergyInfo} onChange={handleAllergenChange} />
  </Box>
  </div>
  </Box>
   
</Form>      }
</Container>
    )
}


export default AddFood;