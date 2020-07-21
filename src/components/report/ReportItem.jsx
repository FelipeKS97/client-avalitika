import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
}));

export default function ReportItem({ form, answers, professor, discipline }) {
  const classes = useStyles();
  const jsonForm = form && JSON.parse(form.json_format);
  const isDisabled = !professor || !discipline

  return (
    <div className={classes.root}>
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
                <AccordionDetails>
                    {ReportGenerator({answers, item, professor, discipline})}
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
