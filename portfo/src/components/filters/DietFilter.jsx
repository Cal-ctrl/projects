import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Switch from '@mui/material/Switch';





function DietFilter(props) {
    const dietFilter = Object.entries(props.dietFilterArray.diets)

    return (
        <Form.Group>
        {dietFilter.map(([k, v], i) => {
            return (
            <div key={i}>
            <Switch onChange={(e)=> {
                e.preventDefault()
                try{
                    props.onChange(e);
                }
                catch(e) {
                    console.error(e);
                }
                
            }} name={k} checked={v}/>
            <Form.Label>{k}</Form.Label>
            </div>
            )
        })}

    
        </Form.Group>
        )
}

export default DietFilter;