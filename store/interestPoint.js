const traverson = require('traverson-promise')

const state = () => ({
  interestPoints: []
})

const getters = {
  getInterestPoints: state => function () {
    return state.interestPoints
  },
  getInterestPoint: state => function (id) {
    return state.interestPoints.find(element => element.id === id)
  }
}

const mutations = {
  setInterestPoints (state, InterestPoints) {
    state.interestPoints = InterestPoints
  },
  putInterestPoint (state, InterestPoint) {
    state.interestPoints.push(InterestPoint)
  },
  changeInterestPoint (state, InterestPoint) {
    const id = state.interestPoints.findIndex((element) => {
      return element.id === InterestPoint.id
    })
    state.interestPoints[id] = InterestPoint
    state.interestPoints = { ...state.interestPoints }
  }
}

const actions = {
  async fetchAllInterestPoints (context) {
    await traverson.from('http://localhost:3000/api/v1/interest-points/')
      .json()
      .getResource().result
      .then((document) => {
        context.commit('setInterestPoints', document.list)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchInterestPoint (context, id) {
    await traverson.from('http://localhost:3000/api/v1/interest-points/{idTemplate}')
      .withTemplateParameters({ idTemplate: id })
      .json()
      .getResource().result
      .then((document) => {
        context.commit('putInterestPoint', document)
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
        context.commit('putInterestPoint', document)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchInterestPointForMap (context, id) {
    const document = await traverson.from('http://localhost:3000/api/v1/maps/{idmap}/interest-points')
      .withTemplateParameters({ idmap: id })
      .json()
      .getResource().result
      .catch((err) => { throw (err) })
    context.commit('setInterestPoints', document.list)
  },
  async addInterestPoint (context, template) {
    const response = await traverson.from('http://localhost:3000/api/v1/interest-points/')
      .json()
      .post(template).result
      .catch((err) => { throw err })
    const result = JSON.parse(response.body)
    context.commit('putInterestPoint', result)
    return result
  },
  async putInterestPoint (context, { interestPoint, id }) {
    const response = await traverson.from('http://localhost:3000/api/v1/interest-points/{idInterestPoint}')
      .withTemplateParameters({ idInterestPoint: id })
      .json()
      .put(interestPoint).result
      .catch((err) => { throw err })
    const result = JSON.parse(response.body)
    context.commit('changeInterestPoint', result)
    return result
  },
  async deleteInterestPoint (context, id) {
    return await traverson.from('http://localhost:3000/api/v1/interest-points/{idtemplate}')
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
