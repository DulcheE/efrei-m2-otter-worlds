const traverson = require('traverson-promise')

const state = () => ({
  timelines: [],
  timeline: {},
  events: []
})

const getters = {
  getTimelines: state => function () {
    return state.timelines
  },
  getTimelineByid: state => function (id) {
    return state.timelines.find(element => element.id === id)
  },
  getTimeline: state => function () {
    return state.timeline
  },
  getEvents: state => function () {
    return state.events
  }
}

const mutations = {
  setTimelines (state, Timelines) {
    state.timelines = Timelines
  },
  putTimeline (state, Timeline) {
    state.timelines.push(Timeline)
  },
  setTimeline (state, Timeline) {
    state.timeline = Timeline
  },
  setEvents (state, events) {
    state.events = events
  },
  changeTimeline (state, timeline) {
    const id = state.timelines.findIndex((element) => {
      return element.id === timeline.id
    })
    // eslint-disable-next-line no-console
    console.log(state.timelines[id])
    state.timelines[id] = timeline
    // eslint-disable-next-line no-console
    console.log(state.timelines[id])
    state.timeline = timeline

    state.timelines = { ...state.timelines }
  }
}

const actions = {
  async fetchAllTimelines (context) {
    await traverson.from('http://localhost:3000/api/v1/timelines/')
      .json()
      .getResource().result
      .then((document) => {
        // eslint-disable-next-line no-console
        console.log(document)
        context.commit('setTimelines', document.list)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchTimeline (context, id) {
    // eslint-disable-next-line
    console.log(context.state)
    await traverson.from('http://localhost:3000/api/v1/timelines/{idTemplate}/')
      .withTemplateParameters({ idTemplate: id })
      .json()
      .getResource().result
      .then((document) => {
        context.commit('putTimeline', document)
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
        context.commit('putTimeline', document)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  },
  async fetchTimelinesForUniverse (context, id) {
    const document = await traverson.from('http://localhost:3000/api/v1/universes/{iduniver}/timelines')
      .withTemplateParameters({ iduniver: id })
      .json()
      .getResource().result
      .catch((err) => { throw (err) })
    context.commit('setTimelines', document.list)
  },
  async fetchTimelineWithEvent (context, id) {
    const values = await Promise.all([
      traverson.from('http://localhost:3000/api/v1/timelines/{idTimeline}/')
        .withTemplateParameters({ idTimeline: id })
        .json()
        .getResource().result,
      traverson.from('http://localhost:3000/api/v1/timelines/{idTimeline}/')
        .follow('$._links.events.href')
        .withTemplateParameters({ idTimeline: id })
        .json()
        .getResource().result
    ])
      .catch((err) => { throw err })
    context.commit('setTimeline', values[0])
    context.commit('setEvents', values[1].list)
  },
  async addTimeline (context, timeline) {
    const response = await traverson.from('http://localhost:3000/api/v1/timelines/')
      .json()
      .post(timeline).resul
      .catch((err) => {
        throw err
      })
    const result = JSON.parse(response.body)
    context.commit('putTimeline', result)
    return result
  },
  async putTimeline (context, { timeline, id }) {
    const response = await traverson.from('http://localhost:3000/api/v1/timelines/{idtimeline}')
      .withTemplateParameters({ idtimeline: id })
      .json()
      .put(timeline).result
      .catch((err) => {
        throw err
      })
    const result = JSON.parse(response.body)
    context.commit('changeTimeline', result)
    return result
  },
  deleteTimeline (context, id) {
    return traverson.from('http://localhost:3000/api/v1/timelines/{idtimeline}')
      .withTemplateParameters({ idtimeline: id })
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
