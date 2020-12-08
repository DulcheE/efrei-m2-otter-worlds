const traverson = require('traverson-promise')

const state = () => ({
  characters: [],
  character: {},
  stats: []
})

const getters = {
  getCharacters: state => function () {
    return state.characters
  },
  getCharacterByid: state => function (id) {
    return state.characters.find(element => element.id === id)
  },
  getCharacter: state => function () {
    return state.character
  },
  getStat: state => function () {
    return state.stats
  }
}

const mutations = {
  setCharacters (state, Characters) {
    state.characters = Characters
  },
  putCharacter (state, Character) {
    state.characters.push(Character)
  },
  setCharacter (state, Character) {
    state.character = Character
  },
  setStat (state, stats) {
    state.stats = stats
  },
  changeCharacter (state, character) {
    const id = state.characters.findIndex((element) => {
      return element.id === character.id
    })
    // eslint-disable-next-line no-console
    console.log(state.characters[id])
    state.characters[id] = character
    // eslint-disable-next-line no-console
    console.log(state.characters[id])
    state.character = character
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
        context.commit('setCharacters', document.list)
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
    const document = await traverson.from('http://localhost:3000/api/v1/universes/{iduniver}/characters')
      .withTemplateParameters({ iduniver: id })
      .json()
      .getResource().result
      .catch((err) => { throw err })
    context.commit('setCharacters', document.list)
  },
  async fetchCharactersForUser (context, id) {
    const document = await traverson.from('http://localhost:3000/api/v1/users/{iduser}/characters')
      .withTemplateParameters({ iduser: id })
      .json()
      .getResource().result
      .catch((err) => { throw err })
    context.commit('setCharacters', document.list)
  },
  async fetchCharactersForGroup (context, id) {
    const document = await traverson.from('http://localhost:3000/api/v1/groups/{idgroup}/characters')
      .withTemplateParameters({ idgroup: id })
      .json()
      .getResource().result
      .catch((err) => { throw (err) })
    context.commit('setCharacters', document.list)
  },
  async fetchCharacterWithStat (context, id) {
    const values = await Promise.all([
      traverson.from('http://localhost:3000/api/v1/characters/{idCharacter}/')
        .withTemplateParameters({ idCharacter: id })
        .json()
        .getResource().result,
      traverson.from('http://localhost:3000/api/v1/characters/{idCharacter}/')
        .follow('$._links.stats.href')
        .withTemplateParameters({ idCharacter: id })
        .json()
        .getResource().result
    ])
      .catch((err) => { throw (err) })
    context.commit('setCharacter', values[0])
    context.commit('setStat', values[1])
  },
  async addCharacter (context, character) {
    const response = await traverson.from('http://localhost:3000/api/v1/characters/')
      .json()
      .post(character).result
      .catch((err) => {
        throw err
      })
    const result = JSON.parse(response.body)
    context.commit('putCharacter', result)
    return result
  },
  async putCharacter (context, { character, id }) {
    const response = await traverson.from('http://localhost:3000/api/v1/characters/{idcharacter}')
      .withTemplateParameters({ idcharacter: id })
      .json()
      .put(character).result
      .catch((err) => {
        throw err
      })
    const result = JSON.parse(response.body)
    context.commit('changeCharacter', result)
    return result
  },
  async putStatForCharacter (context, { stats, id }) {
    const response = await traverson.from('http://localhost:3000/api/v1/characters/{idcharacter}/stats')
      .withTemplateParameters({ idcharacter: id })
      .json()
      .put(stats).result
      .catch((err) => {
        throw err
      })
    const result = JSON.parse(response.body)
    context.commit('setStat', result)
    return result
  },
  async putCharacterInGroup (context, { idgroup, idCharacter }) {
    return await traverson.from('http://localhost:3000/api/v1/characters/{idcharacter}/groups')
      .withTemplateParameters({ idcharacter: idCharacter })
      .json()
      .post({ idGroup: idgroup }).result
  },
  deleteCharacter (context, id) {
    return traverson.from('http://localhost:3000/api/v1/characters/{idcharacter}')
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
