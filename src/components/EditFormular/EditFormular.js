import React from 'react'
import PropTypes from 'prop-types'

const openInPopup = item => {
  setRecordForEdit(item)
  setOpenPopup(true)
}

function EditFormular({list}) {
  return (
    <div> <PageHeader
    title="New Employee"
    subTitle="Form design with validation"
    icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
/>
<Paper className={classes.pageContent}>

    <Toolbar>
        <Controls.Input
            label="Search Employees"
            className={classes.searchInput}
            InputProps={{
                startAdornment: (<InputAdornment position="start">
                    <Search />
                </InputAdornment>)
            }}
            onChange={handleSearch}
        />
        <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
        />
    </Toolbar>
    <TblContainer>
        <TblHead />
        <TableBody>
            {
                recordsAfterPagingAndSorting().map(item =>
                    (<TableRow key={item.id}>
                        <TableCell>{item.fullName}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.mobile}</TableCell>
                        <TableCell>{item.department}</TableCell>
                        <TableCell>
                            <Controls.ActionButton
                                color="primary"
                                onClick={() => { openInPopup(item) }}>
                                <EditOutlinedIcon fontSize="small" />
                            </Controls.ActionButton>
                            <Controls.ActionButton
                                color="secondary">
                                <CloseIcon fontSize="small" />
                            </Controls.ActionButton>
                        </TableCell>
                    </TableRow>)
                )
            }
        </TableBody>
    </TblContainer>
    <TblPagination />
</Paper>
<Popup
    title="Employee Form"
    openPopup={openPopup}
    setOpenPopup={setOpenPopup}
>
    <EmployeeForm
        recordForEdit={recordForEdit}
        addOrEdit={addOrEdit} />
</Popup></div>
  )
}



EditFormular.propTypes = {}

export default EditFormular
