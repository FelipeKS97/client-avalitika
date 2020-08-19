import React, {useEffect, useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import useCustomSnackbar from '../../hooks/CustomSnackbar'
import { axiosInstance as axios } from '../../../config/axios'
import { useStyles } from './classesStyles'
import MainContent from '../main/MainContent'
import ClassesTable from './ClassesTable'

export default function ClassesContainer() {
  const classes = useStyles();
  const [period, setPeriod] = useState()
  const [periodList, setPeriodList] = useState([])
  const [curriculum, setCurriculum] = useState()
  const [curriculumList, setCurriculumList] = useState([])
  const [snackbar, setSnackbarStatus] = useCustomSnackbar()
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { get } = axios

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const reqInfo = await get('/coord/info')
        setPeriodList([reqInfo.data[0]])
        const reqCurricula = await get(`/coord/curricula?course_id=${reqInfo.data[1].course_id}`)
        setCurriculumList(reqCurricula.data)    
      } catch (error) {
        setIsError(true);
        setSnackbarStatus({ 
          open: true, 
          message: "Ocorreu um erro no carregamento."
        })
      } finally {
        setIsLoading(false);
      }
    }
    fetchData()
  },[])

  const defaultProps = {
    options: curriculumList,
    getOptionLabel: (option) => option.name ? option.name : '' ,
  };
  const defaultPeriodProps = {
    options: periodList,
    getOptionLabel: (option) => option.description ? option.description : '',
  };

  return (
    <MainContent title={'Turmas'}>
      <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} direction="row">
              <Grid item xs={6} md={10} lg={10}>
                <Autocomplete
                  {...defaultProps}
                  classes={{paper: classes.paper}}
                  id="Grade Curricular"
                  debug
                  noOptionsText={"Vazio"}
                  onChange={(e, val)=> setCurriculum(val)}
                  renderInput={(params) => (
                  <TextField variant={'outlined'} {...params} size={'medium'} label="Grade Curricular" margin="normal" />
                  )}
                />
              </Grid>
              <Grid item xs={2} md={2} lg={2}>
                <Autocomplete
                  {...defaultPeriodProps}
                  classes={{paper: classes.paper}}
                  id="Período"
                  defaultValue={'2020.1'}
                  debug
                  noOptionsText={"Vazio"}
                  onChange={(e, val)=> setPeriod(val)}
                  renderInput={(params) => (
                  <TextField variant={'outlined'} {...params} size={'medium'} label="Período" margin="normal" />
                  )}
                />
              </Grid>
              {period && curriculum &&          
                <ClassesTable 
                  period={period}
                  curriculum={curriculum}
                  setSnackbarStatus={setSnackbarStatus}
                />
              }
          </Grid>
          {snackbar}
      </Container>
    </MainContent>
  );
}

const periods = [
  {title: '2020.1', year: 2020 },
  {title: '2020.2', year: 2020 },
  {title: '2021.1', year: 2021 },
  {title: '2021.1', year: 2021 }
]

const curricula = [
  { title: 'BSI-2012', year: 2012 },
  { title: 'BSI-2018', year: 2018 },
];