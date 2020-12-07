const traverson = require('traverson-promise')

const state = () => ({
  articles: []
})

const getters = {
  getArticles: state => function () {
    return state.articles
  },
  getArticle: state => function (id) {
    return state.articles.find(element => element.id === id)
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
    await traverson.from('http://localhost:3000/api/v1/universes/{iduniver}/articles')
      .withTemplateParameters({ iduniver: id })
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
  async fetchArticlesForSubTopic (context, id) {
    await traverson.from('http://localhost:3000/api/v1/sub-topics/{idTopic}/articles')
      .withTemplateParameters({ idTopic: id })
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
  async fetchArticlesForGroup (context, id) {
    const document = await traverson.from('http://localhost:3000/api/v1/groups/{idgroup}/articles')
      .withTemplateParameters({ idgroup: id })
      .json()
      .getResource().result
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
    context.commit('setArticles', document.list)
  },
  async fetchArticleWithStat (context, id) {
    const values = await Promise.all([
      traverson.from('http://localhost:3000/api/v1/articles/{idArticle}/')
        .withTemplateParameters({ idArticle: id })
        .json()
        .getResource().result,
      traverson.from('http://localhost:3000/api/v1/articles/{idArticle}/')
        .follow('$._links.stats.href')
        .withTemplateParameters({ idArticle: id })
        .json()
        .getResource().result
    ])
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
    context.commit('setArticle', values[0])
    context.commit('setStat', values[1])
  },
  addArticle (context, article) {
    traverson.from('http://localhost:3000/api/v1/articles/')
      .json()
      .post(article).result
      .then((response) => {
        const result = JSON.parse(response.body)
        context.commit('putArticle', result)
        return result
      })
      .catch((err) => {
        throw err
      })
  },
  putArticle (context, { article, id }) {
    traverson.from('http://localhost:3000/api/v1/articles/{idarticle}')
      .withTemplateParameters({ idarticle: id })
      .json()
      .put(article).result
      .then((response) => {
        const result = JSON.parse(response.body)
        context.commit('changeArticle', result)
      })
      .catch((err) => {
        throw err
      })
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
