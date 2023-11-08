import { GridToolbar } from '@mui/x-data-grid';
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AlertView from "../../../Components/AlertView";
import React from "react";
import ReactJson from 'react-json-view'

import {
  DataGrid,
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { Button, Icon, Modal } from "@mui/material";
import { Link } from 'react-router-dom';
import CustomModal from '../../../Components/CustomModal';

const rows = [];

const getObjectIdEndpoint = import.meta.env.VITE_BASE_URL + "/api/getObjectId";
const deleteEndpoint = import.meta.env.VITE_BASE_URL + "/api/orders/deleteOrder";
const readEndpoint = import.meta.env.VITE_BASE_URL + "/api/orders/getAllOrders";
const updateEndpoint = import.meta.env.VITE_BASE_URL + "/api/orders/updateOrder";

export default function Page() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({}); // mode is for edit/view switching
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]); // selection is used by checkbokes

  const handleEditClick = (id) => () => {
    console.log(rowModesModel, id);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    let res = await (await fetch(deleteEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rows.find((row) => row._id == id)),
    })).json();
    console.log(id, res)
    setRows(rows.filter((row) => row._id !== id));
  };
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row._id !== id));
    }
  };
  const processRowUpdate = async (newRow) => {
    console.log("isNew", newRow.isNew);
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row._id == newRow._id ? updatedRow : row)));
    let res = await fetch(
      updateEndpoint,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newRow),
      }
    );

    console.log("update", res)

    return updatedRow;
  };
  const columns = [
    {
      flex: 1,
      editable: true,
      field: "id",
      headerName: "ID",
      renderCell: (params) => (<Link className="hover-underline text-blue-500" to={`/service/${params.value}`}  > {params.value}</Link>)
    },
    { flex: 1, editable: true, field: "name", headerName: "Name", },
    { flex: 1, editable: true, field: "price", headerName: "Price", },
    { flex: 1, editable: true, field: "imageSrc", headerName: "Image", },
    {
      flex: 1, field: "options", headerName: "Options",
      renderCell: (params) => (
        <>
          <Button
            onClick={() => {
              const updatedRow = { ...params.row, show: true };
              setRows(rows.map((row) => (row._id == params.row._id ? updatedRow : row)));
            }}>
            OPEN
          </Button>
          <CustomModal
            open={params.row.show}
            setOpen={(b) => {
              const updatedRow = { ...params.row, show: b };
              setRows(rows.map((row) => (row._id == params.row._id ? updatedRow : row)));
            }}
            onClose={() => {
              const updatedRow = { ...params.row, show: false };
              setRows(rows.map((row) => (row._id == params.row._id ? updatedRow : row)));
            }}>
            <div className="w-full max-w-md shadow rounded border bg-white ">
              <div className="p-4">Edit Oprions</div>
              <div className="divider w-full bg-zinc-600/25 h-[1px]"></div>
              <div className="p-4"><ReactJson src={params.value} />
              </div>
              <div className="p-4">
                <div className="flex items-center button p-2" onClick={() => {
                  const updatedRow = { ...params.row, show: false };
                  setRows(rows.map((row) => (row._id == params.row._id ? updatedRow : row)));
                }}>
                  <Icon fontSize='inherit'>save</Icon><div>Save</div>
                </div>
              </div>
            </div>
          </CustomModal>
        </>
      )
    },
    {
      flex: 1, editable: true, field: "updatedAt", headerName: "Last Update",
      valueFormatter: ({ value }) => new Date(value).toLocaleString(),
    },
    {
      flex: 1,
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Add"
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
          />,
        ];
      },
    },
  ];

  React.useEffect(() => {
    (async () => {
      let fetchedArray = await (
        await fetch(readEndpoint)
      ).json();
      console.log("array fetched", fetchedArray);
      setRows(fetchedArray);
    })();
    return () => { };
  }, []);

  const onFilterChange = React.useCallback((filterModel) => {
    console.log(filterModel);
  }, []);

  return (
    <div className="flex flex-col w-full h-full p-4 overflow-auto">
      <h1 className="text-2xl font-bold my-4 text-gray-700">Services</h1>
      <EditToolbar rows={rows} rowSelectionModel={rowSelectionModel} setRows={setRows} setRowModesModel={setRowModesModel} />

      <div className="w-full">
        <DataGrid
          rows={rows}
          getRowId={(row) => row._id}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 50, 100]}
          editMode="row"
          checkboxSelection
          rowSelectionModel={rowSelectionModel}
          disableRowSelectionOnClick
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            console.log(newRowSelectionModel);

            setRowSelectionModel(newRowSelectionModel);
          }}


          filterMode="server"
          onFilterModelChange={onFilterChange}

          slots={{
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}

        />
      </div>{" "}
    </div>
  );
};


function EditToolbar(props) {
  const { setRows, setRowModesModel, rows, rowSelectionModel } = props;

  const handleClick = async () => {
    const id = await (await fetch(getObjectIdEndpoint)).text();
    setRows((oldRows) => [{ _id: id, name: '', age: '', isNew: true }, ...oldRows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <div className="p-2 border-b gap-2 flex items-center">

      <div className="button p-2" onClick={handleClick}>
        <AddIcon />
        <span>Add</span>
      </div>
      <div
        className="button p-2"
        onClick={() => {
          console.log(rowSelectionModel)
          setRows(
            rows.filter((row) => !rowSelectionModel.includes(row._id))
          );
          rowSelectionModel.forEach((id) => {
            fetch(deleteEndpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(rows.find((row) => row._id == id)),
            });
          });
        }}
      >
        <DeleteIcon />
        Delete
      </div>
      <div>
        <input
          type="text" className="border p-2 rounded"
          placeholder="Search..."
          onChange={async (e) => {
            // Implement your search logic here
            const searchText = e.target.value;
            setRows(await (await fetch(searchEndpoint + "?q=" + searchText)).json())
          }}
        />
      </div>
      <div className="material-button">Search</div>
    </div>
  );
}
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
