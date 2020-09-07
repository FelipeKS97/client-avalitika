import React, { forwardRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';


import useSelect from '../../hooks/CustomSelect'
import { axiosInstance as axios } from '../../../config/axios'
import { useRouteMatch, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(6),
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditFormHeader({ isCreate, isLoading, setIsLoading, formData, setIsUpdate, setSnackbarStatus }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('')
  const [periodList, setPeriodList] = useState([])
  const [curriculumList, setCurriculumList] = useState([])
  const [isError, setIsError] = useState(false);
  const { path, url } = useRouteMatch();
  const { push, replace } = useHistory()
  const { get, post, put } = axios

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
        const reqInfo = await get('/coord/info')
        setPeriodList([reqInfo.data[0]])
        const reqCurricula = await get(`/coord/curricula?course_id=${reqInfo.data[1].course_id}`)
        setCurriculumList(reqCurricula.data)
      } catch (error) {
        setIsError(true);
      }
    }
    fetchData()
  },[])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [curriculum_id, CurriculumSelect] = useSelect(curriculumList, 'Grade Curricular')
  const [period_id, PeriodSelect] = useSelect(periodList, 'Período')

  const handleCreate = async () => {
    setIsError(false);
    setIsLoading(true);
    if(period_id && curriculum_id && title) {
      let obj = {
        period_id,
        curriculum_id,
        title,
        json_format: []
      }
      try {
        const reqForm = await post(`/coord/formulary`, obj)
        handleClose()
        push(`/forms/${reqForm.data.id}`)
      } catch (error) {
        setIsError(true)
        handleClose()
        setSnackbarStatus({
          open: true,
          message: "Ocorreu um erro, tente mais tarde."
        })
      }
    } else {
      setSnackbarStatus({
        open: true,
        message: "Por favor, preencha todos os campos."
      })
    }
    setIsLoading(false);
  }

  const handleEdit = async () => {
    setIsError(false);
    setIsLoading(true);
    if(period_id && curriculum_id && title) {
      let obj = {
        period_id,
        curriculum_id,
        title,
        json_format: JSON.parse(formData.json_format)
      }
      try {
        const reqForm = await put(`/coord/formulary/${formData.id}`, obj)
        setIsUpdate(true)
        handleClose()
        replace(`/forms/${formData.id}`)
      } catch (error) {
        setIsError(true)
        handleClose()
        setSnackbarStatus({
          open: true,
          message: "Ocorreu um erro, tente mais tarde."
        })
      }
    } else {
      setSnackbarStatus({
        open: true,
        message: "Por favor, preencha todos os campos."
      })
    }
    setIsLoading(false);
  }

  const handleDelete = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const delForm = await axios.delete(`/coord/formulary/${formData.id}`)
      setIsUpdate(true)
      push(`/forms`)
    } catch (error) {
      setSnackbarStatus({
        open: true,
        message: "Ocorreu um erro, tente mais tarde."
      })
      setIsError(true)
    } finally {
      handleClose()
      setIsLoading(false);
    }
  }


  return (
    <div>
      { isCreate ?
        <Tooltip title="Novo Formulário">
          <Fab
            onClick={handleClickOpen}
            className={classes.fab}
            color="primary"
            aria-label="Novo Formulário"
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        :
        <Button className="pull-right" style={{marginRight: '10px'}} variant="outlined" color="primary" onClick={handleClickOpen}>
          Editar Cabeçalho
        </Button>
      }
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            {
              isCreate ?
              <>
                <Typography variant="h6" className={classes.title}>
                  Novo Formulário
                </Typography>
                { isLoading ?
                  'Carregando...' :
                  <Button autoFocus color="inherit" onClick={handleCreate}>
                      Criar
                  </Button>
                }
              </>
              :
              <>
                <Typography variant="h6" className={classes.title}>
                  Cabeçalho do Formulário
                </Typography>
                { isLoading ?
                  'Carregando...' :
                  <Button autoFocus color="inherit" onClick={handleEdit}>
                      Editar
                  </Button>
                }
              </>
            }
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Título"
              type="title"
              fullWidth
              value={title}
              onChange={(e)=> setTitle(e.target.value)}
            />
          </ListItem>
          <Divider />
          <ListItem>
            {curriculumList.length > 0 && CurriculumSelect}
          </ListItem>
          <ListItem>
            {periodList.length > 0 && PeriodSelect}
          </ListItem>
        </List>
        {!isCreate &&
          <div style={{margin: "auto 0px 10px 10px"}}>
            <Button variant="outlined" color="secondary" onClick={() => handleDelete()}>
              Excluir Formulário
            </Button>
          </div>
        }
      </Dialog>
    </div>
  );
}
