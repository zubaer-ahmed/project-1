import { GridToolbar } from '@mui/x-data-grid';
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AlertView from "../../../Components/AlertView";
import React from "react";

import {
  DataGrid,
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { Button, Icon } from "@mui/material";
import { Link } from 'react-router-dom';

const rows = [];

export default function Page() {
  const [users, setUsers] = React.useState([]);
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
    let res = await (await fetch(import.meta.env.VITE_BASE_URL + "/api/users/deleteUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users.find((row) => row._id == id)),
    })).json();
    console.log(id, res)
    setUsers(users.filter((row) => row._id !== id));
  };
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = users.find((row) => row._id === id);
    if (editedRow.isNew) {
      setUsers(users.filter((row) => row._id !== id));
    }
  };
  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log(newRow),
      setUsers(users.map((row) => (row._id == newRow._id ? updatedRow : row)));
    let res = await fetch(
      import.meta.env.VITE_BASE_URL + "/api/users/updateUser",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newRow),
      }
    );

    console.log("res", res)

    return updatedRow;
  };
  // React.useEffect(() => {
  //   return () => {};
  // }, [users]);

  const columns = [
    {
      flex: 1,
      editable: true,
      field: "firstName",
      headerName: "First Name",
    },
    { flex: 1, editable: true, field: "lastName", headerName: "Last Name", },
    { flex: 1, editable: true, field: "email", headerName: "Email", renderCell: (params) => (<Link className="hover-underline text-blue-500" to={`/users/${params.value}`}  > {params.value}</Link>) },
    { flex: 1, editable: true, field: "password", headerName: "Password", },
    { flex: 1, editable: true, field: "roles", headerName: "Roles", },
    { flex: 1, editable: true, field: "verificationStatus", headerName: "Verified", },
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
      let fetchedJobs = await (
        await fetch(import.meta.env.VITE_BASE_URL + "/api/users/getUsers")
      ).json();
      setUsers(fetchedJobs.map((e, i) => ({ ...e, id: i })));
      console.log("users fetched");
    })();
    return () => { };
  }, []);

  const onFilterChange = React.useCallback((filterModel) => {
    console.log(filterModel);
  }, []);

  return (
    <div className="flex flex-col w-full h-full p-4 overflow-auto">
      <h1 className="text-2xl font-bold my-4 text-gray-700">Users</h1>
      <EditToolbar rows={users} rowSelectionModel={rowSelectionModel} setRows={setUsers} setRowModesModel={setRowModesModel} />

      <div className="w-full">
        <DataGrid
          rows={users}
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
            toolbar: { setUsers, setRowModesModel },
          }}

        />
      </div>{" "}
    </div>
  );
};


function EditToolbar(props) {
  const { setRows, setRowModesModel, rows, rowSelectionModel } = props;

  const handleClick = async () => {
    const id = await (await fetch(import.meta.env.VITE_BASE_URL + "/api/getObjectId")).text();
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
            fetch(import.meta.env.VITE_BASE_URL + "/api/users/deleteUser", {
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
            setRows(await (await fetch(import.meta.env.VITE_BASE_URL + "/api/users/search?q=" + searchText)).json())
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
