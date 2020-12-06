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
  },
  changeInventory (state, Inventory) {
    const id = state.inventories.findIndex((element) => {
      return element.id === Inventory.id
    })
    state.inventories[id] = Inventory
  }
}

const actions = {
  async fetchAllInventories (context) {
    await traverson.from('http://localhost:3000/api/v1/inventories/')
      .json()
      .getResource().result
      .then((document) => {
        context.commit('setInventories', document.list)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchInventory (context, id) {
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
        context.commit('setInventories', document.list)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  addInventory (context, template) {
    traverson.from('http://localhost:3000/api/v1/inventories/')
      .json()
      .post(template).result
      .then((response) => {
        const result = JSON.parse(response.body)
        context.commit('putInventory', result)
        return result
      })
      .catch((err) => {
        throw err
      })
  },
  putInventory (context, { inventory, id }) {
    traverson.from('http://localhost:3000/api/v1/inventories/{idIventory}')
      .withTemplateParameters({ idIventory: id })
      .json()
      .put(inventory).result
      .then((response) => {
        const result = JSON.parse(response.body)
        context.commit('changeInventory', result)
      })
      .catch((err) => {
        throw err
      })
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
