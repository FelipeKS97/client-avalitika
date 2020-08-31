import React, {useEffect, useState} from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import Button from '@material-ui/core/Button';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import ProfSelector from './ProfSelector'

import { tableIcons, localizationClasses } from '../../../config/table-config'
import { convertObjId } from '../../utils/convert'
import { axiosInstance as axios } from '../../../config/axios'
const { get, post } = axios


export default function RenderTable(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [disciplineList, setDisciplineList] = useState([])
  const [professorsList, setProfessorsList] = useState([])
  const [classList, setClassList] = useState([])
  const [newClassList, setNewClassList] = useState([])
  const { curriculum, period, setSnackbarStatus } = props

  useEffect(() => {
    const fetchProfs = async () => {
      try {
        const reqProfs = await get(`/coord/professors`)
        setProfessorsList(reqProfs.data)

      } catch (error) {
        setSnackbarStatus({
          open: true,
          message: "Ocorreu um erro no carregamento."
        })
      }
    }
    fetchProfs()
  },[])

  useEffect(() => {
    const fetchDisciplines = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const reqDisciplines = await get(`/coord/disciplines?curriculum_id=${curriculum.id}`)
        setDisciplineList(reqDisciplines.data)
      } catch (error) {
        setIsError(true);
        setSnackbarStatus({
          open: true,
          message: "Ocorreu um erro no carregamento das disciplinas."
        })
      } finally {
        setIsLoading(false);
      }
    }
    curriculum && fetchDisciplines()
  },[curriculum])

  useEffect(() => {
    const fetchClasses = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const disc_array = convertObjId(disciplineList)
        const reqClasses = await get('/coord/classes', {
          params: {
            period_id: period.id,
            disc_array
          }
        })
        setClassList(reqClasses.data)
      } catch (error) {
        setIsError(true);
        setSnackbarStatus({
          open: true,
          message: "Ocorreu um erro no carregamento das turmas."
        })
      } finally {
        setIsLoading(false);
      }
    }
    disciplineList.length > 0 && period && setNewClassList([])
    disciplineList.length > 0 && period && fetchClasses()
  },[disciplineList, period])

  const handleSave = async (newClasses, period) => {
    const disc_array = convertObjId(disciplineList)
    const obj = {
      period_id: period.id,
      classes: newClasses,
      disc_array
    }
    try {
      const reqClasses = await post(`/coord/classes`, obj)
      setSnackbarStatus({
        open: true,
        message: "Turmas salvas com sucesso."
      })
    } catch (error) {
      setSnackbarStatus({
        open: true,
        message: "Ocorreu um erro no salvamento. Tente novamente mais tarde."
      })
    }
  }
  const columnClasses = [
    {
      title: 'Professores',
      field: 'id',
      render: rowData =>
        <ProfSelector
          {...props}
          classes={classList}
          newClassList={newClassList}
          setNewClassList={setNewClassList}
          profsList={period && professorsList}
          rowData={rowData}
        />
    },
    {
      title: 'Disciplina',
      field: 'name'
    },
    {
      title: 'Sigla',
      field: 'slug'
    }
  ];

  return (
    <>
      <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '1.2rem'}}>
        <Button
          onClick={() => handleSave(newClassList, period)}
          variant="contained"
          color="primary"
          startIcon={<SaveOutlinedIcon />}
        >
          Salvar
        </Button>
      </div>
      <MaterialTable
        title="Professores das Turmas"
        style={{width: '100%'}}
        columns={columnClasses}
        data={disciplineList}
        icons={tableIcons}
        options={{
          showTitle: true,
        }}
        localization={localizationClasses}
        isLoading={isLoading}
      />
    </>
  )
}
