import React, { useEffect, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import { styled } from '@mui/system';
import ElementsBar from './ElementsBar';

const getColor = (props) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isFocused) {
      return '#2196f3';
  }
  return '#eeeeee';
}

const Container = styled("div")({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: "2px",
  borderRadius: "2px",
  borderColor: "${props => getColor(props)}",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
})

export default function DropZone({fileList, setfileList}) {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({accept: {'image/*': []} , maxFiles:10, onDropAccepted : addFile});

  function addFile(file){
    setfileList(prev => [...prev, ...file])
    console.log(fileList)
  }

  function deleteFile(_, index){
    const newList = fileList.filter((_, idx) => idx !== index)
    setfileList(newList)
  }
  
  return (
    <div className="container">
      <Container {...getRootProps({isFocused, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        <p>Arrastra aca las imagenes que deseas subir</p>
      </Container>
      <ElementsBar list={fileList} emptyMessage = "" handleTagDelete={deleteFile}/>
    </div>
  );
}