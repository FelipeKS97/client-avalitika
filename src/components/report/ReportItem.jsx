import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import ReportGenerator from "./ReportGenerator";
import { removeStringTags } from "../../utils/convert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "0rem 1rem"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  graphDetails: {
    display: 'flex', 
    flexDirection: 'row-reverse'
  },
  reportHeader: {
    margin: '1rem 2rem'
  }
}));

export default function ReportItem({ form, answers, professor, discipline }) {
  const classes = useStyles();
  const [chart, setChart] = useState({type: 'bar'})
  const [totalAnswers, setTotalAnswers] = useState(0)
  const jsonForm = form && JSON.parse(form.json_format);
  const isDisabled = !professor || !discipline

  return (
    <div className={classes.root}>
      <div className={classes.reportHeader}>
        <Typography color="primary" variant="subtitle1" gutterBottom>
          {form && `Título: ${form.title}`}
        </Typography>
        <Typography color="primary" variant="subtitle2" gutterBottom>
          {form && `Período: ${form.period.description}`}
        </Typography>
        <Typography color="primary" variant="subtitle2" gutterBottom>
          {discipline ? `Disciplina: ${discipline.name}` : 'Disciplina: Não Selecionado'}
        </Typography>
        <Typography color="primary" variant="subtitle2" gutterBottom>
          {professor ? `Professor: ${professor.prof_name}`: 'Professor: Não Selecionado'}
        </Typography>
        <Typography color="primary" variant="subtitle2" gutterBottom>
          {totalAnswers > 0 && `Total de Respostas: ${totalAnswers}`}
        </Typography>
      </div>
      {jsonForm &&
        jsonForm.map((item) => {
          if (!item.static) {
            return (
              <Accordion disabled={isDisabled} TransitionProps={{ unmountOnExit: true }} key={item.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography color={"primary"} className={classes.heading}>
                    {removeStringTags(item.label)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={item.options && classes.graphDetails}>
                    {item.options && 
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Tipo de Gráfico</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        autoWidth
                        value={chart.type}
                        onChange={e => setChart({type: e.target.value})}
                      >
                        <MenuItem value={'bar'}>Barra</MenuItem>
                        <MenuItem value={'circle'}>Circular</MenuItem>
                      </Select>
                    </FormControl>}
                    {ReportGenerator({answers, item, chart, professor, discipline, setTotalAnswers})}
                </AccordionDetails>
                {/* <AccordionActions>
                    <Button size="small" color="primary">
                        Visualizar tudo
                    </Button>
                </AccordionActions> */}
              </Accordion>
            );
          }
        })}
    </div>
  );
}
