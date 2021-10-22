import { FormLabel, Switch } from "@mui/material";
import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import { Box } from '@mui/system';




function AllergenFilter(props) {

    return (
        <Form.Group>
        <Box sx={{
    display: 'grid',
    rowGap: 1,
    gridTemplateColumns: 'repeat(2, 1fr)',
  }}>{
      props.allergenFilterArray.map(([k,v],i) => {
          return (
            <div key={i}>
            <Switch onChange={(e) => {
                e.preventDefault();
                props.onChange(e);
                }} name={k} checked={v} />
            <FormLabel>{k}</FormLabel>
            </div>
          )
      })
  }
        </Box>
    
        </Form.Group>
        )
}

export default AllergenFilter;