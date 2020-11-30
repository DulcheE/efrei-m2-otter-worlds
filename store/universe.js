const traverson = require('traverson-promise')

const state = () => ({
  universes: []
})

const getters = {
  getUniverses: state => function () {
    return state
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
  }
}

const actions = {
  async fetchAllUniverses (context) {
    await traverson.from('http://localhost:3000/api/v1/universes/')
      .json()
      .getResource().result
      .then((document) => {
        context.commit('setUniverses', document.universes)
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
  },
  async putUniverse (context, { universe, id }) {
    return await traverson.from('http://localhost:3000/api/v1/universes/{iduniverse}')
      .withTemplateParameters({ iduniverse: id })
      .json()
      .put(universe).result
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
