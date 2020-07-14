import React, {useEffect, useState} from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import Button from '@material-ui/core/Button';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
      }
      setIsLoading(false);
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
      }
      setIsLoading(false);
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
    if(newClasses.length > 0) {
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
  }
  const columnClasses = [
    { 
      title: 'Professores', 
      field: 'id', 
      render: rowData => 
        <FixedTags 
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
      />
    </>
  )
}

function FixedTags({ 
  classes, 
  rowData, 
  curriculum, 
  period, 
  profsList, 
  newClassList,
  setNewClassList 
}) {
  const [value, setValue] = useState([]);

  const actualClasses = classes.length > 0 && classes.filter(c => c.discipline_id === rowData.id)
  let filteredClasses = actualClasses.length > 0 && actualClasses.map(c => {
    return {
      prof_name: c.prof_name,
      discipline_id: rowData.id,
      professor_id: c.professor_id
    }
  })

  useEffect(() => {
    if(filteredClasses && curriculum && period) {
      setValue([...filteredClasses])
      setNewClassList(previousState => [
        ...filteredClasses, 
        ...previousState
      ])
    } else {
      setValue([])
    }
  },[classes, curriculum, period])

  function formatProfs(prof) {
    return prof.map(p => {
       return {
        prof_name: p.fullname,
        discipline_id: rowData.id,
        professor_id: p.user_id
      }
    })
  }
  const profsValue = formatProfs(profsList)
  //console.log({newClassList})

  return (
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={value}
      onChange={(event, newValue) => {
        // console.log({newValue})
        if(filteredClasses) {
          setValue([
            ...newValue.filter((option) => filteredClasses.indexOf(option) === -1)
          ])
        } else {
          setValue([
            ...newValue
          ])
        }
        setNewClassList(previousState => [
          ...newValue, 
          ...previousState.filter((option) => value.indexOf(option) === -1)
        ])
      }}
      options={profsValue}
      getOptionSelected={(option, value) => {
        if(option.professor_id === value.professor_id) return true
      }}
      getOptionLabel={(option) => option.prof_name}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option && option.prof_name}
            {...getTagProps({ index })}
            //disabled={fixedOptions.indexOf(option) !== -1}
          />
        ))
      }
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Professor(es)" variant="outlined" placeholder="Adicionar Professor..." />
      )}
    />
  );
}
