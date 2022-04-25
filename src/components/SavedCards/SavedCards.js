import React from 'react'
import PropTypes from 'prop-types'

function SavedCards(props) {
  return (
    <div>SavedCards</div>
  )
}

SavedCards.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    date: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    onclick: PropTypes.func
}

export default SavedCards
