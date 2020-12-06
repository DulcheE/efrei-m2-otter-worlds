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
    await traverson.from('http://localhost:3000/api/v1/universes/')
      .json()
      .getResource().result
      .then((document) => {
        context.commit('setUniverses', document.list)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchUniverse (context, id) {
    // eslint-disable-next-line
    console.log(context.state)
    await traverson.from('http://localhost:3000/api/v1/universes/{idUniverse}')
      .withTemplateParameters({ idUniverse: id })
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
  addUniverse (context, universe) {
    return traverson.from('http://localhost:3000/api/v1/universes/')
      .json()
      .post(universe).result
      .then((response) => {
        const result = JSON.parse(response.body)
        context.commit('putUniverse', result)
        return result
      })
      .catch((err) => {
        throw err
      })
  },
  async putUniverse (context, { universe, id }) {
    return await traverson.from('http://localhost:3000/api/v1/universes/{iduniverse}')
      .withTemplateParameters({ iduniverse: id })
      .json()
      .put(universe).result
      .then((response) => {
        const result = JSON.parse(response.body)
        context.commit('changeUniverse', result)
      })
      .catch((err) => {
        throw err
      })
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
