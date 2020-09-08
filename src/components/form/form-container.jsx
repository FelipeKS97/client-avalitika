import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { useStyles } from "./formStyles";
import * as variables from "../../../config/variables";
import store from "../../stores/form-store";
import { items } from "../../../config/form-items";
import FormActionBar from "./form-action-bar";
import FormBuilder from "./index.jsx";
import MainContent from "../main/MainContent";
import useCustomSnackbar from '../../hooks/CustomSnackbar'
import { axiosInstance as axios } from "../../../config/axios";

export default function FormContainer() {
  const classes = useStyles();
  const { id } = useParams();
  const { push } = useHistory();
  const { title } = store.state;
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [snackbar, setSnackbarStatus] = useCustomSnackbar()
  const [form, setForm] = useState();
  const { get } = axios;

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const reqForm = await get(`/coord/formulary/${id}`);
      setForm(reqForm.data);
      setIsError(false)
    } catch (error) {
      if (error.response.status === 404) {
        push("/forms");
      }
      setIsError(true);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = () => {
    if (isUpdate) {
      fetchData();
      setIsUpdate(false);
    }
  };

  return (
    <>
      <MainContent title={form && form.title} isLoading={isLoading}>
        {form && (
          <div
            style={{
              width: '100%',
              margin: '1rem 0.5rem',
              paddingBottom: '1.5rem',
              paddingLeft: window.outerWidth > 768 ? '25px' : '0px',
              fontSize: '14px'
            }}
          >
            <Chip
              style={{ marginLeft: '10px', fontSize: '14px'}}
              color="primary"
              label={`Período: ${form.period.description}`}
            />
            <Chip
              style={{ marginLeft: '10px', fontSize: '14px'}}
              color="primary"
              label={`Grade Curricular: ${form.curriculum.name}`}
            />
          </div>
        )}
        <Container maxWidth="lg" className={classes.container}>
          {handleUpdate()}
          <FormActionBar setIsLoading={setIsLoading} setSnackbarStatus={setSnackbarStatus} formData={form} setIsUpdate={setIsUpdate} />
          <FormBuilder.ReactFormBuilder
            variables={variables}
            toolbarItems={items}
            id={id}
          />
          {snackbar}
        </Container>
      </MainContent>
    </>
  );
}
