const traverson = require('traverson-promise')

const state = () => ({
  topics: [],
  topic: {},
  article: {}
})

const getters = {
  getTopics: state => function () {
    return state.topics
  },
  getTopicByid: state => function (id) {
    return state.topics.find(element => element.id === id)
  },
  getTopic: state => function () {
    return state.topic
  },
  getArticle: state => function () {
    return state.article
  }
}

const mutations = {
  setTopics (state, Topics) {
    state.topics = Topics
  },
  putTopic (state, Topic) {
    state.topics.push(Topic)
  },
  setArticle (state, Article) {
    state.article = Article
  },
  setTopic (state, Topic) {
    state.topic = Topic
  }
}

const actions = {
  async fetchAllTopics (context) {
    const document = await traverson.from('http://localhost:3000/api/v1/topics/')
      .json()
      .getResource().result
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
    context.commit('setTopics', document.topics)
  },
  async fetchTopic (context, id) {
    // eslint-disable-next-line
    console.log(context.state)
    const document = await traverson.from('http://localhost:3000/api/v1/topics/{idTemplate}')
      .withTemplateParameters({ idTemplate: id })
      .json()
      .getResource().result
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
    context.commit('putTopic', document)
  },
  async fetchByUrl (context, url) {
    await traverson.from(url)
      .json()
      .getResource().result
      .then((document) => {
        context.commit('putTopic', document)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchTopicWithArticle (context, id) {
    const values = await Promise.all([
      traverson.from('http://localhost:3000/api/v1/topics/{idTopic}/')
        .withTemplateParameters({ idTopic: id })
        .json()
        .getResource().result,
      traverson.from('http://localhost:3000/api/v1/topics/{idTopic}/')
        .follow('$._links.article.href')
        .withTemplateParameters({ idTopic: id })
        .json()
        .getResource().result
    ])
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
    context.commit('setTopic', values[0])
    context.commit('setArticle', values[1])
  },
  async fetchTopicForUniverse (context, id) {
    const document = await traverson.from('http://localhost:3000/api/v1/universes/{iduniverse}/topics')
      .withTemplateParameters({ iduniverse: id })
      .json()
      .getResource().result
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
    context.commit('setTopics', document.topics)
  },
  addTopic (context, template) {
    return traverson.from('http://localhost:3000/api/v1/topics/')
      .json()
      .post(template).result
  },
  async putTopic (context, { template, id }) {
    return await traverson.from('http://localhost:3000/api/v1/topics/{idtemplate}')
      .withTemplateParameters({ idtemplate: id })
      .json()
      .put(template).result
  },
  async deleteTopic (context, id) {
    return await traverson.from('http://localhost:3000/api/v1/topics/{idtemplate}')
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
