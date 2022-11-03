import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Carlist from './components/Carlist';

function App() {
  const [cars, setCars] = useState([]);
  
  const [columnDefs] = useState([
    {field: 'brand', sortable: true, filter: true},
    {field: 'model', sortable: true, filter: true},
    {field: 'color', sortable: true, filter: true},
    {field: 'fuel', sortable: true, filter: true},
    {field: 'year', sortable: true, filter: true, width:120},
    {field: 'price', sortable: true, filter: true, width:150},
    {
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
    fetch('https://carrestapi.herokuapp.com/cars')
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
    fetch('https://carrestapi.herokuapp.com/cars')
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

  return (
    <div className='ag-theme-material' style={{height: 600, width: '90%', margin:'auto'}}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            CarShop
          </Typography>
        </Toolbar>
      </AppBar>
      <AgGridReact 
        rowData={cars}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />
      <Carlist />
    </div>
  );
}

export default App;
