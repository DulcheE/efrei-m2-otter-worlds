const traverson = require('traverson-promise')

const state = () => ({
  groups: []
})

const getters = {
  getGroups: state => function () {
    return state.groups
  },
  getGroup: state => function (id) {
    return state.groups.find(element => element.id === id)
  },
  changeInventory (state, group) {
    const id = state.groups.findIndex((element) => {
      return element.id === group.id
    })
    state.groups[id] = group
  }
}

const mutations = {
  setGroups (state, Groups) {
    state.groups = Groups
  },
  putGroup (state, Group) {
    state.groups.push(Group)
  },
  changeGroup (state, group) {
    const id = state.groups.findIndex((element) => {
      return element.id === group.id
    })
    state.groups[id] = group
  }
}

const actions = {
  async fetchAllGroups (context) {
    const document = await traverson.from('http://localhost:3000/api/v1/groups/')
      .json()
      .getResource().result
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
    context.commit('setGroups', document.list)
  },
  async fetchGroup (context, id) {
    const document = await traverson.from('http://localhost:3000/api/v1/groups/{idTemplate}')
      .withTemplateParameters({ idTemplate: id })
      .json()
      .getResource().result
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
    context.commit('putGroup', document)
  },
  async fetchByUrl (context, url) {
    await traverson.from(url)
      .json()
      .getResource().result
      .then((document) => {
        context.commit('putGroup', document)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchGroupForCharacter (context, id) {
    const document = await traverson.from('http://localhost:3000/api/v1/characters/{idcharacter}/groups')
      .withTemplateParameters({ idcharacter: id })
      .json()
      .getResource().result
      .catch((err) => { throw (err) })
    context.commit('setGroups', document.list)
  },
  async fetchGroupForUniverse (context, id) {
    const document = await traverson.from('http://localhost:3000/api/v1/universes/{iduniverse}/groups')
      .withTemplateParameters({ iduniverse: id })
      .json()
      .getResource().result
      .catch((err) => { throw (err) })
    context.commit('setGroups', document.list)
  },
  async addGroup (context, template) {
    const response = await traverson.from('http://localhost:3000/api/v1/groups/')
      .json()
      .post(template).result
      .catch((err) => { throw err })
    const result = JSON.parse(response.body)
    context.commit('putGroup', result)
    return result
  },
  async putGroup (context, { group, id }) {
    const response = await traverson.from('http://localhost:3000/api/v1/groups/{idgroup}')
      .withTemplateParameters({ idgroup: id })
      .json()
      .put(group).result
      .catch((err) => {
        throw err
      })
    const result = JSON.parse(response.body)
    context.commit('changeGroup', result)
    return result
  },
  async deleteGroup (context, id) {
    return await traverson.from('http://localhost:3000/api/v1/groups/{idtemplate}')
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
