import styled from '@emotion/styled';
import { Stack, Typography } from '@mui/material';
import React from 'react'

const StyledBox = styled(Stack)(({ theme }) => ({
    border: `1px solid gray`,
    borderRadius: `5px`,
    padding: `10px`,
  }));

export default function Container(props) {
  return (
    <StyledBox spacing={2}>
      <Typography variant="body2" sx={{ color: "gray" }}>
        {props.name}
      </Typography>
      {props.children}
    </StyledBox>
  )
}
