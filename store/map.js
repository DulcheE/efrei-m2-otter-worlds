const traverson = require('traverson-promise')

const state = () => ({
  maps: [],
  map: {},
  interestPoints: []
})

const getters = {
  getMaps: state => function () {
    return state.maps
  },
  getMapByid: state => function (id) {
    return state.maps.find(element => element.id === id)
  },
  getMap: state => function () {
    return state.map
  },
  getInterestPoints: state => function () {
    return state.interestPoints
  }
}

const mutations = {
  setMaps (state, Maps) {
    state.maps = Maps
  },
  putMap (state, Map) {
    state.maps.push(Map)
  },
  setMap (state, Map) {
    state.map = Map
  },
  setInterestPoints (state, interestPoints) {
    state.interestPoints = interestPoints
  },
  changeMap (state, map) {
    const id = state.maps.findIndex((element) => {
      return element.id === map.id
    })
    state.maps[id] = map
    state.map = map
    state.maps = { ...state.maps }
  }
}

const actions = {
  async fetchAllMaps (context) {
    await traverson.from('http://localhost:3000/api/v1/maps/')
      .json()
      .getResource().result
      .then((document) => {
        // eslint-disable-next-line no-console
        console.log(document)
        context.commit('setMaps', document.list)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchMap (context, id) {
    // eslint-disable-next-line
    console.log(context.state)
    await traverson.from('http://localhost:3000/api/v1/maps/{idTemplate}/')
      .withTemplateParameters({ idTemplate: id })
      .json()
      .getResource().result
      .then((document) => {
        context.commit('putMap', document)
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
        context.commit('putMap', document)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchMapsForUniverse (context, id) {
    const document = await traverson.from('http://localhost:3000/api/v1/universes/{iduniver}/maps')
      .withTemplateParameters({ iduniver: id })
      .json()
      .getResource().result
      .catch((err) => { throw (err) })
    context.commit('setMaps', document.list)
  },
  async fetchMapWithInterestPoint (context, id) {
    const values = await Promise.all([
      traverson.from('http://localhost:3000/api/v1/maps/{idMap}/')
        .withTemplateParameters({ idMap: id })
        .json()
        .getResource().result,
      traverson.from('http://localhost:3000/api/v1/maps/{idMap}/')
        .follow('$._links.interest-points.href')
        .withTemplateParameters({ idMap: id })
        .json()
        .getResource().result
    ])
      .catch((err) => { throw (err) })
    context.commit('setMap', values[0])
    context.commit('setInterestPoints', values[1].list)
  },
  async addMap (context, map) {
    const response = await traverson.from('http://localhost:3000/api/v1/maps/')
      .json()
      .post(map).result
      .catch((err) => { throw err })
    const result = JSON.parse(response.body)
    context.commit('putMap', result)
    return result
  },
  async putMap (context, { map, id }) {
    const response = await traverson.from('http://localhost:3000/api/v1/maps/{idmap}')
      .withTemplateParameters({ idmap: id })
      .json()
      .put(map).result
      .catch((err) => { throw err })
    const result = JSON.parse(response.body)
    context.commit('changeMap', result)
  },
  deleteMap (context, id) {
    return traverson.from('http://localhost:3000/api/v1/maps/{idmap}')
      .withTemplateParameters({ idmap: id })
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
