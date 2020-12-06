const traverson = require('traverson-promise')

const state = () => ({
  templateStats: []
})

const getters = {
  getTemplateStats: state => function () {
    return state.templateStats
  },
  getTemplateStat: state => function (id) {
    return state.templateStats.find(element => element.id === id)
  }
}

const mutations = {
  setTemplateStats (state, TemplateStats) {
    state.templateStats = TemplateStats
  },
  putTemplateStat (state, TemplateStat) {
    state.templateStats.push(TemplateStat)
  },
  changeTemplateStat (state, TemplateStat) {
    const id = state.templateStats.findIndex((element) => {
      return element.id === TemplateStat.id
    })
    state.templateStats[id] = TemplateStat
    state.templateStats = { ...state.templateStats }
  }
}

const actions = {
  async fetchAllTemplateStats (context) {
    await traverson.from('http://localhost:3000/api/v1/template-stats/')
      .json()
      .getResource().result
      .then((document) => {
        // eslint-disable-next-line no-console
        console.log(document)
        context.commit('setTemplateStats', document.list)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchTemplateStat (context, id) {
    // eslint-disable-next-line
    console.log(context.state)
    await traverson.from('http://localhost:3000/api/v1/template-stats/{idTemplate}')
      .withTemplateParameters({ idTemplate: id })
      .json()
      .getResource().result
      .then((document) => {
        context.commit('putTemplateStat', document)
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
        context.commit('putTemplateStat', document)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchTemplateStatForCategory (context, id) {
    await traverson.from('http://localhost:3000/api/v1/template-categories/{idcategory}/template-stats')
      .withTemplateParameters({ idcategory: id })
      .json()
      .getResource().result
      .then((document) => {
        // eslint-disable-next-line no-console
        console.log(document)
        context.commit('setTemplateStats', document.list)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  addTemplateStat (context, template) {
    return traverson.from('http://localhost:3000/api/v1/template-stats/')
      .json()
      .post(template).result
      .then((response) => {
        const result = JSON.parse(response.body)
        context.commit('putTemplateStat', result)
        return result
      })
      .catch((err) => {
        throw err
      })
  },
  async putTemplateStat (context, { template, id }) {
    return await traverson.from('http://localhost:3000/api/v1/template-stats/{idtemplate}')
      .withTemplateParameters({ idtemplate: id })
      .json()
      .put(template).result
      .then((response) => {
        const result = JSON.parse(response.body)
        context.commit('changeTemplateStat', result)
      })
      .catch((err) => {
        throw err
      })
  },
  async deleteTemplateStat (context, id) {
    return await traverson.from('http://localhost:3000/api/v1/template-stats/{idtemplate}')
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
