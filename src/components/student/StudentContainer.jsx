import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import useCustomSnackbar from '../../hooks/CustomSnackbar'
import { useStyles } from './studentStyles'
import MainContent from '../main/MainContent'
import FormCard from '../form/form-card'
import { axiosInstance as axios } from '../../../config/axios'


export default function FormListContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [snackbar, setSnackbarStatus] = useCustomSnackbar() 
  const [formList, setFormList] = useState([])
  const [course, setCourse] = useState({})
  const [courseList, setCourseList] = useState([])
  const [curriculum, setCurriculum] = useState({})
  const [curriculumList, setCurriculumList] = useState([])
  const classes = useStyles();
  const { get } = axios

  useEffect(() => {
    const fetchCourses = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const reqCourses = await get(`/student/courses`)
        setCourseList(reqCourses.data)
      } catch (error) {
        setIsError(true);
        setSnackbarStatus({ 
          open: true, 
          message: "Ocorreu um erro no carregamento."
        })
      } 
      finally {
        setIsLoading(false);
      }
    }
    fetchCourses()
  },[])

  useEffect(() => {
    const fetchCurricula = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const reqCurricula = await get(`/student/curricula?course_id=${course.id}`)
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
    course && fetchCurricula()
  },[course])

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const reqForms = await get(`/student/formularies?curriculum_id=${curriculum.id}`)
        setFormList(reqForms.data)   
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
    curriculum && fetchData()
  },[curriculum])

  const defaultCurriculumProps = {
    options: curriculumList,
    getOptionLabel: (option) => option.name,
  };
  const defaultCourseProps = {
    options: courseList,
    getOptionLabel: (option) => option.name,
  };

  const haveContent = formList.length > 0

  return (
    <MainContent title={'Formulários Disponíveis'}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} direction="row"
          justify="left"
          alignItems="center"
        >
          <Grid item xs={4} md={4} lg={6}>
              <Autocomplete
                {...defaultCourseProps}
                classes={{paper: classes.paper}}
                id="Curso"
                debug
                noOptionsText={"Vazio"}
                onChange={(e, val)=> setCourse(val)}
                noOptionsText={"Vazio"}
                renderInput={(params) => (
                <TextField 
                  variant={'outlined'} 
                  {...params} 
                  size={'medium'} 
                  label="Curso" 
                  margin="normal" />
                )}
              />
          </Grid> 
          <Grid item xs={3} md={3} lg={6}>
              <Autocomplete
                {...defaultCurriculumProps}
                classes={{paper: classes.paper}}
                id="Grade Curricular"
                debug
                noOptionsText={"Vazio"}
              //  disabled={curriculumList && true}
                onChange={(e, val)=> setCurriculum(val)}
                renderInput={(params) => (
                <TextField 
                  variant={'outlined'} 
                  {...params} 
                  size={'medium'} 
                  label="Grade Curricular" 
                  margin="normal" />
                )}
              />
          </Grid>         
        </Grid>

        <Grid container spacing={3} direction="row"
          justify="left"
          alignItems="top"
        >{haveContent &&
            formList.map((el, i) => (
                <Grid key={i} item xs={12} md={4} lg={3}>
                  <FormCard 
                    isStudent={true} 
                    haveContent={haveContent} 
                    {...el}
                    />
                </Grid>
            ))
            // :
            // <Grid item xs={12} md={4} lg={3}>
            //   <FormCard isStudent={true} isLoading={isLoading}/>
            // </Grid>
        }
          </Grid>
          {snackbar}
      </Container>
    </MainContent>
  )
}