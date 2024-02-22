import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
// import AuthService from "../../../service/auth-service";
import { useState, useEffect } from "react";
import AddLightModel from './AddLightModel';
import DeleteLightModel from './DeleteLightModel';
// import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import EditLightModel from './EditLightModel';
import ResponseAlert from '../responseAlert/responseAlert';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress'
import CommonModel from '../model/model';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Service from '../../service/service';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import { ShareLocationOutlined } from '@mui/icons-material';
import MapIcon from '@mui/icons-material/Map';
import MapModel from './OpenMapModel';



export default function LightTable(props) {

    const headCells = [
        {
            id: 'id',
            numeric: true,
            key: 'id',
            disablePadding: false,
            label: 'Id',
        },
        {
            id: 'place',
            numeric: false,
            key: 'place',
            disablePadding: false,
            label: 'Place',
        },
        {
            id: 'location',
            numeric: false,
            key: 'location',
            disablePadding: false,
            label: 'Location',
        },
        {
            id: 'fault',
            numeric: false,
            key: 'fault',
            disablePadding: false,
            label: 'Fault',
        },
        // {
        //     id: 'action',
        //     numeric: false,
        //     key: 'action',
        //     disablePadding: false,
        //     label: 'Action',
        // },
    ];

    const [rows, setRows] = React.useState([])
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [openAddLightModel, setOpenAddLightModel] = useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [editId, setEditId] = useState(0)
    const [key, setKey] = useState('')
    const [submitResponse, setSubmitResponse] = useState()
    const [submitError, setSubmitError] = useState()
    const [backdrop, setBackDrop] = useState(false)
    const [location, setLocation] = useState()
    const [openMap, setOpenMap] = useState(false)

    useEffect(() => {
        getLightDetail()
    }, [page, rowsPerPage, key, submitResponse])

    const getLightDetail = async () => {
        await Service.getAllLightDetail(page,rowsPerPage,orderBy,order,key).then(
            (response)=>{
                console.log("lightDetail",response.data);
                setRows(response.data.content)
                setTotalPage(response.data.totalElements)
            }
        )

    }

    const DeleteLightDetail = () => {
        // AuthService.deleteUserById(selected).then(
        //     (response) => {
        //         setSubmitResponse(response.data)
        //         console.log(response.data);
        //         setTimeout(() => {
        //             setSubmitResponse();
        //         }, 5000);
        //     }
        // )
        setSelected([])
    }

  

    const handleSearch = (e) => {
        setKey(e.target.value)
        setPage(0)
        console.log("key", key)
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        console.log("sort=", order, orderBy)
        getLightDetail()
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.Id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        console.log(page);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        console.log(rowsPerPage, page);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalPage) : 0;

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 5 }}>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar heading={"Streetlight Details"} numSelected={selected.length} selected={selected}
                        onClick={(event) => handleSearch(event)}
                        onDelete={() => { setOpenDeleteModel(true) }}
                        // onSend={() => { setOpenMailByIdModel(true) }}
                    />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                headCells={headCells}

                            />

                            <TableBody>
                                {rows?.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow>
                                            {/* <TableCell padding="checkbox">
                                                <IconButton sx={{padding:0
                                                }}>
                                                    <Checkbox
                                                        onClick={(event) => handleClick(event, row.id)}
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </IconButton>
                                            </TableCell> */}
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                // padding="none"
                                                // align='center'
                                            >
                                                {row.id.toString()}
                                            </TableCell>
                                            <TableCell >{row.place}</TableCell>
                                            <TableCell >
                                            <IconButton onClick={() => {
                                                setLocation({lat:row.lat,lng:row.lng})
                                                setOpenMap(true)
                                                console.log({lat:row.lat,lng:row.lng});
                                            }
                                            }><ShareLocationOutlined/></IconButton>
                                            </TableCell>
                                            <TableCell >{row.fault==1?<CheckIcon/>:<ClearIcon/>}</TableCell>
                                            {/* <TableCell ><IconButton onClick={() => {
                                                setEditId(row.id)
                                                setOpenEditModel(true)
                                                console.log(row.id);
                                            }
                                            }><EditIcon /></IconButton></TableCell> */}
                                        </TableRow>
                                    );


                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalPage}
                        // count={7}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <FormControlLabel
                        control={<Switch checked={dense} onChange={handleChangeDense} />}
                        label="Dense padding"
                    />
                    {/* <IconButton> */}
                    {/* <Box>
                        <Button variant="contained" onClick={() => {
                            setOpenAddLightModel(true)
                        }}  >Add</Button>
                        
                    </Box> */}
                    {/* </IconButton> */}
                </Box>
            </Box>
            {/* <AddLightModel open={openAddLightModel} onClose={() => { setOpenAddLightModel(false) }} onSubmit={() => { getLightDetail() }} /> */}
        
            <EditLightModel open={openEditModel} onClose={() => { setOpenEditModel(false) }} id={editId} />
            <MapModel open={openMap} onClose={()=>{setOpenMap(false)}} location={location}/>
            <CommonModel open={openDeleteModel} onClose={() => { setOpenDeleteModel(false) }} btn={'Delete'} onfunc={() => {
                DeleteLightDetail()
                setOpenDeleteModel(false)
            }}>Do you want to delete the selected users</CommonModel>
            {/* <CommonModel open={openMailByIdMode} onClose={() => {
                setOpenMailByIdModel(false)
            }} onfunc={() => {
                sendMAilById()
                setOpenMailByIdModel(false)
            }}
                btn={'send'}
            >Do you want to send mail to the selected users</CommonModel>
            <CommonModel open={openMaillToAllModel} onClose={() => {
                setOpenMaillToAllModel(false)
            }} onfunc={() => {
                sendMAilToUser()
                setOpenMaillToAllModel(false)
            }}
                btn={'send'}
            >Do you want to send mail to all users</CommonModel> */}
            {
                submitResponse && <ResponseAlert
                    type="success"
                    handleClick={() => setSubmitResponse()}
                >
                    {submitResponse}
                </ResponseAlert>
            }
            {
                submitError && <ResponseAlert
                    type="error"
                    handleClick={() => setSubmitError()}
                >
                    {submitError}
                </ResponseAlert>
            }
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}
            // onClick={()=>{setBackDrop(false)}}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}
