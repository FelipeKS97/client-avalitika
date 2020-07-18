import React, { useEffect, useState} from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './mainStyles'
import Main from './main'
import { axiosInstance as axios } from '../../../config/axios'
import SchoolIcon from '../../assets/school1.svg'
import FormIcon from '../../assets/form1.svg'
import DashboardIcon from '../../assets/dashboard1.svg'



export default function MainContainer({ history }) {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const [period, setPeriod] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { get } = axios

  useEffect(() => {
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const result = await get('/coord/info')
            setPeriod(result.data[0].description)
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }
    fetchData()
  },[])

    const gridData = [{
        name: 'Formulários',
        icon: FormIcon,
        location: '/forms'
    },
    {
        name: 'Turmas',
        icon: SchoolIcon,
        location: '/classes'
    },
    {
        name: 'Painel',
        icon: DashboardIcon,
        location: '/dashboard'
    }]

    function renderGrid(data, history) {
      return (
        data.map((d, i) => (
        <Grid key={i} item xs={12} md={4} lg={3}>
            <ButtonBase className={classes.paperButton} onClick={() => history.push(d.location)}>
                <Paper className={classes.paperButton}>
                    <img className={classes.paperImage} src={d.icon} alt={d.name} />
                    <Typography color="primary" variant="h4" component="h5">
                        {d.name}
                    </Typography>
                </Paper>
            </ButtonBase>
        </Grid>
        ))
      )
    }

  return (
    <Main title={period && `Semestre Atual: ${period}`}>
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3} direction="row"
                justify="center"
                alignItems="center">
                { renderGrid(gridData, history) }  
            </Grid>
        </Container>
    </Main>
  );
}