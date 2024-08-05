import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import UploadFileIcon from '@mui/icons-material/UploadFile';


const InputFile = ({ setData }) => {
  const [filepath, setFilepath] = useState(null);
  const inputFile = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    setFilepath(file.path);

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary', cellDates: true, dateNF: 'dd/mm/yyyy' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);

      setData(sheetData);
    };

    reader.readAsBinaryString(file);
  };

  const resetFile = () => {
    if (inputFile.current) {
      setData(null);
      setFilepath(null);

      inputFile.current.value = '';
    }
  };


  return (
    <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2 }}>
      { filepath ? <Typography variant='h6' color='secondary'>File Path: {filepath}</Typography> : <div></div> }

      <input id='import-file' type='file' ref={inputFile} onChange={handleFileUpload}
        accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' style={{ display: 'none' }} />

      <label htmlFor='import-file'>
        <Button variant='contained' color="secondary" endIcon={<UploadFileIcon />} disableElevation component='span' onClick={resetFile}>Upload Excel</Button>
      </label>
    </Paper>
  );
};


export default InputFile;
