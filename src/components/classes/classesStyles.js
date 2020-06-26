import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    select: {
        width: '70%',
    },
    paper: {
      fontSize: '1.5rem !important'
    },

}));
  