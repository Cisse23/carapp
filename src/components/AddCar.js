import React, { useState } from "react";
import { Button } from "@mui/material";

function AddCar(){
const [open, setOpen] = useState(false);
const [car, setCar] = useState({brand: '', model: '', color: '', fuel: '', year: '', price: ''});

const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    props.addCar(car);
    setOpen(false);
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const inputChanged = (event) => {
    setCar({...car, [event.target.name]: event.target.value});
  }


    return(
        <div>
            <Button>
                Add Car
            </Button>
        </div>
    )
}

export default AddCar;

/*
    {field: 'brand', sortable: true, filter: true},
    {field: 'model', sortable: true, filter: true},
    {field: 'color', sortable: true, filter: true},
    {field: 'fuel', sortable: true, filter: true},
    {field: 'year', sortable: true, filter: true, width:120},
    {field: 'price', sortable: true, filter: true, width:150},

*/