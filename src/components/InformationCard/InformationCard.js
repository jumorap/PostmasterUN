import PropTypes from 'prop-types'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { AlignHorizontalCenter } from '@mui/icons-material';
import { Box } from '@mui/system';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const styleHome = {
    title: {color: '#000000',
    fontWeight: '700',
    fontSize: '32px',
    paddingLeft: '2%',
    paddingTop: '2%'
    },
    subtitle: {
      color: '#000000',
      fontWeight: '400',
      fontSize: '24px',
      paddingLeft: '2%'
    },
    textCont: {
      fontWeight: '400',
      fontSize: '20px',
      paddingLeft: '2%',
      paddingRight: '2%',
      paddingTop: '1%',
      paddingBottom: '0.5%',
      alignJustify: 'justify'
    },
    tagStyle: {
      width: 'fit-content',
      height: 'fit-content',
      padding: '1%',
      background: 'rgba(255, 37, 37, 0.6)',
    },
    buttontext: {
      color: '#FFFFFF',
      width: '124px',
      height: '24px',
      padding: '5%',
      ml: '500px',
      alignItems: 'center'
    },
    linkStyle: {
      width: 'fit-content',
      height: 'fit-content',
      left: '110px',
      top: '893px',

      background: 'rgba(196, 196, 196, 0.4)'
    },
    linkText: {
      width: '38px',
      height: '18px',
      left: '119px',
      top: '896px',

      fontWeight: '400',
      fontSize: '15px',
      lineHeight: '18px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center'
    }
};

//This component display the information card of navegacion principal. This is an example, 
//due to there's no backend development yet.
function InformationCard(props) {
  return (
    <Box>
      <Card sx={{mb: '8px'}}>
        <CardHeader 
          title={
          <Typography style={styleHome.title}>
              Postmaster
          </Typography>}
          subheader={
            <Typography style={styleHome.subtitle}>
              Primer lugar a investigación con sello UNAL
            </Typography>}>
        </CardHeader>
    
        <CardContent>
          <Typography style={styleHome.textCont}>
            Esta es una pieza perteneciente a la campaña Orgullo UNAL, es de fondo azul con textos en blanco, tiene una fotografía donde se puede apreciar un procedimiento quirúrgico de apendicitis llevado a cabo por un equipo de cirujanos. 
          </Typography>
          <div style={styleHome.tagStyle}>
            <Typography style={styleHome.buttontext}>
              Investigación
            </Typography>
          </div>
        </CardContent>

        <CardMedia
          component="img"
          height="194"
          paddingBottom = '2%'
          image='/public/assets/Captura.JPG'
          sx={{ml:'2%'}}
          cl
        />
        <CardContent>
          <div style={styleHome.linkStyle}>
            <Typography style={styleHome.linkText}>
              link 1
            </Typography>
          </div>
        </CardContent>

      </Card>
    </Box>
    
  )
}

InformationCard.propTypes = {
    category: PropTypes.string,
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
