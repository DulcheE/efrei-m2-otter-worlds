const traverson = require('traverson-promise')

const state = () => ({
  inventories: []
})

const getters = {
  getInventories: state => function () {
    return state.inventories
  },
  getInventory: state => function (id) {
    return state.inventories.find(element => element.id === id)
  }
}

const mutations = {
  setInventories (state, Inventories) {
    state.inventories = Inventories
  },
  putInventory (state, Inventory) {
    state.inventories.push(Inventory)
  }
}

const actions = {
  async fetchAllInventories (context) {
    await traverson.from('http://localhost:3000/api/v1/inventories/')
      .json()
      .getResource().result
      .then((document) => {
        // eslint-disable-next-line no-console
        console.log(document)
        context.commit('setInventories', document.inventories)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchInventory (context, id) {
    // eslint-disable-next-line
    console.log(context.state)
    await traverson.from('http://localhost:3000/api/v1/inventories/{idTemplate}')
      .withTemplateParameters({ idTemplate: id })
      .json()
      .getResource().result
      .then((document) => {
        context.commit('putInventory', document)
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
        context.commit('putInventory', document)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchInventoryForCharacter (context, id) {
    await traverson.from('http://localhost:3000/api/v1/characters/{idcharacter}/inventories')
      .withTemplateParameters({ idcharacter: id })
      .json()
      .getResource().result
      .then((document) => {
        // eslint-disable-next-line no-console
        console.log(document)
        context.commit('setInventories', document.inventories)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  addInventory (context, template) {
    return traverson.from('http://localhost:3000/api/v1/inventories/')
      .json()
      .post(template).result
  },
  async putInventory (context, { template, id }) {
    return await traverson.from('http://localhost:3000/api/v1/inventories/{idtemplate}')
      .withTemplateParameters({ idtemplate: id })
      .json()
      .put(template).result
  },
  async deleteInventory (context, id) {
    return await traverson.from('http://localhost:3000/api/v1/inventories/{idtemplate}')
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
