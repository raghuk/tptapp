import React, { useState } from 'react';
import ReactToPrint from 'react-to-print';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';

import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';


const EditToolbar = (props) => {
  const { newRowModel, setRows, setRowModesModel, handlePrint, componentRef } = props;

  const handleClick = () => {
    let id = 0;

    setRows((oldRows) => {
      id = oldRows.length + 1;
      return [...oldRows, { id, ...newRowModel, isNew: true }]
    });

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Box component='section' my={1} px={2} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        {/* <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>Add record</Button> */}
        <ReactToPrint trigger={() => <Button variant='contained' endIcon={<PrintIcon />}>Print</Button>} print={handlePrint} content={() => componentRef.current} />
      </Box>
    </GridToolbarContainer>
  );
}


const DataTable = ({ data, headers, getSelectedRows, newRowModel, handlePrint, componentRef }) => {
  const [rows, setRows] = useState(data);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowSelectionModelChange = (ids) => {
    const selectedIDs = new Set(ids);
    const selectedRowData = rows.filter((row) => selectedIDs.has(row.id));

    getSelectedRows(selectedRowData);
  };

  const columns = [
    ...headers,
    { field: 'actions', type: 'actions', headerName: 'Actions', width: 100, cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label='Save' sx={{ color: '#508C9B' }} onClick={handleSaveClick(id)} />,
            <GridActionsCellItem icon={<CancelIcon />} label='Cancel' className='textPrimary' onClick={handleCancelClick(id)} />,
          ];
        }

        return [
          <GridActionsCellItem icon={<EditIcon />} label='Edit' sx={{ color: '#508C9B' }} onClick={handleEditClick(id)} />,
          <GridActionsCellItem icon={<DeleteIcon />} label='Delete' sx={{ color: '#EB5B00' }} onClick={handleDeleteClick(id)} />,
        ];
      },
    },
  ];


  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        autoheight
        rows={rows}
        columns={columns}
        editMode='row'
        checkboxSelection
        disableColumnFilter
        disableColumnMenu
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        rowModesModel={rowModesModel}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { newRowModel, setRows, setRowModesModel, handlePrint, componentRef },
        }}
      />
    </Paper>
  );
};


export default DataTable;
