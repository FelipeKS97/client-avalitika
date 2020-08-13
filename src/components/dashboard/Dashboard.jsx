import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import CustomLineChart from './CustomLineChart';
import Summary from './Summary';
import RecentAnswers from './RecentAnswers';
import CustomPieChart from './CustomShapePieChart'
import MainContent from '../main/MainContent'
import useCustomSnackbar from '../../hooks/CustomSnackbar'
import { axiosInstance as axios } from '../../../config/axios'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 300,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [summary, setSummary] = useState()
  const [period, setPeriod] = useState()
  const [course, setCourse] = useState()
  const [snackbar, setSnackbarStatus] = useCustomSnackbar() 
  const { get } = axios

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const reqInfo = await get('/coord/info')
        setPeriod(reqInfo.data[0])
        setCourse(reqInfo.data[1])
        let queryString = `?period_id=${reqInfo.data[0].id}&course_id=${reqInfo.data[1].course_id}`
        const reqSummary = await get(`/coord/dashboard${queryString}`)
        setSummary(reqSummary.data)
      } catch (error) {
        setSnackbarStatus({
          open: true, 
          message: "Ocorreu um erro no carregamento."
        })
      } finally {
        setIsLoading(false);
      }
    }
    fetchData()
  },[])


  return (
    <MainContent title={ period && `Semestre Atual: ${period.description}` || 'Carregando...'}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2}>
          {/* Chart */}
          <Grid item xs={12} md={6} lg={8}>
            <Paper className={fixedHeightPaper}>
              <CustomLineChart data={summary && summary.months} />
            </Paper>
          </Grid>
          {/* Summary */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper className={fixedHeightPaper}>
              <Summary data={summary} /> 
            </Paper>
          </Grid>
          {/* Recent Answers */}
          <Grid item xs={12}>
            {!isLoading && !isError &&
              <Paper className={classes.paper}>
                <RecentAnswers data={summary} />
              </Paper>
            }
          </Grid>
        </Grid>
        { snackbar }
      </Container>
    </MainContent>
  );
}