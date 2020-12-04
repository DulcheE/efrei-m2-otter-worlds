const traverson = require('traverson-promise')

const state = () => ({
  logged: false,
  iduser: -1,
  username: '',
  universePlay: [],
  universeOwn: []
})

const getters = {
  getLogged: state => function () {
    return state
  },
  getUniverseOwn: state => function () {
    return state.universeOwn
  }
}

const mutations = {
  setLogin (state, login) {
    state.logged = login.logged
    state.iduser = login.iduser
    state.username = login.username
  },
  setUniversePlay (state, universes) {
    state.universePlay = universes
  },
  setUniverses (state, universes) {
    state.universeOwn = universes
  }
}

const actions = {
  async login (context, credentials) {
    await traverson.from('http://localhost:3000/api/v1/auth/login')
      .json()
      .post(credentials).result
      .then((document) => {
        const result = JSON.parse(document.text)
        context.commit('setLogin', { logged: true, iduser: result.idUser, username: result.username })
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchUniverseOwn (context) {
    // eslint-disable-next-line
    console.log(context.state)
    await traverson.from('http://localhost:3000/api/v1/users/{userid}')
      .withTemplateParameters({ userid: context.state.iduser })
      .follow('$._links.universes.href')
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
  async fetchUniversePlay (context) {
    await traverson.from('http://localhost:3000/api/v1/users/{userid}')
      .withTemplateParameters({ userid: context.state.iduser })
      .follow('$._links.universesPlays.href')
      .json()
      .getResource().result
      .then((document) => {
        context.commit('setUniversePlay', document.universes)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
