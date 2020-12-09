<template>
  <v-container>
    <div>
      <v-row>
        <h1 class="ma-4">
          {{ title_subtopic }}
        </h1>

        <v-spacer />
        <!-- Add -->
        <v-dialog
          v-model="dialogAdd"
          width="500"
        >
          <!--Button : trigger of the dialog -->
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-4"
              fab
              dark
              color="dark"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>

          <!-- Dialog -->
          <v-card>
            <v-card-title>
              <span class="headline">New Topic</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <!-- Form -->
                <v-form ref="formAdd" v-model="formAdd">
                  <!-- Inputs for Add -->
                  <v-row>
                    <!-- Radio Button: article or subtopics -->
                    <v-col cols="12">
                      <v-radio-group
                        v-model="radios"
                        row
                        mandatory
                      >
                        <v-radio
                          label="Article"
                          value="NewArticle"
                        />
                        <v-radio
                          label="SubTopic"
                          value="NewSubtopic"
                        />
                      </v-radio-group>
                    </v-col>
                    <!-- New Add: name -->
                    <v-col cols="12">
                      <v-text-field
                        v-model="newAdd.nom"
                        label="Name"
                        :rules="[rules.required]"
                      />
                    </v-col>

                    <!-- New Add : description -->
                    <v-col cols="12">
                      <div class="d-flex justify-center">
                        <v-textarea
                          v-model="newAdd.description"
                          label="Description"
                          :rules="[rules.required]"
                          :placeholder="newAdd.description || 'Please write the description!'"
                          outlined
                          auto-grow
                          rows="4"
                        />
                      </div>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <!-- Divider -->
            <v-divider />

            <!-- Actions -->
            <v-card-actions>
              <v-spacer />

              <!-- Button to create the Topic -->
              <v-btn
                color="primary"
                text
                @click="create"
              >
                Create !
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- buton modify -->
        <v-btn
          class="ma-4"
          fab
          dark
          color="dark"
          to="/wiki_modify"
        >
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-img min-height="200" max-height="200" lazy-src="/logo.png" :src="souce" />
        </v-col>
        <v-textarea
          class="mt-5"
          name="description"
          filled
          auto-grow
          :value="text"
          readonly
        />
      </v-row>
    </div>
    <!-- All article -->
    <v-list>
      <v-list-group
        v-for="truc in items"
        :key="truc.name"
        v-model="truc.active"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="truc.name" />
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="bidule in truc.item"
          :key="bidule.nom"
          :to="bidule.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="bidule.nom" />
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-container>
</template>

<script>

export default {
  name: 'PageSubtopic',

  data: () => ({
    radios: null,
    formAdd: false,
    dialogAdd: false,
    title_subtopic: 'Catholique',
    text: "l'église catholique, sainte Eglise catholique, apostrolotique et romaine, est l'institution rassemblant l'ensemble des catholiques, c'est-à-dire tous les chrétiens en communion avec le pape et les évêques. En plus d'être l'ensemble des baptisés, elle est aussi une institution et un clergé organisés de façon hiérarchique. Pour les catholiques, Jésus-Christ est le chef de l'Église.",
    items: [
      {
        name: 'article',
        item: [
          {
            nom: 'lieux',
            to: '/wiki_article'
          },
          {
            nom: 'personne',
            to: '/wiki_article'
          },
          {
            nom: 'objets',
            to: '/wiki_article'
          }
        ]
      },
      {
        name: 'subTopics',
        item: [
          {
            nom: 'boudiste',
            to: '/wiki_subtopics'
          },
          {
            nom: 'protestant',
            to: '/wiki_subtopics'
          }

        ]
      }
    ],
    newAdd: {
      nom: '',
      description: '',
      to: ''
    },
    newAddPlaceholder: {
      nom: '',
      description: '',
      to: ''
    },

    rules: {
      required: value => !!value || 'Required'
    },
    source: `https://picsum.photos/500/300?image=${5 * 5 + 10}`
  }),

  methods: {
    create () {
      if (this.radios === 'NewArticle' && this.$refs.formAdd.validate()) {
        const index = this.items.findIndex(i => i.name === 'article')
        this.items[index].item.push(this.newAdd)
        this.newAdd = this.newAddPlaceholder
        this.dialogAdd = false
      }
      if (this.radios === 'NewSubtopic' && this.$refs.formAdd.validate()) {
        const index = this.items.findIndex(i => i.name === 'subTopics')
        this.items[index].item.push(this.newAdd)
        this.newAdd = this.newAddPlaceholder
        this.dialogAdd = false
      }
    }
  },

  head () {
    return { title: 'wiki_subtopic' }
  }
}
</script>
