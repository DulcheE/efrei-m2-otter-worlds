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
  }
}

const mutations = {
  setGroups (state, Groups) {
    state.groups = Groups
  },
  putGroup (state, Group) {
    state.groups.push(Group)
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
    context.commit('setGroups', document.groups)
  },
  async fetchGroup (context, id) {
    // eslint-disable-next-line
    console.log(context.state)
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
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
    context.commit('setGroups', document.groups)
  },
  async fetchGroupForUniverse (context, id) {
    const document = await traverson.from('http://localhost:3000/api/v1/universes/{iduniverse}/groups')
      .withTemplateParameters({ iduniverse: id })
      .json()
      .getResource().result
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
    context.commit('setGroups', document.groups)
  },
  addGroup (context, template) {
    return traverson.from('http://localhost:3000/api/v1/groups/')
      .json()
      .post(template).result
  },
  async putGroup (context, { template, id }) {
    return await traverson.from('http://localhost:3000/api/v1/groups/{idtemplate}')
      .withTemplateParameters({ idtemplate: id })
      .json()
      .put(template).result
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
