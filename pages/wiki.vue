<template>
  <v-container>
    <!-- All topic -->
    <v-list>
      <v-list-group
        v-for="topic in topics"
        :key="topic.name"
        v-model="topic.active"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="topic.name" />
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subtopic in topic.subtopics"
          :key="subtopic.nom"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subtopic.nom" />
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>

    <!-- New Topic -->
    <div class="text-left mt-5">
      <v-dialog
        v-model="dialogNewTopic"
        width="500"
      >
        <!-- Button : trigger of the dialog -->
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mx-2"
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
              <v-form ref="formNewTopic" v-model="formNewTopic">
                <!-- Inputs for the new topic -->
                <v-row>
                  <!-- New topic : name -->
                  <v-col cols="12">
                    <v-text-field
                      v-model="newTopic.name"
                      label="Name"
                      :rules="[rules.required]"
                    />
                  </v-col>

                  <!-- New topic : description -->
                  <v-col cols="12">
                    <div class="d-flex justify-center">
                      <v-textarea
                        v-model="newTopic.description"
                        label="Description"
                        :rules="[rules.required]"
                        :placeholder="newTopic.description || 'Please write the description of your topic!'"
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
              @click="createTopic"
            >
              Create new Topic !
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>

export default {
  name: 'Pagewiki',

  data: () => ({
    formNewTopic: false,
    dialogNewTopic: false,
    topics: [
      {
        name: 'Religion',
        subtopics: [
          { nom: 'detail' },
          { nom: 'boudiste' },
          { nom: 'catholique' },
          { nom: 'protestant' }
        ]
      },
      {
        name: 'ville',
        subtopics: [
          { nom: 'detail' },
          { nom: 'paris' },
          { nom: 'nantes' },
          { nom: 'marseille' }
        ]
      },
      {
        name: 'nouriture',
        subtopics: [
          { nom: 'detail' },
          { nom: 'patate' },
          { nom: 'viande de struff' },
          { nom: 'couille de struff' }
        ]
      }
    ],
    newTopic: {
      name: '',
      description: '',
      subtopics: [
        { nom: 'detail' }
      ]
    },
    newTopicPlaceholder: {
      name: '',
      description: '',
      subtopics: [
        { nom: 'detail' }
      ]
    },

    rules: {
      required: value => !!value || 'Required'
    }

  }),

  methods: {
    createTopic () {
      if (this.$refs.formNewTopic.validate()) {
        this.topics.push(this.newTopic)
        this.newTopic = this.newTopicPlaceholder
        this.dialogNewTopic = false
      }
    }
  },

  head () {
    return { title: 'wiki' }
  }
}
</script>
