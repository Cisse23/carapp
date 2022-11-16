import React, {useState, useEffect} from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Carlist from './components/Carlist';
//import { API_URL } from './constants';

function App() {
  const [cars, setCars] = useState([]);
  
  const [columnDefs] = useState([
    {field: 'brand', sortable: true, filter: true},
    {field: 'model', sortable: true, filter: true},
    {field: 'color', sortable: true, filter: true},
    {field: 'fuel', sortable: true, filter: true},
    {field: 'year', sortable: true, filter: true, width:120},
    {field: 'price', sortable: true, filter: true, width:150}, //lisää field edit napille
    {
      width:120,
      cellRenderer: params => 
      <Button 
      size='small'
      onClick={() => updateCar(params.data)}>
        Edit
      </Button>
    },
    {
      width:120,
      cellRenderer: params => 
      <Button 
      size='small'
      color='error'
      onClick={() => deleteCar(params.data)}>
        Delete
      </Button>
    }
  ]);

  useEffect(() => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then(response => {
      if(response.ok)
        return response.json();
      else  
        alert('hups!' + response.statusText);
    })
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error)
  }, []);

  const getCars = (() => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then(response => {
      if(response.ok)
        return response.json();
      else  
        alert('hups!' + response.statusText);
    })
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error)
  }, []);
  

  const deleteCar = (data) => {
    if (window.confirm('Are you sure?'))
    //console.log(data);
    fetch(data._links.car.href, {method: 'DELETE'})
    .then(response => {
      if(response.ok)
        getCars();
      else alert('something went wrong')
    })
    .catch(err => console.error)
  }

  const addCar = (car) => {
    fetch('https://carstockrest.herokuapp.com/cars', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(car)
    })
    .then(response => {
      if(response.ok)
      getCars();
      else
        alert("joku lisäys hätä");
    })
    .catch(err => console.log(err))
  }

  const updateCar = (car, url) => {
    fetch(url, {
      method: 'PUT',
      headers: {'Content-type' : 'application/json'},
      body: JSON.stringify(car)
    })
    .then(response => {
      if(response.ok)
      getCars();
      else
        alert("joku editointi hätä");
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            CarShop
          </Typography>
        </Toolbar>
      </AppBar>
      <Carlist />
    </div>
  );
}

export default App;
