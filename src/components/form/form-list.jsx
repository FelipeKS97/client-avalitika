import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './formStyles'
import Main from '../main/main'
import FormCard from './form-card'
import EditFormHeader from './form-header'
import { axiosInstance as axios } from '../../../config/axios'
import useCustomSnackbar from '../../hooks/CustomSnackbar'
import PaginationContainer from '../pagination/pagination'

export default function FormListContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [snackbar, setSnackbarStatus] = useCustomSnackbar()
  const [isUpdate, setIsUpdate] = useState(false);
  const [formList, setFormList] = useState([])
  const classes = useStyles();
  const { get } = axios

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const reqForms = await get('/coord/formulary')
        //   params: {
        //     curriculum_id: discipline.id,
        //     period_id: 1
        //   }
        // })
        setFormList(reqForms.data.data)   
      } catch (error) {
        setIsError(true);
        setSnackbarStatus({ 
          open: true, 
          message: "Ocorreu um erro no carregamento."
        })
      }
      setIsLoading(false);
    }
    fetchData()

    if(isUpdate) {
      fetchData()
      setIsUpdate(false)
    }
  },[])

  return (
    <Main title={'Semestre Atual: 2020.1'}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} direction="row"
            justify="left"
            alignItems="top"
        >{formList.length > 0 ?
            formList.map((el, i) => (
              <Grid key={i} item xs={12} md={4} lg={3}>
                <FormCard 
                  setSnackbarStatus={setSnackbarStatus} 
                  isError={isError} 
                  {...el}
                />
              </Grid>
            ))
            :
            <> {Array.from({ length: 8 }, (x, i) => (
                <Grid key={i} item xs={12} md={4} lg={3}>
                  <FormCard isError={isError} isLoading={isLoading}/>
                </Grid>
              ))}
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