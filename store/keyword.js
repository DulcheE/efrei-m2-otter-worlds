const traverson = require('traverson-promise')

const state = () => ({
  keywords: []
})

const getters = {
  getKeywords: state => function () {
    return state.keywords
  },
  getKeyword: state => function (id) {
    return state.keywords.find(element => element.id === id)
  }
}

const mutations = {
  setKeywords (state, Keywords) {
    state.keywords = Keywords
  },
  putKeyword (state, Keyword) {
    state.keywords.push(Keyword)
  },
  changeKeyword (state, keyword) {
    const id = state.keywords.findIndex((element) => {
      return element.id === keyword.id
    })
    state.keywords[id] = keyword
    state.keywords = { ...state.keywords }
  }
}

const actions = {
  async fetchAllKeywords (context) {
    await traverson.from('http://localhost:3000/api/v1/keywords/')
      .json()
      .getResource().result
      .then((document) => {
        // eslint-disable-next-line no-console
        console.log(document)
        context.commit('setKeywords', document.list)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchKeyword (context, id) {
    // eslint-disable-next-line
    console.log(context.state)
    await traverson.from('http://localhost:3000/api/v1/keywords/{idKeyword}/')
      .withTemplateParameters({ idKeyword: id })
      .json()
      .getResource().result
      .then((document) => {
        context.commit('putKeyword', document)
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
        context.commit('putKeyword', document)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchKeywordsForUniverse (context, id) {
    await traverson.from('http://localhost:3000/api/v1/universes/{iduniver}/keywords')
      .withTemplateParameters({ iduniver: id })
      .json()
      .getResource().result
      .then((document) => {
        // eslint-disable-next-line no-console
        console.log(document)
        context.commit('setKeywords', document.list)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchKeywordsForArticle (context, id) {
    await traverson.from('http://localhost:3000/api/v1/articles/{idArticle}/keywords')
      .withTemplateParameters({ idArticle: id })
      .json()
      .getResource().result
      .then((document) => {
        // eslint-disable-next-line no-console
        console.log(document)
        context.commit('setKeywords', document.list)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  addKeyword (context, keyword) {
    traverson.from('http://localhost:3000/api/v1/keywords/')
      .json()
      .post(keyword).result
      .then((response) => {
        const result = JSON.parse(response.body)
        context.commit('putKeyword', result)
        return result
      })
      .catch((err) => {
        throw err
      })
  },
  putKeyword (context, { keyword, id }) {
    traverson.from('http://localhost:3000/api/v1/keywords/{idkeyword}')
      .withTemplateParameters({ idkeyword: id })
      .json()
      .put(keyword).result
      .then((response) => {
        const result = JSON.parse(response.body)
        context.commit('changeKeyword', result)
      })
      .catch((err) => {
        throw err
      })
  },
  deleteKeyword (context, id) {
    return traverson.from('http://localhost:3000/api/v1/keywords/{idkeyword}')
      .withTemplateParameters({ idkeyword: id })
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
