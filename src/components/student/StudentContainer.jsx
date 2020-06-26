import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './studentStyles'
import Main from '../main/main'
import FormCard from '../form/form-card'
import { axiosInstance as axios } from '../../../config/axios'


export default function FormListContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formList, setFormList] = useState([])
  const [course, setCourse] = useState({})
  const [courseList, setCourseList] = useState([])
  const [curriculum, setCurriculum] = useState({})
  const [curriculumList, setCurriculumList] = useState([])
  const classes = useStyles();
  const { get } = axios

  useEffect(() => {
    const fetchCourses = async () => {
      const reqCourses = await get(`/student/courses`)
      setCourseList(reqCourses.data.data)
    }
    fetchCourses()
  },[])

  useEffect(() => {
    const fetchCurricula = async () => {
      const reqCurricula = await get(`/student/curricula?course_id=${course.id}`)
      setCurriculumList(reqCurricula.data.data)
    }
    course && fetchCurricula()
  },[course])

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const reqForms = await get(`/student/formularies?curriculum_id=${curriculum.id}`)
        setFormList(reqForms.data.data)   
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    curriculum && fetchData()
  },[curriculum])

  const defaultCurriculumProps = {
    //options: curricula,
    options: curriculumList,
    getOptionLabel: (option) => option.name,
  };
  const defaultCourseProps = {
    options: courseList,
    getOptionLabel: (option) => option.name,
  };

  return (
    <Main title={'Formulários Disponíveis'}>
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
                  onChange={(e, val)=> setCourse(val)}
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
        >{formList.length > 0 &&
            formList.map((el, i) => (
                <Grid key={i} item xs={12} md={4} lg={3}>
                  <FormCard isStudent={true} {...el}/>
                </Grid>
            ))
            // :
            // <Grid item xs={12} md={4} lg={3}>
            //   <FormCard isStudent={true} isLoading={isLoading}/>
            // </Grid>
        }
          </Grid>
      </Container>
    </Main>
  )
}