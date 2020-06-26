import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useParams } from "react-router-dom";
import { useHistory, useRouteMatch } from "react-router-dom";

import ReactFormGenerator from '../form/form'
import { useStyles } from './answerStyles'
import Main from '../main/main'
import FormCard from '../form/form-card'
import { axiosInstance as axios } from '../../../config/axios'


export default function AnswerContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formAnswer, setFormAnswer] = useState()
  const classes = useStyles();
  const { id } = useParams()
  const { push } = useHistory()
  const { path } = useRouteMatch()
  const { get, post } = axios

  useEffect(() => {
    const fetchData = async () => {
      const reqAnswer = await get(`/coord/formulary/answer/${id}`)
      setFormAnswer(reqAnswer.data)
    }
    id && fetchData()
  },[id])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsError(false);
  //     setIsLoading(true);
  //     try {
  //       const req = await get(`/student/classes`, {
  //           params: {
  //             discipline_id: discipline.id,
  //             period_id: period.id
  //           }
  //       })
  //       setProfessorList(req.data.data)
  //     } catch (error) {
  //       setIsError(true);
  //     }
  //     setIsLoading(false);
  //   }
  //   discipline && period && fetchData()
  // },[discipline])


  function RenderForm({ json_answer, formulary: { json_format } }) {
    return (
    <div style={{padding: '2rem', width:'100vw'}}>
      <ReactFormGenerator
        download_path=""
        // back_action="/"
        // back_name="Voltar"
        answer_data={JSON.parse(json_answer)}
        action_name="Enviar Resposta"
        form_action="/"
        form_method="POST"
        read_only={true}
        // variables={variables}
        hide_actions={true}
        data={JSON.parse(json_format)} />
    </div>)
  }

  return (
    <Main title={formAnswer && formAnswer.formulary.title || ''}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} direction="row"
            justify="left"
            alignItems="center"
        >
            <Grid item xs={4} md={4} lg={6}>
              <FormControl style={{width:'100%'}}>
                <TextField
                  disabled
                  required id="standard-required" 
                  label={ formAnswer && formAnswer.class.professor.user.fullname || "" } 
                  defaultValue={ formAnswer && formAnswer.class.professor.user.fullname || "" }
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>       
            </Grid> 
            <Grid item xs={3} md={3} lg={6}>
              <FormControl style={{width:'100%'}}>
                  <TextField
                    disabled
                    required id="standard-required" 
                    label={ formAnswer && formAnswer.class.discipline.name || "" } 
                    defaultValue={ formAnswer && formAnswer.class.discipline.name || "" }
                    InputProps={{
                      readOnly: true,
                    }} 
                  />
                </FormControl>
            </Grid>         
        </Grid>

        <Grid container spacing={3} direction="row"
            justify="left"
            alignItems="top"
        >
            {formAnswer && <RenderForm {...formAnswer} />} 
        </Grid>
      </Container>
    </Main>
  )
}