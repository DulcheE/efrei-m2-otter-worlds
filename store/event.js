const traverson = require('traverson-promise')

const state = () => ({
  events: []
})

const getters = {
  getEvents: state => function () {
    return state.events
  },
  getEvent: state => function (id) {
    return state.events.find(element => element.id === id)
  }
}

const mutations = {
  setEvents (state, Events) {
    state.events = Events
  },
  putEvent (state, Event) {
    state.events.push(Event)
  },
  changeEvent (state, Event) {
    const id = state.events.findIndex((element) => {
      return element.id === Event.id
    })
    state.events[id] = Event
    state.events = { ...state.events }
  }
}

const actions = {
  async fetchAllEvents (context) {
    await traverson.from('http://localhost:3000/api/v1/events/')
      .json()
      .getResource().result
      .then((document) => {
        context.commit('setEvents', document.list)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchEvent (context, id) {
    await traverson.from('http://localhost:3000/api/v1/events/{idTemplate}')
      .withTemplateParameters({ idTemplate: id })
      .json()
      .getResource().result
      .then((document) => {
        context.commit('putEvent', document)
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
        context.commit('putEvent', document)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchEventForTimeline (context, id) {
    await traverson.from('http://localhost:3000/api/v1/timelines/{idtimeline}/events')
      .withTemplateParameters({ idtimeline: id })
      .json()
      .getResource().result
      .then((document) => {
        context.commit('setEvents', document.list)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  addEvent (context, template) {
    traverson.from('http://localhost:3000/api/v1/events/')
      .json()
      .post(template).result
      .then((response) => {
        const result = JSON.parse(response.body)
        context.commit('putEvent', result)
        return result
      })
      .catch((err) => {
        throw err
      })
  },
  putEvent (context, { event, id }) {
    traverson.from('http://localhost:3000/api/v1/events/{idEvent}')
      .withTemplateParameters({ idEvent: id })
      .json()
      .put(event).result
      .then((response) => {
        const result = JSON.parse(response.body)
        context.commit('changeEvent', result)
      })
      .catch((err) => {
        throw err
      })
  },
  async deleteEvent (context, id) {
    return await traverson.from('http://localhost:3000/api/v1/events/{idtemplate}')
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
