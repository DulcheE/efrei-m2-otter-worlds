const traverson = require('traverson-promise')

const state = () => ({
  universes: []
})

const getters = {
  getUniverses: state => function () {
    return state.universes
  },
  getUniverse: state => function (id) {
    return state.universes.find(element => element.id === id)
  }
}

const mutations = {
  setUniverses (state, universes) {
    state.universes = universes
  },
  putUniverse (state, universe) {
    state.universes.push(universe)
  },
  changeUniverse (state, universe) {
    const id = state.universes.findIndex((element) => {
      return element.id === universe.id
    })
    state.universes[id] = universe
    state.universes = { ...state.universes }
  }

}

const actions = {
  async fetchAllUniverses (context) {
    const document = await traverson.from('http://localhost:3000/api/v1/universes/')
      .json()
      .getResource().result
      .catch((err) => { throw (err) })
    context.commit('setUniverses', document.list)
  },
  async fetchUniverse (context, id) {
    const document = await traverson.from('http://localhost:3000/api/v1/universes/{idUniverse}')
      .withTemplateParameters({ idUniverse: id })
      .json()
      .getResource().result
      .catch((err) => { throw (err) })
    context.commit('putUniverse', document)
  },
  async fetchByUrl (context, url) {
    await traverson.from(url)
      .json()
      .getResource().result
      .then((document) => {
        context.commit('putUniverse', document)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async addUniverse (context, universe) {
    const response = await traverson.from('http://localhost:3000/api/v1/universes/')
      .json()
      .post(universe).result
      .catch((err) => { throw err })
    const result = JSON.parse(response.body)
    context.commit('putUniverse', result)
    return result
  },
  async putUniverse (context, { universe, id }) {
    const response = await traverson.from('http://localhost:3000/api/v1/universes/{iduniverse}')
      .withTemplateParameters({ iduniverse: id })
      .json()
      .put(universe).result
      .catch((err) => {
        throw err
      })
    const result = JSON.parse(response.body)
    context.commit('changeUniverse', result)
    return result
  },
  async deleteUniverse (context, id) {
    return await traverson.from('http://localhost:3000/api/v1/universes/{iduniverse}')
      .withTemplateParameters({ iduniverse: id })
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
