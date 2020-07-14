import React from 'react';
import store from '../../stores/form-store';
import ReactFormGenerator from './form';
import { useStyles } from './formStyles';
import EditFormHeader from './form-header';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const answers = {};
// const answers = {
//   'dropdown_38716F53-51AA-4A53-9A9B-367603D82548': 'd2',
//   'checkboxes_8D6BDC45-76A3-4157-9D62-94B6B24BB833': [
//     'checkboxes_option_8657F4A6-AA5A-41E2-A44A-3E4F43BFC4A6',
//     'checkboxes_option_1D674F07-9E9F-4143-9D9C-D002B29BA9E4',
//   ],
//   'radio_buttons_F79ACC6B-7EBA-429E-870C-124F4F0DA90B': [
//     'radiobuttons_option_553B2710-AD7C-46B4-9F47-B2BD5942E0C7',
//   ],
//   'rating_3B3491B3-71AC-4A68-AB8C-A2B5009346CB': 4,
// };



export default class Demobar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    };
    const update = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    store.subscribe(state => update(state.data));

    console.log({store})
  }
  

  showPreview() {
    this.setState({
      previewVisible: true,
    });
  }

  showShortPreview() {
    this.setState({
      shortPreviewVisible: true,
    });
  }

  showRoPreview() {
    this.setState({
      roPreviewVisible: true,
    });
  }

  closePreview() {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    });
  }

  _onChange(data) {
    this.setState({
      data,
    });
  }

  // eslint-disable-next-line no-unused-vars
  _onSubmit(data) {
    console.log('onSubmit', data);
    // Place code to post json data to server here
  }

  render() {
    const { roPreviewVisible } = this.state
    let roModalClass = 'modal ro-modal';
    if (roPreviewVisible) {
      roModalClass += ' show';
    }

    const addIndex = () => {
      return { zIndex: 3000 }
    }
    const { formData } = this.props

    return (
      <div className="clearfix" style={{ margin: '10px', width: '70%' }}>
        {/* <h4 className="pull-left">{store.state.title}</h4> */}
        <Button 
          variant="outlined" 
          color="primary" 
          className="pull-right" 
          style={{ marginRight: '5px' }} 
          onClick={this.showRoPreview.bind(this)}
        > Visualizar Formulário
        </Button>

        {
          formData && !formData.published_at &&
          <EditFormHeader 
            setIsUpdate={this.props.setIsUpdate} 
            formData={this.props.formData} 
          />
        }
        { roPreviewVisible &&
          <div style={addIndex()} className={roModalClass}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div style={{
                  paddingBottom: '1rem',
                  textAlign: 'right',
                  borderBottom: '1px solid #e5e5e5'
                }}>
                  <IconButton onClick={() => this.closePreview()} data-dismiss="modal" aria-label="Fechar">
                    <CloseIcon />
                  </IconButton>
                </div>

                <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name="Voltar"
                  answer_data={answers}
                  action_name="Salvar"
                  form_action="/"
                  form_method="POST"
                  read_only={true}
                  variables={this.props.variables}
                  hide_actions={true}
                  data={this.state.data} />
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
