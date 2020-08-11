import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './formStyles'
import Main from '../main/main'
import { NoContent } from '../main/NoContent'
import FormCard from './form-card'
import EditFormHeader from './form-header'
import { axiosInstance as axios } from '../../../config/axios'
import useCustomSnackbar from '../../hooks/CustomSnackbar'
import PaginationContainer from '../pagination/pagination'

export default function FormListContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [snackbar, setSnackbarStatus] = useCustomSnackbar()
  const [formList, setFormList] = useState([])
  const [courseId, setCourse] = useState()
  const classes = useStyles();
  const { get } = axios

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const reqInfo = await get('/coord/info')
        setCourse(reqInfo.data[1].course_id)  
        const reqForms = await get('/coord/formulary')
        setFormList(reqForms.data)  
      } catch (error) {
        setIsError(true);
        setSnackbarStatus({ 
          open: true, 
          message: "Ocorreu um erro no carregamento.",
          // action: setIsUpdate
        })
      } finally {
        setIsLoading(false);
      }
    }
    fetchData()

    if(isUpdate) {
      fetchData()
      setIsUpdate(false)
    }
  },[])

  const filteredForms = formList.filter(form => form.curriculum.course_id === courseId)
  const haveContent = filteredForms.length > 0
  const isEmpty = !isError && !isLoading

  return (
    <Main title={'Semestre Atual: 2020.1'}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} direction="row"
            justify="left"
            alignItems="top"
        >{haveContent ?
            filteredForms.map((el, i) => (
              <Grid key={i} item xs={12} md={4} lg={3}>
                <FormCard 
                  setSnackbarStatus={setSnackbarStatus} 
                  isError={isError}
                  isLoading={isLoading}
                  haveContent={haveContent}
                  {...el}
                />
              </Grid>
            ))
            :
            <> 
            {!isError && isLoading ? Array.from({ length: 8 }, (x, i) => (
                <Grid key={i} item xs={12} md={4} lg={3}>
                  <FormCard 
                    isError={isError} 
                    isLoading={isLoading}
                    haveContent={haveContent}
                  />
                </Grid>
              )) : <NoContent title={"Ops, nada por aqui. Que tal criar um formulário?"} />
            }
            </>
        }
          </Grid>
          <EditFormHeader setSnackbarStatus={setSnackbarStatus} isCreate/>
          {snackbar}
          {/* <PaginationContainer /> */}
      </Container>
    </Main>
  )
}