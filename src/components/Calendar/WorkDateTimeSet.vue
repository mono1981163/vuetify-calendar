<template>
  <v-dialog
    bottom
    right
    v-model="registTimeDialogOpen"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        outlined
        class="mr-4"
        color="red darken-2"
        v-bind="attrs"
        v-on="on"
      >
        営業日•時間を登録
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline" align="center">営業日・時間の登録</span>
      </v-card-title>
      <v-divider horizontal></v-divider>
      <v-card-text>
          <v-container class="grey lighten-5">
            <v-row>
              <h2 class="headline">営業可能な曜日</h2>
            </v-row>
            <v-row >
              <v-col
                v-for="n in 7"
                :key="n"
                cols="7"
                sm="1"
              >
                <v-checkbox
                  v-model="ex4"
                  label="r"
                  color="black"
                  value="red"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
          <v-container class="grey lighten-5">
            <v-row>
              <h2>営業時間</h2>
            </v-row>
            <v-row>
              <v-col>
                <h3>ランチ</h3>
              </v-col>
              <v-col
                cols="11"
                sm="5"
              >
                <TimePicker/>
              </v-col>
              <v-spacer></v-spacer>
              <v-col
                cols="11"
                sm="5"
              >   
                <TimePicker/>
              </v-col>
            </v-row>
            <v-spacer></v-spacer>
            <v-row>
              <v-col>
                <h3>ディナー</h3>
              </v-col>
              <v-col
                cols="11"
                sm="5"
              >
                <TimePicker/>
              </v-col>
              <v-spacer></v-spacer>
              <v-col
                cols="11"
                sm="5"
              >   
                <TimePicker/>
              </v-col>
            </v-row>
          </v-container>

        <v-container>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="grey darken-1"
          text
          outlined
          @click="registTimeDialogOpen = false"
        >
          設定する
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TimePicker from './TimePicker'
export default {
    name: 'WorkDateTimeSet',

    components: {
        TimePicker,
    },

    data: () => ({
        registTimeDialogOpen: false,
        ex4: false,
    }),
}
</script>