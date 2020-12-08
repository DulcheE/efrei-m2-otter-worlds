const traverson = require('traverson-promise')

const state = () => ({
  articles: [],
  keywords: []
})

const getters = {
  getArticles: state => function () {
    return state.articles
  },
  getArticle: state => function (id) {
    return state.articles.find(element => element.id === id)
  },
  getKeywords: state => function () {
    return state.keywords
  }
}

const mutations = {
  setArticles (state, Articles) {
    state.articles = Articles
  },
  putArticle (state, Article) {
    state.articles.push(Article)
  },
  changeArticle (state, article) {
    const id = state.articles.findIndex((element) => {
      return element.id === article.id
    })
    state.articles[id] = article
    state.articles = { ...state.articles }
  },
  setKeywords (state, keywords) {
    state.keywords = keywords
  }
}

const actions = {
  async fetchAllArticles (context) {
    await traverson.from('http://localhost:3000/api/v1/articles/')
      .json()
      .getResource().result
      .then((document) => {
        // eslint-disable-next-line no-console
        console.log(document)
        context.commit('setArticles', document.list)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchArticle (context, id) {
    // eslint-disable-next-line
    console.log(context.state)
    await traverson.from('http://localhost:3000/api/v1/articles/{idArticle}/')
      .withTemplateParameters({ idArticle: id })
      .json()
      .getResource().result
      .then((document) => {
        context.commit('putArticle', document)
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
        context.commit('putArticle', document)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchArticlesForUniverse (context, id) {
    const document = await traverson.from('http://localhost:3000/api/v1/universes/{iduniver}/articles')
      .withTemplateParameters({ iduniver: id })
      .json()
      .getResource().result
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
    context.commit('setArticles', document.list)
  },
  async fetchArticlesForSubTopic (context, id) {
    const document = await traverson.from('http://localhost:3000/api/v1/sub-topics/{idTopic}/articles')
      .withTemplateParameters({ idTopic: id })
      .json()
      .getResource().result
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
    context.commit('setArticles', document.list)
  },
  async fetchArticleWithKeywords (context, id) {
    const values = await Promise.all([
      traverson.from('http://localhost:3000/api/v1/articles/{idArticle}/')
        .withTemplateParameters({ idArticle: id })
        .json()
        .getResource().result,
      traverson.from('http://localhost:3000/api/v1/articles/{idArticle}/')
        .follow('$._links.keywords.href')
        .withTemplateParameters({ idArticle: id })
        .json()
        .getResource().result
    ])
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
    context.commit('setArticle', values[0])
    context.commit('setKeywords', values[1])
  },
  async addArticle (context, article) {
    const response = await traverson.from('http://localhost:3000/api/v1/articles/')
      .json()
      .post(article).result
      .catch((err) => { throw err })
    const result = JSON.parse(response.body)
    context.commit('putArticle', result)
    return result
  },
  async putArticle (context, { article, id }) {
    const response = await traverson.from('http://localhost:3000/api/v1/articles/{idarticle}')
      .withTemplateParameters({ idarticle: id })
      .json()
      .put(article).result
      .catch((err) => { throw err })
    const result = JSON.parse(response.body)
    context.commit('changeArticle', result)
    return result
  },
  deleteArticle (context, id) {
    return traverson.from('http://localhost:3000/api/v1/articles/{idarticle}')
      .withTemplateParameters({ idarticle: id })
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
