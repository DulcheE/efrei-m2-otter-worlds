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
  },
  async addUser (context, user) {
    return await traverson.from('http://localhost:3000/api/v1/users/')
      .json()
      .post(user).result
  },
  async putUser (context, { user, id }) {
    return await traverson.from('http://localhost:3000/api/v1/users/{userid}')
      .withTemplateParameters({ userid: id })
      .json()
      .put(user).result
  },
  async deleteUser (context, user) {
    // eslint-disable-next-line no-console
    console.log(user)
    return await traverson.from('http://localhost:3000/api/v1/users/')
      .json()
      .delete(user).result
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}