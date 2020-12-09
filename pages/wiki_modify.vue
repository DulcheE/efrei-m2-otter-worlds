<template>
  <v-container>
    <v-form ref="formModify" v-model="formModify">
      <!-- Inputs for Add -->
      <v-row>
        <!-- Nom -->
        <v-text-field
          v-model="article.name"
          label="Name"
          :rules="[rules.required]"
        />
        <v-spacer />

        <!-- validate -->
        <v-btn
          fab
          dark
          color="dark"
          to="/wiki_subtopics"
        >
          <v-icon large dark>
            mdi-check-circle-outline
          </v-icon>
        </v-btn>

        <!-- Cancel -->
        <v-btn
          class="ml-4"
          fab
          dark
          color="dark"
          to="/wiki_subtopics"
        >
          <v-icon large dark>
            mdi-cancel
          </v-icon>
        </v-btn>
      </v-row>

      <v-row>
        <v-textarea
          class="mt-10"
          labal="Description"
          :rules="[rules.required]"
          outlined
          auto-grow
          rows="4"
          :value="article.text"
        />
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'PageModify',

  data: () => ({
    formModify: false,
    article: {
      name: 'Chatholique',
      text: "l'église catholique, sainte Eglise catholique, apostrolotique et romaine, est l'institution rassemblant l'ensemble des catholiques, c'est-à-dire tous les chrétiens en communion avec le pape et les évêques. En plus d'être l'ensemble des baptisés, elle est aussi une institution et un clergé organisés de façon hiérarchique. Pour les catholiques, Jésus-Christ est le chef de l'Église."
    },
    rules: {
      required: value => !!value || 'Required'
    }
  }),

  head () {
    return { title: 'Modify Article' }
  }
}
</script>
