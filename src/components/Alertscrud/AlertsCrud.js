import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'


export default function AlertsCrud(message) {
    const [open, setOpen] = useState(true);

    return (
        <Box sx={{ width: '100%'}}>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label={"close"}
                            color={"inherit"}
                            size={"small"}
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize={"inherit"} />
                        </IconButton>
                    }
                >
                    {message.message}
                </Alert>
            </Collapse>
        </Box>
    );
}
