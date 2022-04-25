import React from 'react'
import PropTypes from 'prop-types'
import { Chip } from '@mui/material'

/**
 * Button to select a filter, when the user clicks on a filter button
 * @param {string} label - The label of the filter button
 * @param {boolean} selected - The selected state of the filter button
 * @param {function} onClick - The function to call when the user clicks on the filter button
 * @return {React.Component}
 */
function FilterButton(props) {
  return (
    <Chip
        key={props.key}
        label={props.label}
        onClick={() => {
            props.onClick()
        }}
        color={props.selected ? "primary" : "default"}
    />
  )
}

FilterButton.propTypes = {
    label: PropTypes.string,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
}

export default FilterButton
