import {Parser} from "json2csv";
import fs from "fs";
import { dirname } from "path";

const schema = {
    name: "",
     diets:{
        Vegan:false,
        Vegetarian:false,
        Halal_Certified :false,
        Kosher :false,
        Gluten_Free:false
    }
        ,
    allergyInfo: {
        Cereals_containing_gluten:true,
        Wheat:true,
        Rye:true,
        Barley:true,
        Oats:true,
        Crustaceans:true,
        Eggs:true,
        Fish:true,
        Peanuts:true,
        Soybeans:true,
        Milk_and_milk_proteins:true,
        Nuts:true,
        Celery:true,
        Mustard:true,
        Sesame:true,
        Sulphites:true,
        Lupin:true,
        Molluscs:true},
    currentMenu:true,
    type: ""
}

function convertToCsv(jsobject) {
    let fields = {}
    fields.name = jsobject.name
    fields = {...jsobject.diets, ...jsobject.allergyInfo}
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(fields);
    fs.writeFile('./test.csv', csv, err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })

}

convertToCsv(schema)
