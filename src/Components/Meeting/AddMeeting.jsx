import React from 'react';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { Alert, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { addMeeting } from '../../store/server.js';
import dataStore from '../../store/store.js';

const AddMeeting = observer((props) => {

    const [meeting, setMeeting] = useState({});
    const [typeService, setTypeService] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (event) => {
        setTypeService(event.target.value);
    };

    const handleMeetingChange = (event) => {
        const newMeeting = event.target === undefined
            ? { ...meeting, dateTime: event }
            : { ...meeting, [event.target.name]: event.target.value };
        newMeeting.typeService = typeService;
        setMeeting(newMeeting);
        validateForm(newMeeting);
    };

    const validateForm = (newMeeting) => {
        const requiredFields = ['name', 'phone', 'email', 'dateTime'];
        const isValid = requiredFields.every(field => newMeeting[field]);
        setIsFormValid(isValid);
    };

    const handleClose = () => {
        props.setOpen(false);
        props.setOpenAlert(false);
    };

    const handleUpdate = () => {
        addMeeting(meeting).then(x => {
            setMeeting({});
            handleClose();
        }).catch(() => {
            setIsFormValid(false);
        });
    };

    return (
        <>
            <div>
                <Dialog open={props.open} onClose={handleClose}>
                    <DialogTitle>ADD MEETING</DialogTitle>
                    <DialogContent>
                        <FormControl required sx={{ m: 1, minWidth: 224 }}>
                            <InputLabel id="demo-simple-select-required-label">Type Of Service</InputLabel>
                            <Select
                                // labelId="demo-simple-select-required-label"
                                // id="demo-simple-select-required-label"
                                id="typeService" value={typeService} label="Type Of Service*" onChange={handleChange}
                            >
                                {dataStore.services.map((service, index) => (
                                    <MenuItem key={index} value={service.name}>
                                        {service.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            margin="dense" id="name" name="name" label="name" type="text" fullWidth variant="standard" value={meeting.name} onChange={handleMeetingChange}
                        />
                        <TextField
                            margin="dense" id="phone" name="phone" label="phone" type="tel" fullWidth variant="standard" value={meeting.phone} onChange={handleMeetingChange}
                        />
                        <TextField
                            margin="dense" id="email" name="email" label="email" type="text" fullWidth variant="standard" value={meeting.email} onChange={handleMeetingChange}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                id="dateTime1" name="dateTime1" value={meeting.dateTime1} onChange={handleMeetingChange}
                            />
                        </LocalizationProvider>
                    </DialogContent>
                    {dataStore.isAddMeeting ?
                        alert("The meeting added successfully! See you :) ") :
                        alert("It is not possible to make an appointment at this time, Please choose other time")}
                    {/* {props.openAlert && !props.failed &&
                        <Alert severity="error" > It is not possible to make an appointment at this time.<br /> You can try at another time </Alert>} */}
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleUpdate} disabled={!isFormValid}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div >
        </>
    );
});

export default AddMeeting;
