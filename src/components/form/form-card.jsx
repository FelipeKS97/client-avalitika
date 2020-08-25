import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import IconButton from '@material-ui/core/IconButton';
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
  cardTitle: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

export default function FormCard({
  id,
  haveContent,
  title,
  curriculum,
  period,
  isLoading,
  isStudent,
  isError,
  status,
  published_at,
  published_until,
  setSnackbarStatus
}) {
  const classes = useStyles()
  const actionProps = {
    id,
    status,
    published_at,
    published_until,
    isStudent,
    setSnackbarStatus
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {isLoading ? <Skeleton animation="wave" />  : curriculum && curriculum.name}
        </Typography>
        <Typography className={classes.cardTitle} color="primary" variant="h6" component="h2">
          {isLoading ? <Skeleton animation="wave" />  : title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {isLoading ? <Skeleton animation="wave" />  : period && period.description}
        </Typography>
      </CardContent>
      <CardActions>
      {isLoading ? <Skeleton animation="wave" />
        : !isError && haveContent && <ActionButtons {...actionProps} />
      }
      </CardActions>
    </Card>
  );
}

function ActionButtons({ id, status, published_at, published_until, isStudent, setSnackbarStatus }) {
  const { push } = useHistory()
  const { path } = useRouteMatch()
  return (
    <>
      {!isStudent ?
        <>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => push(`${path}/${id}`)}
            size="small">
              { published_at ? 'Visualizar' : 'Editar' }
          </Button>
          <AlertPublish
            id={id}
            status={status}
            published_at={published_at}
            published_until={published_until}
            setSnackbarStatus={setSnackbarStatus}
          />
        </>
      :
        <Button
          color="primary"
          variant="outlined"
          onClick={() => push(`${path}/${id}`)}
          size="small">
            Responder
        </Button>
      }
    </>
  )
}
