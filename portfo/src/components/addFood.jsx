import React, { useEffect, useState } from 'react';
import AllergyDataService from "../services/allergy";
import schema from '../schema';
import Form from 'react-bootstrap/Form'
import Switch from '@mui/material/Switch';
import Button from 'react-bootstrap/Button'
import { Container } from '@mui/material';
import DietForm from './DietForm';
import { Link } from "react-router-dom";


function AddFood(props) {
    let updateOrReview = false
    let initialFood = schema


     if (props.location.state && props.location.state.currentFood) {
        updateOrReview = true;
        initialFood = props.location.state.currentFood;
      }

    const [newFoodItem, setFoodItem] = useState(initialFood)


    const [submitted, setSubmitted] = useState(false)

    function addFood(data) {
        console.log(data);
        AllergyDataService.createFoodItem(data)
            .then(responce =>{
                setSubmitted(true);
                console.log(responce.data); }
                )
        ;
    }

    function updateFood(data) {
        AllergyDataService.updateFoodItem(data)
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
  <h1>Diet Info</h1>
  <DietForm newDietInfo={newFoodItem.diets} onChange={handleDietChange} />
  <h1>Allergy Info</h1>
  <DietForm newDietInfo={newFoodItem.allergyInfo} onChange={handleAllergenChange} />
  <Form.Group>
  <Form.Label >Current Menu</Form.Label>
  <Switch onChange={handleChange} name="currentMenu" checked={newFoodItem.currentMenu} />
  </Form.Group>
  <Form.Select onChange={handleChange} name="type" value={newFoodItem.type}>  
  <option>Choose menu type</option>
  <option value="Starter">Starter</option>
  <option value="Main">Main</option>
  <option value="Dessert">Dessert</option>
  <option value="Side">Side</option>
  <option value="Drink">Drink</option>
  </Form.Select>
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

</Form>      }
</Container>
    )
}


export default AddFood;