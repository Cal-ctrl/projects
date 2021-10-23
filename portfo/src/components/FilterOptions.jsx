import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/esm/Container';
import schema from "../schema";
import AllergenFilter from "./filters/AllergenFilter";
import DietFilter from "./filters/DietFilter";
import NameFilter from "./filters/Name";
import { Box } from '@mui/system';
import Button from 'react-bootstrap/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Fab from '@mui/material/Fab';
import AllergyDataService from "../services/allergy";
import { Link } from "react-router-dom";
import Collapse from '@mui/material/Collapse';

function FilterOptions(props) {

    const [tempFilterObject, setTempFilterObject] = useState(schema)
    
    const [filterState, setFilterState] = useState(false)

    const [filters, setFilters] = useState({})

    function handleChange(e){
      const misc = {...tempFilterObject}
      if (e.target.name === "currentMenu") {
        misc.currentMenu = e.target.checked
        handlesetFilter(e, true);    
      } else {
        misc[[e.target.name]] = e.target.value
        handlesetFilter(e, false);    
      }
      setTempFilterObject(misc)
  }

  function handleDietChange (e) {
      const d = {...tempFilterObject}
      d.diets[[e.target.name]] = e.target.checked
      setTempFilterObject(d)
      console.log(tempFilterObject);
      handlesetFilter(e, true);    

  }
  function handleAllergenChange (e) {
      const a = {...tempFilterObject}
      a.allergyInfo[[e.target.name]] = e.target.checked
      setTempFilterObject(a)
      console.log(tempFilterObject);
      handlesetFilter(e, true);    

  }

  function handlesetFilter(e, check) {
    try {
      if(check) {
        console.log(`checked bool`);
        setFilters(preState => {
          preState[[e.target.name]] = e.target.checked
        return {...preState}
      })
      } else {
        console.log(`checked not bool`);
        setFilters(preState => {
          preState[[e.target.name]] = e.target.value
        return {...preState}
      })
  
      }

    } catch(e) {
      console.error(`error in setting filters when checking if vlaue id switch: ${e}`)
    }
    console.log(filters);

  }

  function handleExpand() {
      const filterSchema = schema
      filterSchema.currentMenu = false
      Object.keys(filterSchema.diets).forEach(v => filterSchema.diets[v] = false)
      Object.keys(filterSchema.allergyInfo).forEach(v => filterSchema.allergyInfo[v] = false)
      setTempFilterObject(filterSchema)
  }

  function handleFilter(){
    console.log(filters)
    AllergyDataService.find(filters)
    .then(responce =>{
      props.setFoodList(responce.data.allergy)
      console.log(responce.data);
    })


  }

  function handleClear() {
    handleExpand();
    setFilters({});
    props.getAll();
  }



    return <Container fluid> 
    <h3 style={{display: "inline"}}>Options</h3><Fab sx={{display: "inline"}} size="small" onClick={() => setFilterState(!filterState)}>{filterState ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}</Fab>
    <Collapse in={filterState} timeout="auto" unmountOnExit>
    <div >
      <Box sx={{
    display: 'grid',
    gap: 1,
    gridTemplateColumns: 'repeat(2, 1fr)',
  }}>
    <Box sx={{
    display: 'grid',
    gap: 1,
    gridTemplateColumns: 'repeat(2, 1fr)',
  }}>
    <NameFilter onChange={handleChange} filterName={tempFilterObject} />
    <DietFilter onChange={handleDietChange} dietFilterArray={tempFilterObject} />
    </Box>
    <Box sx={{
    display: 'grid',}}>
    <AllergenFilter onChange={handleAllergenChange} allergenFilterArray={Object.entries(tempFilterObject.allergyInfo)} />
    </Box>
    </Box>
    <Box sx={{
    display: 'grid',
    gap: 1,
    gridTemplateColumns: 'repeat(6, 1fr)',
  }}>
    <Button type="submit" onClick={handleFilter}>Filter</Button>
    <Button type="submit" onClick={handleClear}>Clear Filters</Button>
    <Link className="btn btn-sm btn-primary" to={{pathname: "/allergen/add"}}>Add</Link>

    </Box>
    </div>

      </Collapse>
    </Container>
}

export default FilterOptions;