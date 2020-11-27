<template>
  <v-container>
    <!-- Logo -->
    <v-row align="center" justify="center">
      <v-col md="4">
        <v-img src="/logo-text.png" contain />
      </v-col>
    </v-row>

    <!-- blablabla -->
    <h1 class="ma-4">
      About us
    </h1>
    <v-container>
      <h4>
        We are a group of 4 <a href="https://www.efrei.fr">Efrei Paris</a> Students in their 5th year of cursus in Software Engineering,
        and this website was made for a course of Asynchronous Programming.

        <br><br>

        Please do not hack us <span class="font-italic">(yet !)</span>, we'll be working on that in the short future...

        <br><br><br><br>

        <span class="font-weight-light primary--text ma-16">Still reading ? Thanks, here's a gift for you !</span>
      </h4>
    </v-container>

    <!-- Funny thing -->
    <v-row align="center" justify="center">
      <v-col md="6">
        <!-- Image -->
        <a href="https://otter-quiz.herokuapp.com">
          <v-img
            src="https://i.pinimg.com/originals/68/49/37/684937cb609bc668580f317dbe9f4378.jpg"
            contain
          />
        </a>

        <br>

        <!-- Credit for the OP Original Content -->
        <center>
          <a
            class="font-italic"
            href="https://www.pinterest.fr/pin/539024649141974565"
            align="center"
          >
            Link to the original artist
          </a>
        </center>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PageAboutUs',

  components: {},

  data: () => ({}),

  computed: {},

  mounted () {},

  methods: {}
}
</script>
