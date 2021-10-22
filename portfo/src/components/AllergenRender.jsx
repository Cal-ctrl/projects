import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import AllergyDataService from "../services/allergy";
import Foodcard from "./Foodcard.jsx";
import { Box } from '@mui/system';
import FilterOptions from "./FilterOptions.jsx";


function AllergenRender() {

    const [foodList, setFoodList] = useState([])

    useEffect(()=>{
        retrieveFoodList()
    }, [])


    function retrieveFoodList () {
        AllergyDataService.getAllAllergy()
        .then(response => {
            setFoodList(response.data.allergy)
        })
    }


    return (
        <Container  >
        <FilterOptions setFoodList={setFoodList} getAll={retrieveFoodList} />
        <Box   sx={{
    display: 'grid',
    gap: 1,
    gridTemplateColumns: 'repeat(4, 1fr)',
  }}>

        {foodList.map(food => {
            const dietInfo = Object.entries(food.diets)
            const allergyInfo = Object.entries(food.allergyInfo)

        return (
            <Foodcard 
                name={food.name}
                dietInfo={dietInfo}
                allergyInfo={allergyInfo}
                id={food._id}
                foodOb={food}
            /> 
        )      
        })}
        </Box>
        </Container>

    );
    }

export default AllergenRender;