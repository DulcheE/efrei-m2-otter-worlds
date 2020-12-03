const traverson = require('traverson-promise')

const state = () => ({
  subTopics: [],
  subTopic: {},
  article: {}
})

const getters = {
  getSubTopics: state => function () {
    return state.subTopics
  },
  getSubTopicByid: state => function (id) {
    return state.subTopics.find(element => element.id === id)
  },
  getSubTopic: state => function () {
    return state.subTopic
  },
  getSubTopicArticle: state => function () {
    return state.article
  }
}

const mutations = {
  setSubTopics (state, SubTopics) {
    state.subTopics = SubTopics
  },
  putSubTopic (state, SubTopic) {
    state.subTopics.push(SubTopic)
  },
  setArticle (state, Article) {
    state.article = Article
  },
  setSubTopic (state, SubTopic) {
    state.subTopic = SubTopic
  }
}

const actions = {
  async fetchAllSubTopics (context) {
    const document = await traverson.from('http://localhost:3000/api/v1/sub-topics/')
      .json()
      .getResource().result
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
    context.commit('setSubTopics', document.subTopics)
  },
  async fetchSubTopic (context, id) {
    // eslint-disable-next-line
    console.log(context.state)
    const document = await traverson.from('http://localhost:3000/api/v1/sub-topics/{idTemplate}')
      .withTemplateParameters({ idTemplate: id })
      .json()
      .getResource().result
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
    context.commit('putSubTopic', document)
  },
  async fetchByUrl (context, url) {
    await traverson.from(url)
      .json()
      .getResource().result
      .then((document) => {
        context.commit('putSubTopic', document)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchSubTopicWithArticle (context, id) {
    try {
      const subTopic = await traverson.from('http://localhost:3000/api/v1/sub-topics/{idSubTopic}/')
        .withTemplateParameters({ idSubTopic: id })
        .json()
        .getResource().result
      context.commit('setSubTopic', subTopic)
      if (subTopic._links.article !== undefined) {
        const article = await traverson.from(subTopic._links.article.href)
          .json()
          .getResource().result
        context.commit('setArticle', article)
      }
    } catch (err) {
      // eslint-disable-next-line
      console.log(err)
    }
  },
  async fetchSubTopicForTopic (context, id) {
    const document = await traverson.from('http://localhost:3000/api/v1/topics/{idtopic}/sub-topics')
      .withTemplateParameters({ idtopic: id })
      .json()
      .getResource().result
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
    context.commit('setSubTopics', document.subTopics)
  },
  addSubTopic (context, template) {
    return traverson.from('http://localhost:3000/api/v1/sub-topics/')
      .json()
      .post(template).result
  },
  async putSubTopic (context, { template, id }) {
    return await traverson.from('http://localhost:3000/api/v1/sub-topics/{idtemplate}')
      .withTemplateParameters({ idtemplate: id })
      .json()
      .put(template).result
  },
  async deleteSubTopic (context, id) {
    return await traverson.from('http://localhost:3000/api/v1/sub-topics/{idtemplate}')
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
