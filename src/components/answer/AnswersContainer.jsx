import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useParams, useHistory, useRouteMatch } from "react-router-dom";

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
  const { url } = useRouteMatch()
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

  console.log({url})

  return (
    <Main title={'Respostas'}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} direction="row"
          justify="left"
          alignItems="center"
        >
          <div className={classes.actionContainer}>
            <Button 
              color="primary" 
              variant="outlined" 
              onClick={() => push(`${url}/report`)} 
              size="small"
              startIcon={<BarChartIcon />}
            >
              Relatório
            </Button>
          </div>

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
