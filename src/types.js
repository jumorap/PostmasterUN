import PropTypes from 'prop-types'

const publication_t = {
    type: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
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

const tags_t = {
    id: PropTypes.string,
    name: PropTypes.string,
    dependency: PropTypes.string,
}

export { publication_t, tags_t }