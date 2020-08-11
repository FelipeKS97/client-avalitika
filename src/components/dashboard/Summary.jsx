import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Title from './Title';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns'

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

let now = new Date().getTime();
let formattedDate = format(now, "dd 'de' MMMM' de' yyyy', às ' HH:mm'h'", {
  locale: ptBR,
});

export default function Summary({ data }) {
  const classes = useStyles();
  let total = data && data.months.reduce((accum, curr) => {
    return accum + curr.amount 
  }, 0)

  return (
    <React.Fragment>
      <Title>Total</Title>
      <Typography component="p" variant="h4">
        { 
        total ? `${total} Respostas` 
        : 
         data === undefined ? (<Skeleton />) : 'Nenhuma Resposta'
        }
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {`Atualizado hoje, ${formattedDate}`}
      </Typography>

      <div>
        <Link color="primary" href="/forms">
          {'Visualizar todos os formulários'}
        </Link>
      </div>
    </React.Fragment>
  );
}