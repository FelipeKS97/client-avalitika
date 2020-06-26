import React, {useEffect, useState} from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useParams, useHistory } from "react-router-dom";

import { tableIcons } from '../../../config/table-config'
import { axiosInstance as axios } from '../../../config/axios'
import { useStyles } from './answerStyles'
import Main from '../main/main'

export default function AnswersContainer() {
  const classes = useStyles();
  const [answersList, setAnswersList] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams()
  const { push } = useHistory()
  const { get } = axios

  function convertToColumns(data) {
    return data.map(d => {
      return {
        id: d.id,
        created_at: d.created_at,
        discipline: d.class.discipline.name,
        professor: d.class.professor.user.fullname
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const reqAnswers = await get(`/coord/formulary/${id}/answers`)
        let answerColumns = convertToColumns(reqAnswers.data.data)
        setAnswersList(answerColumns)    
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    id && fetchData()
  },[id])

  const columnDefinition = [
    { 
      title: 'Identificador', 
      field: 'id' 
    },
    { 
      title: 'Horário de Envio', 
      field: 'created_at', 
    },
    { 
      title: 'Disciplina', 
      field: 'discipline' 
    },
    { 
      title: 'Professor Avaliado', 
      field: 'professor' 
    }
  ]

  return (
    <Main title={'Respostas'}>
      <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} direction="row"
            justify="left"
            alignItems="center">                     
            <MaterialTable
              title="Respostas"
              style={{width: '100%'}}
              columns={columnDefinition}
              data={answersList}
              icons={tableIcons}
              options={{actionsColumnIndex: 4, showTitle: false}}
              localization={{
                header: {actions: 'Ações'},
                body: {emptyDataSourceMessage: "Sem respostas para este formulário até o momento."},
                pagination: {
                  searchTooltip: "Buscar",
                  searchPlaceholder: "Buscar",
                  labelRowsSelect: "Linhas",
                  labelRowsPerPage: "Linhas por página",
                  firstAriaLabel: "Primeira Página",
                  firstTooltip: "Primeira Página",
                  previousAriaLabel: "Página Anterior",
                  previousTooltip: "Página Anterior",
                  nextAriaLabel: "Próxima Página",
                  nextTooltip: "Próxima Página",
                  lastAriaLabel: "Última Página",
                  lastTooltip: "Última Página",
                },
                toolbar: {
                  searchTooltip: "Buscar",
                  searchPlaceholder: "Buscar",
                }
              }}
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
      </Container>
    </Main>
  );
}
