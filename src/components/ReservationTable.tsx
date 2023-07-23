// components/ReservationTable.tsx
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Radio, RadioGroup, Switch, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';
import { Reservation, ReservationTableProps } from '../interfaces/reservation.interface';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ReservationTable: React.FC<ReservationTableProps> = ({ reservations, onAdd,
    onUpdate,
    onDelete }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [newReservation, setNewReservation] = useState<Reservation>({
        id: 0,
        firstName: '',
        email: '',
        phone: ''
    });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    const filteredReservations = reservations.filter(
        (reservation) =>
            reservation.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reservation.email.toLowerCase().includes(searchQuery.toLowerCase()) || reservation.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddClick = () => {
        setNewReservation({ id: reservations.length + 1, firstName: '', email: '', phone: '' });
        setOpen(true);
    };

    const handleEditClick = (reservation: Reservation) => {
        onUpdate(reservation);
    };

    const handleDeleteClick = (id: number) => {
        onDelete(id);
    };

    const formSubmit= () => {
       
    };

    const handleModalClose = () => {
        setOpen(false);
        setNewReservation({ id: 0, firstName: '', email: '', phone: '' });
    };
    
    return (
        <><TextField
            label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            variant="outlined"
            style={{ marginBottom: '10px' }} />
            <Button variant="contained" style={{ float: 'right', marginTop: '10px' }} onClick={handleAddClick}>
                Add Reservation
            </Button>

            <Paper>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="reservation table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredReservations.map((reservation) => (
                                <TableRow
                                    key={reservation.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {reservation.firstName}
                                    </TableCell>
                                    <TableCell>{reservation.email}</TableCell>
                                    <TableCell>{reservation.phone}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => handleEditClick(reservation)}>
                                            Edit
                                        </Button>
                                        <Button style={{ marginLeft: '10px' }} variant="contained" onClick={() => handleDeleteClick(reservation.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Dialog open={open} onClose={handleModalClose}>
                <DialogTitle>Add Reservation</DialogTitle>
                <DialogContent>
                    {filteredReservations ? (
                        <div >

                            <LocalizationProvider  dateAdapter={AdapterDayjs}>
                                <DatePicker  label="Date of Arrival" />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}  >
                                <DatePicker label="Date of Dispatch"/>
                            </LocalizationProvider>
                            <TextField
                                id="filled-room-size"
                                select
                                label="Room Size"
                                defaultValue="business-suite"
                                helperText="Choose a room type"
                                variant="filled"
                                
                            />
                            <TextField id="standard-basic" label="Room Quantity" helperText="Maximum :5" variant="standard" style={{marginLeft:"30px"}}/>

                            <TextField id="standard-basic" label="First Name"  variant="standard" />
                            <TextField id="standard-basic" label="Last Name" variant="standard" style={{marginLeft:"20px"}}/>
                            <TextField id="standard-basic" label="E-Mail" variant="standard" />
                            <TextField id="standard-basic" label="Phone Number" type='number' variant="standard" style={{marginLeft:"20px"}}/>
                            <TextField id="standard-basic" label="Street Name" variant="standard" />
                            <TextField id="standard-basic" label="Street Number" type='number' variant="standard" style={{marginLeft:"20px"}}/>
                            <TextField id="standard-basic" label="Zip" type='number' variant="standard" />
                            <TextField id="standard-basic" label="State" variant="standard" style={{marginLeft:"20px"}} />
                            <TextField id="standard-basic" label="City" variant="standard" />
                            <TextField
                                id="filled-Extras"
                                select
                                label="Extras..."
                                defaultValue="Breakfast,TV,WiFi..."
                                variant="filled"
                                style={{marginLeft:"20px", width:'100px'}}
                            />
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="creditcard" control={<Radio />} label="Credit Card" />
                                <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                                <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                                <FormControlLabel
                                    value="bitcoin"
                                   
                                    control={<Radio />}
                                    label="Bitcoin"
                                />
                            </RadioGroup>
                            <p>person Notes</p>
                            <TextField
                                id="standard-search"
                                label="idm lab test"
                                type="search"
                                variant="standard"
                            />
                            <hr />
                            <FormControlLabel  control={<Switch />} label="Send me a reminder" />
                            <FormControlLabel control={<Switch />} label="Subscribe to newsletter" />
                            <FormControlLabel control={<Checkbox />} label="I confirm the information given abive" />
                            <Button onClick={formSubmit}>Add</Button>
                        </div>
                    ) : (
                        <p>No reservation selected.</p>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>


    );
};

export default ReservationTable;
