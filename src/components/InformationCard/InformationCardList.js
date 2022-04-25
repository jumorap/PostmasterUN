import React from 'react'
import PropTypes from 'prop-types'
import InformationCard from './InformationCard'
import { Stack } from '@mui/material'


function InformationCardList(props) {
  return (
    <Stack spacing={4} justifyContent="center" alignItems="center">
        {props.informationList.map(info => (
          <InformationCard
            type={info.type}
            title={info.title}
            description={info.description}
            tags={info.tags}
            images={info.images}
            links={info.links}
            favorite={info.favorite}
          />
          ))}
    </Stack>
  )
}

InformationCardList.propTypes = {
    informationList : PropTypes.array,
}

export default InformationCardList
