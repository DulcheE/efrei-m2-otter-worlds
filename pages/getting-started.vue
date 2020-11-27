<template>
  <v-container>
    <!-- Logo -->
    <v-row align="center" justify="center">
      <v-col md="4">
        <v-img src="/logo-text.png" contain />
      </v-col>
    </v-row>

    <!-- Part 1 - title -->
    <h1 class="ma-4">
      Welcome to the Otter Worlds !
    </h1>

    <!-- Part 1 - blablabla -->
    <v-container>
      <h3>
        The Otter Worlds are a set of tools to manage your your fictional universes in RPGs-settings !
        <br><br>
        As a worldbuilder, you can keep track of all the different elements of your fictional world, from its History to its maps,
        <br>
        and as a players, you can join those universes and create your own characters !
      </h3>
    </v-container>

    <!-- Part 2 - images detailling the roles -->
    <v-container class="pa-4 text-center">
      <v-row
        class="fill-height"
        align="center"
        justify="center"
      >
        <template v-for="(item, i) in itemsRoles">
          <v-col
            :key="i"
            cols="12"
            md="4"
          >
            <v-hover v-slot="{ hover }" class="zoom-xs">
              <v-card
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
              >
                <!-- Image -->
                <v-img :src="item.img" height="300px">
                  <!-- Title -->
                  <v-card-title class="title white--text">
                    <h2 class="shrink d-flex d-md-none">
                      {{ item.title }}
                    </h2>
                    <h3 class="shrink d-none d-md-flex">
                      {{ item.title }}
                    </h3>
                  </v-card-title>

                  <!-- Hover transition (here is expand, but fade is good too) -->
                  <v-expand-transition>
                    <v-overlay
                      v-if="hover"
                      class="secondary darken-1 v-card--reveal white--text"
                      absolute
                    >
                      <div v-for="(content, j) in item.content" :key="j">
                        <h3>
                          {{ content }}
                        </h3>
                        <span v-if="j !== item.content.length - 1"> <br><br></span>
                      </div>
                    </v-overlay>
                  </v-expand-transition>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>
    </v-container>

    <br><br><br><br>

    <!-- Part 3 - what to expect -->
    <h1 class="ma-4">
      What can I do ?
    </h1>

    <v-container>
      <h3>Here's a glimpse of the different features our website proposes :</h3>
    </v-container>

    <br><br>

    <!-- Part 3 - Things to do -->
    <!-- Part 3-a - create universe -->
    <v-lazy
      v-model="isActive"
      class="m-4"
      :options="{
        threshold: .9
      }"
      min-height="350"
      transition="fade-transition"
    >
      <v-container>
        <h2>
          Build your own fantasy worlds !
        </h2>
        <v-row>
          <!-- text -->
          <v-col
            cols="7"
            class="flex-grow-1 flex-shrink-0"
          >
            <v-container fill-height>
              <h3>
                Write the stories of your own universes, from its History to its inhabitants, imagine new races with their mythologies, and sparkle a few conflicts here and there...
                <br><br>
                Share them with your friends, or discover the universes of others !
              </h3>
            </v-container>
          </v-col>

          <!-- image -->
          <v-col
            cols="5"
            class="flex-grow-0 flex-shrink-1"
          >
            <v-img
              src="https://c.wallhere.com/photos/16/e2/Rivendell_The_Lord_of_the_Rings_fantasy_art_waterfall_artwork-1594935.jpg!d"
              height="300px"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-lazy>

    <!-- Part 3-b : custom characters -->
    <v-lazy
      v-model="isActive"
      class="m-4"
      :options="{
        threshold: .9
      }"
      min-height="350"
      transition="fade-transition"
    >
      <v-container>
        <h2>
          Create and customize your characters !
        </h2>
        <v-row>
          <!-- image -->
          <v-col
            cols="5"
            class="flex-grow-0 flex-shrink-1"
          >
            <v-img
              src="https://sketchmob.com/wp-content/uploads/2019/03/171187_1fb351cf9-720x932.jpg"
              height="300px"
            />
          </v-col>

          <!-- text -->
          <v-col
            cols="7"
            class="flex-grow-1 flex-shrink-0"
          >
            <v-container fill-height>
              <h3>
                Create your own characters in your world or the one of your friends !
                <br><br>
                Give them defining traits and statistics, then write an according backstory :)
              </h3>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-lazy>

    <!-- Part 3-c - Maps -->
    <v-lazy
      v-model="isActive"
      class="m-4"
      :options="{
        threshold: .9
      }"
      min-height="350"
      transition="fade-transition"
    >
      <v-container>
        <h2>
          Build your own fantasy worlds !
        </h2>
        <v-row>
          <!-- text -->
          <v-col
            cols="7"
            class="flex-grow-1 flex-shrink-0"
          >
            <v-container fill-height>
              <h3>
                Share the different locations of your world ! From a simple house to a fully-fledged dungeon, or even a whole continent !
                <br><br>
                Mark points of interest on any given map to give insights on a specific place, or to signify something important happened there !
              </h3>
            </v-container>
          </v-col>

          <!-- image -->
          <v-col
            cols="5"
            class="flex-grow-0 flex-shrink-1"
          >
            <v-img
              src="https://overclock3d.net/gfx/articles/2015/12/04053852186l.jpg"
              height="300px"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-lazy>

    <!-- Part 3-d : wiki -->
    <v-lazy
      v-model="isActive"
      class="m-4"
      :options="{
        threshold: .9
      }"
      min-height="350"
      transition="fade-transition"
    >
      <v-container>
        <h2>
          Construct and consult a dedicated wiki !
        </h2>
        <v-row>
          <!-- image -->
          <v-col
            cols="5"
            class="flex-grow-0 flex-shrink-1"
          >
            <v-img
              src="https://4.bp.blogspot.com/-Ej3K0sNdRI8/WlF4q2MhDoI/AAAAAAAACSQ/p-VGHBMhekU5vKLErGgbKR-cFWNL0cAIwCLcBGAs/s1600/Snapshot%2B-%2B47.png"
              height="300px"
            />
          </v-col>

          <!-- text -->
          <v-col
            cols="7"
            class="flex-grow-1 flex-shrink-0"
          >
            <v-container fill-height>
              <h3>
                You know what a wiki is, right ?
              </h3>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-lazy>
  </v-container>
</template>

<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
 }

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .75;
  position: absolute;
  width: 100%;
}
</style>

<script>
export default {
  name: 'PageGettingStarted',
  title: 'Getting started',

  data: () => ({
    isActive: false,
    itemsRoles: [
      {
        title: 'Game Master',
        img: '/getting-started-gm.png',
        content: [
          'Create your universes !',
          'Build stories, write your world-building !',
          'Share your worlds with friends !'
        ]
      },
      {
        title: 'Everyone',
        img: '/getting-started-all.png',
        content: [
          'Browse public universes !',
          ''
        ]
      },
      {
        title: 'Player',
        img: '/getting-started-player.png',
        content: [
          'Join your friend\'s universes !',
          'Create characters !',
          'Interact with other players !'
        ]
      }
    ]
  })
}
</script>
