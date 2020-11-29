const traverson = require('traverson-promise')

const state = () => ({
  users: []
})

const getters = {
  getUsers: state => function () {
    return state.users
  }
}

const mutations = {
  setUsers (state, users) {
    state.users = users
  }
}

const actions = {
  async fetchAllUsers (context) {
    await traverson.from('http://localhost:3000/api/v1/users/')
      .json()
      .getResource().result
      .then((document) => {
        context.commit('setUsers', document.users)
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
