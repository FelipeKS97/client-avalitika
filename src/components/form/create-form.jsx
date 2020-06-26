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
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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

export default function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('')
  const [periodList, setPeriodList] = useState([])
  const [curriculumList, setCurriculumList] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { path, url } = useRouteMatch();
  const { push } = useHistory()
  const { get, post } = axios

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const reqInfo = await get('/coord/info')
        setPeriodList([reqInfo.data[0]])
        const reqCurricula = await get(`/coord/curricula?course_id=${reqInfo.data[1].course_id}`)
        setCurriculumList(reqCurricula.data)    
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
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
        console.log(reqForm.data)
        push(`/forms/${reqForm.data.id}`)     
      } catch (error) {
        setIsError(true);
        handleClose()
      }
    }
    setIsLoading(false);
  }


  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Novo Formulário
      </Button> */}
      <Fab onClick={handleClickOpen} className={classes.fab} color="primary" aria-label="Novo Formulário">
        <AddIcon />
      </Fab>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Novo Formulário
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCreate}>
              Criar
            </Button>
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
      </Dialog>
    </div>
  );
}

function useSelect(options, label) {
  const [value, setValue] = useState('');
  const random = Math.random()
  const select = (
    <FormControl style={{width:'100%'}}>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
      labelId="simple-select-label"
      id="simple-select-label"
      value={value}
      onChange={e => setValue(e.target.value)}
      > { 
        options && options.map((op, i) => 
          <MenuItem key={i} value={op.id}>{ op.name || op.description }</MenuItem>
        )
        }
      </Select>
    </FormControl>)
  return [value, select];
}