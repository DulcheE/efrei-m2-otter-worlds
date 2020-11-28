const traverson = require('traverson-promise')

const state = () => ({
  logged: false,
  iduser: -1,
  username: ''
})

const getters = {
  getLogged: state => function () {
    return state
  }
}

const mutations = {
  setLogin (state, login) {
    state.logged = login.logged
    state.iduser = login.iduser
    state.username = login.username
  }
}

const actions = {
  async login (context, credentials) {
    // eslint-disable-next-line
    console.log(credentials)
    await traverson.from('http://localhost:3000/api/v1/users/login')
      .json()
      .post(credentials).result
      .then((document) => {
        if (document.text === 'true') {
          context.commit('setLogin', { logged: true, iduser: 1, username: credentials.username })
        }
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
