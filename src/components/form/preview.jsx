/**
  * <Preview />
  */

import React, { Component } from 'react';
import update from 'immutability-helper';
import store from '../../stores/form-store';
import FormElementsEdit from './form-elements-edit';
import ReactFormGenerator from './form';
import SortableFormElements from './sortable-form-elements';
import Button from '@material-ui/core/Button';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormNotifications from './form-notifications'

const { PlaceHolder } = SortableFormElements;
const answers = {}

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.editForm = React.createRef();
    this.state = {
      data: [],
      answer_data: {},
      isLoading: false,
      isLoadingSave: false
    };
    this.seq = 0;

    const onUpdate = this._onChange.bind(this);
    store.subscribe(state => onUpdate(state.data));

    this.moveCard = this.moveCard.bind(this);
    this.insertCard = this.insertCard.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // All of the automatic saving operations to the form has been removed.
    // If you wish this behavior, just uncomment the line(s) bellow.
    // if (this.props.data !== nextProps.data) {
    //   store.dispatch('saveForm', nextProps.data, testID);
    // }
  }

  async componentDidMount() {
    const { data, url, saveUrl, id, formId } = this.props;
    this.setState({isLoading: true})
    await store.dispatch('load', { id: formId , loadUrl: url, saveUrl, data: data || [] });
    document.addEventListener('mousedown', this.editModeOff);
    this.setState({isLoading: false})
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.editModeOff);
  }

  editModeOff = (e) => {
    if (this.editForm.current && !this.editForm.current.contains(e.target)) {
      this.manualEditModeOff();
    }
  }

  manualEditModeOff = () => {
    const { editElement } = this.props;
    if (editElement && editElement.dirty) {
      editElement.dirty = false;
      this.updateElement(editElement);
    }
    this.props.manualEditModeOff();
  }

  _setValue(text) {
    return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
  }

  updateElement(element) {
    const { data } = this.state;
    const { formId } = this.props
    let found = false;

    for (let i = 0, len = data.length; i < len; i++) {
      if (element.id === data[i].id) {
        data[i] = element;
        found = true;
        break;
      }
    }

    if (found) {
      this.seq = this.seq > 100000 ? 0 : this.seq + 1;
      // All of the automatic saving operations to the form has been removed.
      // If you wish this behavior, just uncomment the line(s) bellow.
      store.dispatch('saveForm', data, formId);
    }
  }

  _onChange(data) {
    const answer_data = {};

    data.length > 0 && data.forEach((item) => {
      if (item && item.readOnly && this.props.variables[item.variableKey]) {
        answer_data[item.field_name] = this.props.variables[item.variableKey];
      }
    });

    this.setState({
      data,
      answer_data,
    });
  }

  _onDestroy(item) {
    store.dispatch('delete', item);
  }

  insertCard(item, hoverIndex) {
    const { data } = this.state;
    data.splice(hoverIndex, 0, item);
    this.saveData(item, hoverIndex, hoverIndex);
  }

  moveCard(dragIndex, hoverIndex) {
    const { data } = this.state;
    const dragCard = data[dragIndex];
    this.saveData(dragCard, dragIndex, hoverIndex);
  }

  // eslint-disable-next-line no-unused-vars
  cardPlaceHolder(dragIndex, hoverIndex) {
    // Dummy
  }

  saveData(dragCard, dragIndex, hoverIndex) {
    const newData = update(this.state, {
      data: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      },
    });
    this.setState(newData);
    // All of the automatic saving operations to the form has been removed.
    // If you wish this behavior, just uncomment the line(s) bellow.
    // store.dispatch('saveForm', newData.data, testID);
  }

  getElement(item, index) {
    const SortableFormElement = SortableFormElements[item.element];
    return (
      <SortableFormElement
        id={item.id}
        seq={this.seq}
        index={index}
        moveCard={this.moveCard}
        insertCard={this.insertCard}
        mutable={false}
        parent={this.props.parent}
        editModeOn={this.props.editModeOn}
        isDraggable={true}
        key={item.id}
        sortData={item.id}
        data={item}
        _onDestroy={this._onDestroy}
      />
    );
  }

  handleSave = async (data, formId) => {
    await store.dispatch('saveForm', { json_format: data, id: parseInt(formId) })
  }

  renderNoEdit(published_at) {
    let classes = this.props.className;
    return (
    <div style={{marginLeft: '3rem', padding: '3rem'}} className={classes}>
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
    </div>)
  }


  render() {
    const { formId } = this.props
    const { published_at, notification, is_loading_save } = store.state
    let classes = this.props.className;
    if (this.props.editMode) { classes += ' is-editing'; }
    const data = Array.isArray(this.state.data) && this.state.data.filter(x => !!x);
    const items = Array.isArray(data) && data.map((item, index) => this.getElement(item, index));
    return (
      <>
      { published_at && published_at.length > 0 ?
        this.renderNoEdit(published_at)
      :
      <div style={{margin: window.outerWidth > 768 ? '0rem 3rem' : '0'}} className={classes}>
        <div className="edit-form" ref={this.editForm}>
          { this.props.editElement !== null &&
            <FormElementsEdit
              showCorrectColumn={this.props.showCorrectColumn}
              files={this.props.files}
              manualEditModeOff={this.manualEditModeOff}
              preview={this}
              element={this.props.editElement}
              updateElement={this.updateElement}
            />
          }
        </div>
        <div className="Sortable">{items}</div>
          { this.state.isLoading ?
              <PlaceHolder
              id="loading-form-place-holder"
              show
              text="Aguarde, carregando..."
              />

            :
              <PlaceHolder
              id="form-place-holder"
              show={items.length === 0}
              index={items.length}
              moveCard={this.cardPlaceHolder}
              insertCard={this.insertCard}
              />
          }
        <div>
          {formId &&
            <Button size="large" variant="contained" color="primary" className="pull-right"
              style={{ marginRight: '10px' }}
              onClick={() => this.handleSave(data, formId)}
              startIcon={<SaveOutlinedIcon />}
            >
            { is_loading_save ? <CircularProgress color="inherit" /> : 'Salvar'}
            </Button>
          }
        </div>
        <FormNotifications notification={notification} />
      </div>
      }
      </>
    );
  }
}
Preview.defaultProps = {
  showCorrectColumn: false, files: [], editMode: false, editElement: null, className: 'react-form-builder-preview pull-left',
};
