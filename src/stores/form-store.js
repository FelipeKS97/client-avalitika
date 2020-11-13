import Store from 'beedle';
import { get, post, put } from 'axios';
import { BASE_URL } from '../../config/axios'


const formStore = new Store({
  actions: {
    setData(context, payloadData, isSaveData) {
      context.commit('setData', payloadData);
      if (isSaveData) this.save(context, payloadData);
    },
    async load(context, { id, loadUrl, data }) {
      if (id) {
        try {
          let req = await get(`${BASE_URL}/coord/formulary/${id}`)
          req.data.json_format = JSON.parse(req.data.json_format)
          this.setData(context, req.data)
        } catch (error) {
          this.setData(context, { notification: 'Ocorreu um erro no carregamento.' })
        }
      }
    },

    create(context, element) {
      const { data } = context.state;
      data.push(element);
      this.setData(context, { json_format: data });
    },

    delete(context, element) {
      const { data } = context.state;
      data.splice(data.indexOf(element), 1);
      this.setData(context, { json_format: data });
    },

    saveForm(context, elements) {
      let haveUpdate = !!elements.json_format
      this.setData(context, elements, haveUpdate);
    },

    async save(context, data) {
      let { curriculum, title, id } = context.state
      let { json_format } = data
      this.setData(context, { is_loading_save: true })

      let obj = {
        is_general_form: false,
        curriculum_id: curriculum.id,
        title,
        json_format
      }
      try {
        const request = await put(`${BASE_URL}/coord/formulary/${id}`, obj);
        this.setData(context, { notification: 'Salvo com sucesso.' })
      } catch (error) {
        this.setData(context, { notification: 'Ocorreu um erro no salvamento.' })
      } finally {
        this.setData(context, { is_loading_save: false })
      }
    },
  },

  mutations: {
    setData(state, payload) {
      const {
        json_format,
        curriculum,
        published_at,
        title,
        status,
        id,
        notification,
        is_loading_save
      } = payload

      if(json_format) state.data = json_format
      if(id) state.id = id
      if(curriculum) state.curriculum = curriculum
      if(title) state.title = title
      if(is_loading_save) {
        state.is_loading_save = is_loading_save
      } else { state.is_loading_save = false }
      if(status) {
        state.status = status
      } else { state.status = false }
      if(notification) {
        state.notification = notification
      } else { state.notification = '' }
      if(published_at) {
        state.published_at = published_at
      } else { state.published_at = '' }
      return state;
    },
  },

  initialState: {
    data: [],
    curriculum: null,
    title: '',
    status: false,
    id: null,
    published_at: '',
    notification: '',
    is_loading_save: false
  },
});

export default formStore;
