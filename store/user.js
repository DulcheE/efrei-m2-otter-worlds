const traverson = require('traverson-promise')

const state = () => ({
  users: []
})

const getters = {
  getUsers: state => function () {
    return state.users
  },
  getUser: state => function (id) {
    return state.users.find(element => element.id === id)
  }
}

const mutations = {
  setUsers (state, users) {
    state.users = users
  },
  putUser (state, user) {
    state.users.push(user)
  },
  changeUser (state, user) {
    const id = state.users.findIndex((element) => {
      return element.id === user.id
    })
    state.users[id] = user
    state.users = { ...state.users }
  }
}

const actions = {
  async fetchAllUsers (context) {
    const document = await traverson.from('http://localhost:3000/api/v1/users/')
      .json()
      .getResource().result
      .catch((err) => { throw (err) })
    context.commit('setUsers', document.list)
  },
  async fetchUser (context, id) {
    const document = await traverson.from('http://localhost:3000/api/v1/users/{idUser}')
      .withTemplateParameters({ idUser: id })
      .json()
      .getResource().result
      .catch((err) => { throw (err) })
    context.commit('putUser', document)
  },
  async addUser (context, user) {
    const response = await traverson.from('http://localhost:3000/api/v1/users/')
      .json()
      .post(user).result
    context.commit('putUser', response)
  },
  async putUser (context, { user, id }) {
    const response = await traverson.from('http://localhost:3000/api/v1/users/{userid}')
      .withTemplateParameters({ userid: id })
      .json()
      .put(user).result
    context.commit('changeUser', response)
  },
  async deleteUser (context, user) {
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
