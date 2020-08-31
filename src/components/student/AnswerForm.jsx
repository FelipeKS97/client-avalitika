import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useCustomSnackbar from '../../hooks/CustomSnackbar'
import { useParams } from "react-router-dom";
import { useHistory, useRouteMatch } from "react-router-dom";

import ReactFormGenerator from '../form/form';
import { useStyles } from './studentStyles';
import MainContent from '../main/MainContent';
import VerificationDialog from './VerificationDialog'
import { axiosInstance as axios } from '../../../config/axios';


export default function AnswerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState()
  const [verificationId, setVerificationId] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [openDialog, setOpenDialog] = useState(true);
  const [answers, setAnswers] = useState({})
  const [period, setPeriod] = useState()
  const [discipline, setDiscipline] = useState(null)
  const [disciplineList, setDisciplineList] = useState([])
  const [professor, setProfessor] = useState(null)
  const [professorList, setProfessorList] = useState([])
  const [snackbar, setSnackbarStatus] = useCustomSnackbar()
  const classes = useStyles();
  const randomNumber = Math.floor((Math.random() * 99809875) + 1);
  const { id } = useParams()
  const { push } = useHistory()
  const { url } = useRouteMatch()
  const { get, post } = axios

  const verificationProps = {
    openDialog,
    setOpenDialog,
    setIsVerified,
    setVerificationId,
    isVerified,
    verificationId
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqInfo = await get('/coord/info')
        setPeriod(reqInfo.data[0])
        const reqForm = await get(`/student/formulary/${id}`)
        setForm(reqForm.data)
        const reqDisciplines = await get(`/student/disciplines?curriculum_id=${reqForm.data.curriculum_id}`)
        setDisciplineList(reqDisciplines.data)
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

  async function sendAnswers(json_answer) {
    if(discipline && period && professor) {
      let obj = {
        discipline_id: discipline.id,
        professor_id: professor.professor_id,
        period_id: period.id,
        verification_id: verificationId,
        formulary_id: parseInt(id),
        json_answer
      }

      try {
        const req = await post('/student/formulary', obj)
        setSnackbarStatus({
          open: true,
          message: "Resposta submetida com sucesso."
        })
        push(`${url}`)
      } catch (error) {
        const errMessage = error.response.data.message
        setSnackbarStatus({
          open: true,
          message: errMessage || "Ocorreu um erro no envio, tente novamente mais tarde."
        })
      }
    }
  }


  function RenderForm({ json_format, discipline, professor }) {
    const isSelected = !!(discipline && professor)
    const handleWarning = () => {
      // if(!isVerified) {
      //   setSnackbarStatus({
      //     open: true,
      //     message: "Por favor, faça primeiro a verificação."
      //   })
      // } else if(!isSelected) {
      if(!isSelected) {
      setSnackbarStatus({
          open: true,
          message: "Por favor, selecione a disciplina e o professor."
        })
      }
    }
    return (
    <div onClick={() => handleWarning()} style={{padding: '2rem', width:'100vw'}}>
      <ReactFormGenerator
        download_path=""
        answer_data={answers}
        action_name="Enviar Resposta"
        form_action="/"
        form_method="POST"
        read_only={!isSelected}
        onSubmit={(data) => sendAnswers(data)}
        hide_actions={false}
        data={JSON.parse(json_format)}
      />
    </div>)
  }

  return (
    <MainContent title={form && form.title} isLoading={isLoading}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} direction="row">
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
                size={'large'}
                label="Professor"
                margin="normal"
                value={professor}
              />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} direction="row"

        >
          {form &&
            <RenderForm
              discipline={discipline}
              professor={professor}
              {...form}
            />}
        </Grid>
        { snackbar }
        <VerificationDialog {...verificationProps} />
      </Container>
    </MainContent>
  )
}