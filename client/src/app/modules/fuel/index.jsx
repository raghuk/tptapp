import React, { useState, useRef } from 'react';

import { map, isEmpty } from 'lodash-es';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import InputFile from '../../shared/components/inputFile';
import DataTable from './components/datatable';
import CardsToPrint from './components/carddesign';


const FuelPrint = () => {
  const componentRef = useRef();

  const [data, setData] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [dataSelected, setDataSelected] = useState([]);


  const fuelTypes = ['Petrol', 'Diesel'];
  const locations = ['Shantivan', 'Pandav Bhawan', 'Gyan Sarovar'];
  const newRowModel = { name: '', type: '', vehicle: '', validity: '', owner: '', department: '', location: '', fuel: '', liters: '' };

  const refineData = (data) => {
    let list = null;
    let headers = [];

    if (!isEmpty(data)) {
      list = map(data, (item, index) => ({
        id: index + 1, name: item['Vehicle Name'], type: item['Vehicle Type'], vehicle: item['Vehicle Number'], validity: item['RC Validity'],
        owner: item['Owner'], department: item['Department'], location: item['Location'], fuel: item['Fuel Type'], liters: item['Liters']
      }));

      headers = [
        { field: 'name', headerName: 'Vehicle Name', width: 200, sortable: false },
        { field: 'type', headerName: 'Vehicle Type', width: 120, sortable: true },
        { field: 'vehicle', headerName: 'Vehicle Number', width: 150, editable: true },
        { field: 'validity', headerName: 'RC Validity', type: 'date', align: 'right', sortable: false },
        { field: 'owner', headerName: 'Owner', width: 200, sortable: false, editable: true },
        { field: 'department', headerName: 'Department', width: 150, sortable: false },
        { field: 'location', headerName: 'Location', width: 150, sortable: true, editable: true, type: 'singleSelect', valueOptions: locations },
        { field: 'fuel', headerName: 'Fuel Type', width: 100, editable: true, type: 'singleSelect', valueOptions: fuelTypes },
        { field: 'liters', headerName: 'Liters', type: 'number', width: 80, align: 'right', editable: true },
      ];
    }

    setData(list);
    setHeaders(headers);
  };

  const handlePrint = (target) => {
    return new Promise(() => {
      console.log('forwarding print request to the main process...');

      // convert the iframe into data url
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
      const data = target.contentWindow.document.documentElement.outerHTML;

      const blob = new Blob([data], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      window.electronAPI.previewComponent(url, (response) => {
        console.log('Main: ', response);
      });
    });
  };


  return (
    <section className='app-print'>
      <div className='app-content'>
        <h2>Fuel Card Print</h2>

        <InputFile setData={refineData} />

        { data ?
          <>
            <Divider sx={{ my: 2 }} />

            <DataTable data={data} headers={headers} getSelectedRows={setDataSelected} newRowModel={newRowModel} handlePrint={handlePrint} componentRef={componentRef} />

            <Box component="section" sx={{ display: 'none' }}><CardsToPrint ref={componentRef} data={dataSelected} /></Box>
          </>
          : null
        }
      </div>
    </section>
  );
};

export default FuelPrint;
