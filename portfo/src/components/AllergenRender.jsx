import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import AllergyDataService from "../services/allergy";
import Foodcard from "./Foodcard.jsx";
import { Box } from '@mui/system';
import FilterOptions from "./FilterOptions.jsx";
import Button from '@mui/material/Button';

import {Parser} from "json2csv";


function AllergenRender() {

    const [foodList, setFoodList] = useState([])
    const [downloadButton, setDownloadButton] = useState(false)
    const [downloadSelected, setDownloadSelected] = useState([])

    useEffect(()=>{
        retrieveFoodList()
    }, [])


    function retrieveFoodList () {
        AllergyDataService.getAllAllergy()
        .then(response => {
            setFoodList(response.data.allergy)
        })
    }

    function collateDownloadSelect (e, selected) {

        if (e.target.checked) {
            const tempArray = [...downloadSelected]
            tempArray.push(selected)
            setDownloadSelected(tempArray)
    
        } else {
            console.log(`unchecked`);
        }
        
        return;

    }

    function downloadSelectedFunc () {
            const unested = []
            downloadSelected.map((jsonObject) =>{
                let fields = {}
                fields = {name: jsonObject.name, ...jsonObject.diets,blank:"", ...jsonObject.allergyInfo, }; //Create Object without any nested data
                console.log(fields);
                unested.push(fields)
                })
            const json2csvParser = new Parser();
            const csv = json2csvParser.parse(unested);
            
            const link = document.createElement('a')
            link.href = 'data:text/csv,' + encodeURIComponent(csv)
            link.download = 'allergen.csv'
            link.click()
          }


    return (
        <Container className="padding-rm" fluid>

        <FilterOptions setFoodList={setFoodList} getAll={retrieveFoodList} />
        <Container className="bg-light" fluid>
        <h1 className="menu-head">Menu Items</h1>

        <Container >
        {downloadButton && <Button onClick={downloadSelectedFunc}>Download</Button>}

        <Box sx={{
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
                getAll={retrieveFoodList}
                downloadCheck={collateDownloadSelect}
                downloadButton={setDownloadButton}
            /> 
        )      
        })}
        </Box>
        </Container>

        </Container>

        </Container>

    );
    }

export default AllergenRender;