import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useCustomSnackbar from '../../hooks/CustomSnackbar'
import { useParams } from "react-router-dom";
import { useHistory, useRouteMatch } from "react-router-dom";

import { useStyles } from './reportStyles'
import MainContent from '../main/MainContent'
import ReportItem from './ReportItem'
import { axiosInstance as axios } from '../../../config/axios'


export default function AnswerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState()
  const [period, setPeriod] = useState()
  const [discipline, setDiscipline] = useState(null)
  const [disciplineList, setDisciplineList] = useState([])
  const [professor, setProfessor] = useState(null)
  const [professorList, setProfessorList] = useState([])
  const [answers, setAnswers] = useState([])
  const [snackbar, setSnackbarStatus] = useCustomSnackbar() 
  const classes = useStyles();
  const { id } = useParams()
  const { push } = useHistory()
  const { url } = useRouteMatch()
  const { get } = axios

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqInfo = await get('/coord/info')
        setPeriod(reqInfo.data[0])
        const reqForm = await get(`/coord/formulary/${id}`)
        setForm(reqForm.data)
        const reqDisciplines = await get(`/student/disciplines?curriculum_id=${reqForm.data.curriculum.id}`)
        setDisciplineList(reqDisciplines.data)
        const reqAnswers = await get(`/coord/formulary/${id}/answers`)
        setAnswers(reqAnswers.data)
      } catch (error) {
        setSnackbarStatus({ 
          open: true, 
          message: "Ocorreu um erro no carregamento."
        })
      }
    }
    id && fetchData()
  },[])

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const req = await get(`/student/classes`, {
            params: {
              discipline_id: discipline.id,
              period_id: period.id
            }
        })
        setProfessorList(req.data)
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    setProfessor(null)
    discipline && period && fetchData()
  },[discipline])

  const defaultDisciplineProps = {
    options: disciplineList,
    getOptionLabel: (option) => option.name,
  };
  const defaultProfsProps = {
    options: professorList,
    getOptionLabel: (option) => option.prof_name,
  };

  return (
    <MainContent title={'Relatório'}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} direction="row"
          justify="left"
          alignItems="center"
        >
          <Grid item xs={6} md={6} lg={6}>
            <Autocomplete
              {...defaultDisciplineProps}
              classes={{paper: classes.paper}}
              id="Disciplina"
              debug
              noOptionsText={"Vazio"}
              onChange={(e, val)=> setDiscipline(val)}
              renderInput={(params) => (
              <TextField 
                variant={'outlined'} 
                {...params} 
                size={'medium'} 
                label="Disciplina" 
                margin="normal" />
              )}
            />
          </Grid> 
          <Grid item xs={6} md={6} lg={6}>
            <Autocomplete
              {...defaultProfsProps}
              value={professor}
              classes={{paper: classes.paper}}
              id="Professor"
              debug
              noOptionsText={"Vazio"}
            //  disabled={curriculumList && true}
              onChange={(e, val)=> setProfessor(val)}
              renderInput={(params) => (
              <TextField 
                variant={'outlined'} 
                {...params} 
                size={'medium'} 
                label="Professor" 
                margin="normal"
                value={professor}
              />
              )} 
            />
          </Grid>     
        </Grid>

        {/* <Button id="print-button" onClick={() => printPDF() }>GERAR PDF</Button> */}

        <Grid id="test-site" container spacing={3} direction="row"
             
        >
          {ReportItem({form, answers, discipline, professor})}
        </Grid>   
        { snackbar }
      </Container>
    </MainContent>
  )
}