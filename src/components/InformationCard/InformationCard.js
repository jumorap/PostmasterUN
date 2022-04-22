import React from 'react'
import PropTypes from 'prop-types'
//This component display the information card of navegacion principal
function InformationCard(props) {
  return (
    <div>InformationCard</div>
  )
}

InformationCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        favorite: PropTypes.bool
        })),
    images: PropTypes.arrayOf(PropTypes.string),
    links: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string
        })),
    favorite: PropTypes.bool,
}

export default InformationCard
