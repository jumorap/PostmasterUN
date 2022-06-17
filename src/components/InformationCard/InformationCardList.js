import React from 'react'
import PropTypes from 'prop-types'
import InformationCard from './InformationCard'
import { Stack } from '@mui/material'


function InformationCardList({informationList}) {
  return (
    <Stack spacing={8} justifyContent="center" alignItems="center">
        {informationList.map(info => (
          <InformationCard
            type={info.type}
            title={info.title}
            description={info.description}
            tags={info.tags}
            images={info.images}
            links={info.links}
            key={info.id}
            postID = {info.id}
          />
          ))}
    </Stack>
  )
}

InformationCardList.propTypes = {
    informationList : PropTypes.array,
}

export default InformationCardList
