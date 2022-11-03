import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function Carlist(){
    return(
        <div>
            Carlist
        </div>
    );
}
export default Carlist;

/*
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Carlist() {
  const [cars, setCars] = useState([]);

  const [columnDefs] = useState([
    {field: 'brand', sortable: true, filter: true},
    {field: 'model', sortable: true, filter: true},
    {field: 'color', sortable: true, filter: true},
    {field: 'fuel', sortable: true, filter: true},
    {field: 'year', sortable: true, filter: true, width: 120},
    {field: 'price', sortable: true, filter: true, width: 150},
    {
      cellRenderer: params => 
        <button onClick={() => deleteCar(params.data)}>Delete</button>
    }
  ])

  useEffect(() => {
    getCars();
  }, []);

  const getCars = () => {
    fetch('http://carrestapi.herokuapp.com/cars')
    .then(response => {
      if (response.ok)
        return response.json();
      else
        alert('Something went wrong');
    })
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error)
  }

  const deleteCar = (data) => {
    if (window.confirm('Are you sure?')) {
      fetch(data._links.car.href, {method: 'DELETE'})
      .then(response => {
        if (response.ok)
          getCars();
        else 
          alert('Something went wrong in deletion');
      })
      .catch(err => console.error(err))
    }
  }

  return(
    <div className='ag-theme-material' style={{height: 650, width: '90%', margin:'auto'}}>
      <AgGridReact 
        rowData={cars}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}
*/