const traverson = require('traverson-promise')

const state = () => ({
  templateCategories: []
})

const getters = {
  getTemplateCategories: state => function () {
    return state.TemplateCategories
  },
  getTemplateCategory: state => function (id) {
    return state.templateCategories.find(element => element.id === id)
  }
}

const mutations = {
  setTemplateCategories (state, TemplateCategories) {
    state.templateCategories = TemplateCategories
  },
  putTemplateCategory (state, TemplateCategory) {
    state.templateCategories.push(TemplateCategory)
  }
}

const actions = {
  async fetchAllTemplateCategories (context) {
    await traverson.from('http://localhost:3000/api/v1/template-categories/')
      .json()
      .getResource().result
      .then((document) => {
        // eslint-disable-next-line no-console
        console.log(document)
        context.commit('setTemplateCategories', document.templateCategories)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchTemplateCategory (context, id) {
    // eslint-disable-next-line
    console.log(context.state)
    await traverson.from('http://localhost:3000/api/v1/template-categories/{idTemplate}')
      .withTemplateParameters({ idTemplate: id })
      .json()
      .getResource().result
      .then((document) => {
        context.commit('putTemplateCategory', document)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchByUrl (context, url) {
    await traverson.from(url)
      .json()
      .getResource().result
      .then((document) => {
        context.commit('putTemplateCategory', document)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchTemplateCategoryForUniverse (context, id) {
    await traverson.from('http://localhost:3000/api/v1/universes/{iduniver}/template-categories')
      .withTemplateParameters({ iduniver: id })
      .json()
      .getResource().result
      .then((document) => {
        // eslint-disable-next-line no-console
        console.log(document)
        context.commit('setTemplateCategories', document.templateCategories)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  addTemplateCategory (context, template) {
    return traverson.from('http://localhost:3000/api/v1/template-categories/')
      .json()
      .post(template).result
  },
  async putTemplateCategory (context, { template, id }) {
    return await traverson.from('http://localhost:3000/api/v1/template-categories/{idtemplate}')
      .withTemplateParameters({ idtemplate: id })
      .json()
      .put(template).result
  },
  async deleteTemplateCategory (context, id) {
    return await traverson.from('http://localhost:3000/api/v1/template-categories/{idtemplate}')
      .withTemplateParameters({ idtemplate: id })
      .json()
      .delete().result
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
