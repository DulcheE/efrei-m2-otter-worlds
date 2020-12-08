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
    const document = await traverson.from('http://localhost:3000/api/v1/template-categories/{idcategory}/template-stats')
      .withTemplateParameters({ idcategory: id })
      .json()
      .getResource().result
      .catch((err) => { throw (err) })
    context.commit('setTemplateStats', document.list)
  },
  async addTemplateStat (context, template) {
    const response = await traverson.from('http://localhost:3000/api/v1/template-stats/')
      .json()
      .post(template).result
      .catch((err) => { throw err })
    const result = JSON.parse(response.body)
    context.commit('putTemplateStat', result)
    return result
  },
  async putTemplateStat (context, { template, id }) {
    const response = await traverson.from('http://localhost:3000/api/v1/template-stats/{idtemplate}')
      .withTemplateParameters({ idtemplate: id })
      .json()
      .put(template).result
      .catch((err) => { throw err })
    const result = JSON.parse(response.body)
    context.commit('changeTemplateStat', result)
    return result
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
