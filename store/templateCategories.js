const traverson = require('traverson-promise')

const state = () => ({
  templateCategories: []
})

const getters = {
  getTemplateCategories: state => function () {
    return state.templateCategories
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
  },
  changeTemplateCategory (state, TemplateCategory) {
    const id = state.templateCategories.findIndex((element) => {
      return element.id === TemplateCategory.id
    })
    state.templateCategories[id] = TemplateCategory
    state.TemplateCategories = { ...state.templateCategories }
  }
}

const actions = {
  async fetchAllTemplateCategories (context) {
    await traverson.from('http://localhost:3000/api/v1/template-categories/')
      .json()
      .getResource().result
      .then((document) => {
        context.commit('setTemplateCategories', document.list)
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
        context.commit('setTemplateCategories', document.list)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  addTemplateCategory (context, template) {
    traverson.from('http://localhost:3000/api/v1/template-categories/')
      .json()
      .post(template).result
      .then((response) => {
        const result = JSON.parse(response.body)
        context.commit('putTemplateCategory', result)
        return result
      })
      .catch((err) => {
        throw err
      })
  },
  putTemplateCategory (context, { template, id }) {
    // eslint-disable-next-line no-console
    console.log(template)
    traverson.from('http://localhost:3000/api/v1/template-categories/{idtemplate}')
      .withTemplateParameters({ idtemplate: id })
      .json()
      .put(template).result
      .then((response) => {
        const result = JSON.parse(response.body)
        context.commit('changeTemplateCategory', result)
      })
      .catch((err) => {
        throw err
      })
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
