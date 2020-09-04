import React, { useEffect, useState, useRef } from 'react';
import store from '../../stores/form-store';
import ReactFormGenerator from './form';
import { useStyles } from './formStyles';
import EditFormHeader from './form-header';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function FormActionBar(props) {
  const [data, setData] = useState([])
  const [previewVisible, setPreviewVisible] = useState(false)
  const descriptionElementRef = useRef(null);
  const answers = {};

  useEffect(() => {
    const storeSubscribe = () => {
      store.subscribe(state => setData(state.data));
    }
    storeSubscribe()
  }, [])

  useEffect(() => {
    if (previewVisible) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [previewVisible]);


  function showPreview() {
    setPreviewVisible(true)
  }

  function closePreview() {
    setPreviewVisible(false)
  }

  return (
    <div className="clearfix" style={{ padding: '1rem 1rem 1rem 3rem', width: '70%', display: 'flex', justifyContent: 'flex-end'}}>
      <Button
        variant="outlined"
        color="primary"
        className="pull-right"
        style={{ marginRight: '5px' }}
        onClick={() => showPreview()}
      > Visualizar Formulário
      </Button>

      { props.formData && !props.formData.published_at &&
        <EditFormHeader
          setIsUpdate={props.setIsUpdate}
          formData={props.formData}
          setSnackbarStatus={props.setSnackbarStatus}
        />
      }

      <Dialog
        fullWidth
        open={previewVisible}
        onClose={closePreview}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Visualização</DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          > <>
            <ReactFormGenerator
              download_path=""
              back_action="/"
              back_name="Voltar"
              answer_data={answers}
              action_name="Salvar"
              form_action="/"
              form_method="POST"
              read_only={true}
              variables={props.variables}
              hide_actions={true}
              data={data} />
            </>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePreview} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
