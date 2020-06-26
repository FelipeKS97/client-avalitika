import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory, useRouteMatch } from "react-router-dom";
import AlertPublish from './alert-publish'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function FormCard({
  id,
  title, 
  curriculum, 
  period, 
  isLoading,
  isStudent, 
  status, 
  published_at, 
  published_until,
}) {
  const classes = useStyles()
  const actionProps = {
    id,
    status, 
    published_at, 
    published_until,
    isStudent
  }
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {isLoading ? <Skeleton animation="wave" />  : curriculum && curriculum.name}
        </Typography>
        <Typography color="primary" variant="h5" component="h2">
          {isLoading ? <Skeleton animation="wave" />  : title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {isLoading ? <Skeleton animation="wave" />  : period && period.description}
        </Typography>
      </CardContent>
      <CardActions>
      {isLoading ? <Skeleton animation="wave" />  
        :  <ActionButtons {...actionProps} /> 
      }
      </CardActions>{console.log({isStudent})}
    </Card>
  );
}

function ActionButtons({ id, status, published_until, isStudent }) {
  const { push } = useHistory()
  const { path } = useRouteMatch()
  return (
    <>
      {!isStudent ?
        <> 
        <Button color="primary" variant="outlined" onClick={()=> push(`${path}/${id}`)} size="small">Visualizar</Button>
        { published_until && <Button color="primary" variant="outlined" onClick={()=> push(`/answers/${id}`)} size="small">Respostas</Button> }
        <AlertPublish id={id} status={status} published_until={published_until} />
        </>
      :
        <Button color="primary" variant="outlined" onClick={()=> push(`${path}/${id}`)} size="small">Responder</Button>
      }
    </>
  )
}