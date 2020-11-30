const traverson = require('traverson-promise')

const state = () => ({
  characters: [],
  character: {},
  stats: []
})

const getters = {
  getCharacters: state => function () {
    return state
  },
  getCharacterByid: state => function (id) {
    return state.characters.find(element => element.id === id)
  },
  getCharacter: state => function () {
    return state.character
  }
}

const mutations = {
  setCharacters (state, Characters) {
    state.characters = Characters
  },
  putCharacter (state, Character) {
    state.character = Character
  }
}

const actions = {
  async fetchAllCharacters (context) {
    await traverson.from('http://localhost:3000/api/v1/characters/')
      .json()
      .getResource().result
      .then((document) => {
        // eslint-disable-next-line no-console
        console.log(document)
        context.commit('setCharacters', document.characters)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchCharacter (context, id) {
    // eslint-disable-next-line
    console.log(context.state)
    await traverson.from('http://localhost:3000/api/v1/characters/{idTemplate}/')
      .withTemplateParameters({ idTemplate: id })
      .json()
      .getResource().result
      .then((document) => {
        context.commit('putCharacter', document)
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
        context.commit('putCharacter', document)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchCharactersForUniverse (context, id) {
    await traverson.from('http://localhost:3000/api/v1/universes/{iduniver}/characters')
      .withTemplateParameters({ iduniver: id })
      .json()
      .getResource().result
      .then((document) => {
        // eslint-disable-next-line no-console
        console.log(document)
        context.commit('setCharacters', document.characters)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchCharactersForUser (context, id) {
    await traverson.from('http://localhost:3000/api/v1/users/{iduser}/characters')
      .withTemplateParameters({ iduser: id })
      .json()
      .getResource().result
      .then((document) => {
        // eslint-disable-next-line no-console
        console.log(document)
        context.commit('setCharacters', document.characters)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  addCharacter (context, character) {
    return traverson.from('http://localhost:3000/api/v1/characters/')
      .json()
      .post(character).result
  },
  async putCharacter (context, { character, id }) {
    return await traverson.from('http://localhost:3000/api/v1/characters/{idcharacter}')
      .withTemplateParameters({ idcharacter: id })
      .json()
      .put(character).result
  },
  async deleteCharacter (context, id) {
    return await traverson.from('http://localhost:3000/api/v1/characters/{idcharacter}')
      .withTemplateParameters({ idcharacter: id })
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
