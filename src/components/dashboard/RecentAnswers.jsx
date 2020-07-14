import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2020', 'Avaliação Semestral', 'FNBD', 'Fulano', 312.44),
  createData(1, '16 Mar, 2020', 'Avaliação Semestral', 'ALGO', 'Ciclano', 866.99),
  createData(2, '16 Mar, 2020', 'Avaliação Semestral', 'CALC', 'Beltrano', 100.81),
  createData(3, '16 Mar, 2020', 'Avaliação Semestral', 'FPIN', 'Fulano', 654.39),
  createData(4, '15 Mar, 2020', 'Satisfação Institucional', 'PROO', 'Beltrano', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <>
      <Title>Respostas Recentes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Formulário</TableCell>
            <TableCell>Disciplina</TableCell>
            <TableCell>Professor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Visualizar mais respostas
        </Link>
      </div>
    </>
  );
}