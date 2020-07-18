import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useParams, useHistory } from "react-router-dom";

import Main from '../main/main';
import useCustomSnackbar from '../../hooks/CustomSnackbar';
import { 
  tableIcons, 
  columnArrayAnswers, 
  localizationAnswers 
} from '../../../config/table-config';
import { axiosInstance as axios } from '../../../config/axios';
import { convertToColumns } from '../../utils/convert';
import { formatArrayDates } from '../../utils/formatDates';
import { useStyles } from './answerStyles';


export default function AnswersContainer() {
  const classes = useStyles();
  const [answersList, setAnswersList] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [snackbar, setSnackbarStatus] = useCustomSnackbar() 
  const { id } = useParams()
  const { push } = useHistory()
  const { get } = axios
  
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const reqAnswers = await get(`/coord/formulary/${id}/answers`)
        let answerColumns = convertToColumns(reqAnswers.data)
        setAnswersList(answerColumns)    
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
    id && fetchData()
  },[id])

  const haveContent = answersList.length > 0 

  return (
    <Main title={'Respostas'}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} direction="row"
          justify="left"
          alignItems="center">
          
          <MaterialTable
            title="Últimas respostas"
            style={{width: '100%'}}
            columns={columnArrayAnswers}
            data={haveContent ? formatArrayDates(answersList) : []}
            icons={tableIcons}
            options={{ actionsColumnIndex: 4 }}
            localization={localizationAnswers}
            actions={[
              {
                icon: ()=> <VisibilityIcon />,
                tooltip: 'Visualizar Resposta',
                onClick: (event, rowData) => {
                  push(`/answer/${rowData.id}`)
                }
              }
            ]}
          />
        </Grid>
        {snackbar}
      </Container>
    </Main>
  );
}
