import Store from 'beedle';
import { get, post, put } from 'axios';

let _saveUrl;

const formStore = new Store({
  actions: {
    setData(context, payloadData, isSaveData) {
      context.commit('setData', payloadData);
      if (isSaveData) this.save(context, payloadData);
    },
    async load(context, { id, loadUrl, data }) {
      if (id) {
        try {
          let req = await get(`http://localhost:3333/v1/coord/formulary/${id}`)
          req.data.json_format = JSON.parse(req.data.json_format)
          this.setData(context, req.data)
        } catch (error) {
          // console.log(error)
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
      this.setData(context, elements, true);
    },

    async save(context, data) {
      let { curriculum, title, id } = context.state
      let { json_format } = data

      let obj = {
        is_general_form: false,
        curriculum_id: curriculum.id, 
        title, 
        json_format 
      }
      try {
        const request = await put(`http://localhost:3333/v1/coord/formulary/${id}`, obj);
      } catch (error) {
        console.log({error})
      }
    },
  },

  mutations: {
    setData(state, payload) {
      const {json_format, curriculum, published_at, title, status, id } = payload
      // eslint-disable-next-line no-param-reassign
      if(json_format) state.data = json_format 
      if(id) state.id = id
      if(curriculum) state.curriculum = curriculum
      if(title) state.title = title
      if(status) {
        state.status = status
      } else { state.status = false }
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
    published_at: ''
  },
});

// formStore.setExternalHandler = (onLoad, onPost) => {
//   _onLoad = onLoad;
//   _onPost = onPost;
// };

export default formStore;
