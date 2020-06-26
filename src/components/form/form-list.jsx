import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './formStyles'
import Main from '../main/main'
import FormCard from './form-card'
import CreateForm from './create-form'
import { axiosInstance as axios } from '../../../config/axios'
import PaginationContainer from '../pagination/pagination'


export default function FormListContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
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
        setFormList(reqForms.data.data)   
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData()
    console.log({isUpdate})

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
                  <FormCard {...el}/>
                </Grid>
            ))
            :
            <Grid item xs={12} md={4} lg={3}>
              <FormCard isLoading={isLoading}/>
            </Grid>
        }
          </Grid>
          <CreateForm />
          {/* <PaginationContainer /> */}
      </Container>
    </Main>
  )
}