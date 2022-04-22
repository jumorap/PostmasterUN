import React from 'react'
import PropTypes from 'prop-types'

function Filters(props) {
  return (
    <div>FIlters</div>
  )
}

Filters.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        favorite: PropTypes.bool,
        selected: PropTypes.bool
        })),
}

export default Filters
