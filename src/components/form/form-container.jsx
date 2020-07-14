import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Chip from "@material-ui/core/Chip";

import * as variables from "../../../config/variables";
import store from "../../stores/form-store";
import { items } from "../../../config/form-items";
import Demobar from "./demobar";
import FormBuilder from "./index.jsx";
import Main from "../main/Main";
import { axiosInstance as axios } from "../../../config/axios";

export default function FormContainer() {
  const { id } = useParams();
  const { push } = useHistory();
  const { title } = store.state;
  const [isError, setIsError] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [form, setForm] = useState();
  const { get } = axios;

  const fetchData = async () => {
    setIsError(false);
    try {
      const reqForm = await get(`/coord/formulary/${id}`);
      setForm(reqForm.data);
    } catch (error) {
      if (error.response.status === 404) {
        push("/forms");
      }
      setIsError(true);
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
      <Main title={form && form.title}>
        {form && (
          <div
            style={{
              width: '100%',
              margin: '1rem',
              paddingLeft: '1.6rem',
              paddingBottom: '1.5rem',
              fontSize: '14px'
            }}
          >
            <Chip
              style={{ marginLeft: '10px', fontSize: '14px'}}
              variant="outlined"
              color="primary"
              label={form.period.description}
            />
            <Chip
              style={{ marginLeft: '10px', fontSize: '14px'}}
              variant="outlined"
              color="primary"
              label={form.curriculum.name}
            />
          </div>
        )}
        {handleUpdate()}
        <Demobar formData={form} setIsUpdate={setIsUpdate} />
        <FormBuilder.ReactFormBuilder
          variables={variables}
          toolbarItems={items}
          id={id}
        />
      </Main>
    </>
  );
}
