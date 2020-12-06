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
  getTopicArticle: state => function () {
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
  },
  changeTopic (state, topic) {
    const id = state.topics.findIndex((element) => {
      return element.id === topic.id
    })
    state.topics[id] = topic
    state.topics = { ...state.topics }
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
    context.commit('setTopics', document.list)
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
    try {
      const topic = await traverson.from('http://localhost:3000/api/v1/topics/{idTopic}/')
        .withTemplateParameters({ idTopic: id })
        .json()
        .getResource().result
      context.commit('setTopic', topic)
      if (topic._links.article !== undefined) {
        const article = await traverson.from(topic._links.article.href)
          .json()
          .getResource().result
        context.commit('setArticle', article)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
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
    context.commit('setTopics', document.list)
  },
  addTopic (context, template) {
    traverson.from('http://localhost:3000/api/v1/topics/')
      .json()
      .post(template).result
      .then((response) => {
        const result = JSON.parse(response.body)
        context.commit('putTopic', result)
        return result
      })
      .catch((err) => {
        throw err
      })
  },
  putTopic (context, { topic, id }) {
    traverson.from('http://localhost:3000/api/v1/topics/{idtopic}')
      .withTemplateParameters({ idtopic: id })
      .json()
      .put(topic).result
      .then((response) => {
        const result = JSON.parse(response.body)
        context.commit('changeTopic', result)
      })
      .catch((err) => {
        throw err
      })
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
