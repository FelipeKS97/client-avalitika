import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { convertRecentAnswers } from '../../utils/convert';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function RecentAnswers({ data }) {
  const classes = useStyles();
  return (
    data && data.data.length > 0 ? 
    <>
      <Title>Últimas Respostas</Title>
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
          {convertRecentAnswers(data.data).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.discipline}</TableCell>
              <TableCell>{row.professor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="/forms">
          Visualizar formulários
        </Link>
      </div>
    </> : null
  );
}