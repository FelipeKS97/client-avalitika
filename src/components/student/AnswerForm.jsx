import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import useCustomSnackbar from '../../hooks/CustomSnackbar'
import { useParams } from "react-router-dom";
import { useHistory, useRouteMatch } from "react-router-dom";

import ReactFormGenerator from '../form/form'
import { useStyles } from './studentStyles'
import Main from '../main/main'
import FormCard from '../form/form-card'
import { axiosInstance as axios } from '../../../config/axios'


export default function AnswerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState()
  const [answers, setAnswers] = useState({})
  const [period, setPeriod] = useState()
  const [discipline, setDiscipline] = useState()
  const [disciplineList, setDisciplineList] = useState([])
  const [professor, setProfessor] = useState()
  const [professorList, setProfessorList] = useState([])
  const [snackbar, setSnackbarStatus] = useCustomSnackbar() 
  const classes = useStyles();
  const { id } = useParams()
  const { push } = useHistory()
  const { path } = useRouteMatch()
  const { get, post } = axios

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqInfo = await get('/coord/info')
        setPeriod(reqInfo.data[0])
        const reqForm = await get(`/student/formulary/${id}`)
        setForm(reqForm.data)
        const reqDisciplines = await get(`/student/disciplines?curriculum_id=${reqForm.data.curriculum_id}`)
        setDisciplineList(reqDisciplines.data.data)
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
        setProfessorList(req.data.data)
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
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

  async function sendAnswers(json_answer) {
      if(discipline && period && professor) {
        let randomNumber = Math.floor((Math.random() * 99809875) + 1);
        let obj = {
            discipline_id: discipline.id,
            professor_id: professor.professor_id,
            period_id: period.id,
            verification_id: `${randomNumber}`,
            formulary_id: parseInt(id),
            json_answer
        }

        try {
          const req = await post('/student/formulary', obj)
          setSnackbarStatus({
            open: true, 
            message: "Resposta submetida com sucesso."
          })
          push(`${path}`)
        } catch (error) {
          setSnackbarStatus({ 
            open: true, 
            message: "Ocorreu um erro no envio, tente mais tarde."
          })
        }
      }
  }


  function RenderForm({ json_format }) {
    return (
    <div style={{padding: '2rem', width:'100vw'}}>
      <ReactFormGenerator
        download_path=""
        answer_data={answers}
        action_name="Enviar Resposta"
        form_action="/"
        form_method="POST"
        read_only={false}
        onSubmit={(data)=> sendAnswers(data)}
        hide_actions={false}
        data={JSON.parse(json_format)} 
      />
    </div>)
  }

  return (
    <Main title={form && form.title}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} direction="row"
            justify="left"
            alignItems="center"
        >
            <Grid item xs={4} md={4} lg={6}>
              <Autocomplete
                {...defaultDisciplineProps}
                classes={{paper: classes.paper}}
                id="Disciplina"
                debug
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
            <Grid item xs={3} md={3} lg={6}>
                <Autocomplete
                 {...defaultProfsProps}
                 classes={{paper: classes.paper}}
                 id="Professor"
                 debug
                //  disabled={curriculumList && true}
                 onChange={(e, val)=> setProfessor(val)}
                 renderInput={(params) => (
                 <TextField 
                   variant={'outlined'} 
                   {...params} 
                   size={'medium'} 
                   label="Professor" 
                   margin="normal" />
                 )}
                />
            </Grid>     
        </Grid>

        <Grid container spacing={3} direction="row"
            justify="left"
            alignItems="top"
        >
            {form && <RenderForm {...form} />} 
        </Grid>   
        { snackbar }
      </Container>
    </Main>
  )
}