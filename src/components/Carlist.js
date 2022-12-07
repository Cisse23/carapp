import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button } from '@mui/material';
import AddCar from './AddCar';
import EditCar from './EditCar'


function Carlist(){
  const [cars, setCars] = useState([]);
  
  const [columnDefs] = useState([
    {field: 'brand', sortable: true, filter: true},
    {field: 'model', sortable: true, filter: true},
    {field: 'color', sortable: true, filter: true},
    {field: 'fuel', sortable: true, filter: true},
    {field: 'year', sortable: true, filter: true, width:120},
    {field: 'price', sortable: true, filter: true, width:150},
    {field: 'delete', width:120,
      cellRenderer: params => 
      <Button 
      size='small'
      color='error'
      onClick={() => deleteCar(params.data)}
      >
        Delete
      </Button>
    },
    {field: 'edit', width:150,
      cellRenderer: params =>
      <EditCar data={params.data} editCar={editCar}/>
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
        alert('get cars error: ' + response.statusText);
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
      else alert('Delete car / something went wrong')
    })
    .catch(err => console.error)
  }  

  const addCar = (car) => {
    fetch('https://carrestapi.herokuapp.com/cars',
    {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(car)
    })
    .then(response => {
      if(response.ok)
        getCars();
      else alert('Add car / something went wrong')
    })
    .catch(err => console.error)
  }

  const editCar = (car, data) => {
    //console.log("edit: " + data);
    fetch(data._links.car.href,
      {
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(car)
      })
    .then(response => {
      if(response.ok)
        getCars();
      else alert('Edit car / something went wrong')
    })
    .catch(err => console.error)
  }

  
  return(
    <div className='ag-theme-material' style={{height: 600, width: '90%', margin:'auto'}}>     
      <AddCar addCar={addCar} />
      <AgGridReact 
        rowData={cars}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}
export default Carlist;

