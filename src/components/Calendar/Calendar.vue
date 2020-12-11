<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            今日
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ changeTitle () }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <<<<<<<Registration of business days and hours Part Start  <<<<<<< -->
          <v-dialog
            bottom
            right
            v-model="setMonthlyDialogOpen"
            persistent
            max-width="450px"
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
            <v-form ref="updateMonthlyForm" lazy-validation>
            <form @submit.prevent="sendUpdateMonthlyData()">
              <v-card>
                <v-card-title>
                  <v-row justify="center">
                    <v-spacer></v-spacer>
                    <span 
                      style="margin: auto; font-size: 1em; display: flex;"
                    >
                      <v-icon>mdi-calendar-month-outline</v-icon>
                      <span style="padding-top: 4px; padding-left: 3px;"><strong>営業日・時間の登録</strong></span>
                    </span>
                    <v-spacer></v-spacer>
                    <v-btn
                      icon
                      right
                      @click="setMonthlyDialogOpen = false"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-row>
                </v-card-title>
                <v-divider horizontal></v-divider>
                <v-card-text>
                  <div class="weekday">
                    <v-container 
                      class="grey lighten-5"
                    >
                      <v-row>
                        <span style="font-size: 1.2em"><strong>営業可能な曜日</strong></span>
                      </v-row>
                      <v-row style="justify-content: space-between">
                        <!-- <v-col
                          v-for="n in 7"
                          :key="n"
                          class="mycheckbox"
                        >
                          <v-checkbox
                            v-model="checkedDays[n]"
                            :label="`${weekDayArray[n-1]}`"
                            color="black"
                            value="checkedDay"
                            hide-details
                          ></v-checkbox>
                        </v-col> -->
                        <v-col
                          class="mycheckbox"
                        >
                          <v-checkbox
                            v-model="checkedDay0"
                            label="月"
                            color="grey"
                            hide-details
                          ></v-checkbox>
                        </v-col>
                        <v-col
                          class="mycheckbox"
                        >
                          <v-checkbox
                            v-model="checkedDay1"
                            label="火"
                            color="grey"
                            hide-details
                          ></v-checkbox>
                        </v-col>
                        <v-col
                          class="mycheckbox"
                        >
                          <v-checkbox
                            v-model="checkedDay2"
                            label="水"
                            color="grey"
                            hide-details
                          ></v-checkbox>
                        </v-col>
                        <v-col
                          class="mycheckbox"
                        >
                          <v-checkbox
                            v-model="checkedDay3"
                            label="木"
                            color="grey"
                            hide-details
                          ></v-checkbox>
                        </v-col>
                        <v-col
                          class="mycheckbox"
                        >
                          <v-checkbox
                            v-model="checkedDay4"
                            label="金"
                            color="grey"
                            hide-details
                          ></v-checkbox>
                        </v-col>
                        <v-col
                          class="mycheckbox"
                        >
                          <v-checkbox
                            v-model="checkedDay5"
                            label="土"
                            color="grey"
                            hide-details
                          ></v-checkbox>
                        </v-col>
                        <v-col
                          class="mycheckbox"
                        >
                          <v-checkbox
                            v-model="checkedDay6"
                            label="日"
                            color="grey"
                            hide-details
                          ></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                  <v-container class="grey lighten-5">
                    <v-row>
                      <span style="font-size: 1.3em; margin: 10px;"><strong>営業時間</strong></span>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="3"
                        style="margin-top: 15px;"
                      >
                        <h3>ランチ</h3>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-dialog
                            ref="weekLunchBeginTime"
                            v-model="menu_weekLunchBeginTime"
                            :close-on-content-click="false"
                            :return-value.sync="weekLunchBeginTime"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="weekLunchBeginTime"
                                readonly
                                outlined
                                v-bind="attrs"
                                v-on="on"
                                color="grey lighten-1"
                                class="timepicker-textfield"
                                :rules="[rules.required]"
                            ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menu_weekLunchBeginTime"
                                v-model="weekLunchBeginTime"
                                :max="weekLunchEndTime"
                                format="24hr"
                                color="grey lighten-1"
                                @click:minute="$refs.weekLunchBeginTime.save(weekLunchBeginTime)"
                            ></v-time-picker>
                        </v-dialog>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >   
                        <v-dialog
                            ref="weekLunchEndTime"
                            v-model="menu_weekLunchEndTime"
                            :close-on-content-click="false"
                            :return-value.sync="weekLunchEndTime"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="weekLunchEndTime"
                                readonly
                                outlined
                                v-bind="attrs"
                                v-on="on"
                                color="grey lighten-1"
                                class="timepicker-textfield"
                                required
                                :rules="[rules.required]"
                            ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menu_weekLunchEndTime"
                                v-model="weekLunchEndTime"
                                :min="weekLunchBeginTime"
                                :max="weekDinnerBeginTime"
                                format="24hr"
                                color="grey lighten-1"
                                @click:minute="$refs.weekLunchEndTime.save(weekLunchEndTime)"
                            ></v-time-picker>
                        </v-dialog>
                      </v-col>
                    </v-row>
                    <v-spacer></v-spacer>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="3"
                        style="margin-top: 15px"
                      >
                        <h3>ディナー</h3>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >
                        <v-dialog
                            ref="weekDinnerBeginTime"
                            v-model="menu_weekDinnerBeginTime"
                            :close-on-content-click="false"
                            :return-value.sync="weekDinnerBeginTime"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="weekDinnerBeginTime"
                                readonly
                                outlined
                                v-bind="attrs"
                                v-on="on"
                                color="grey lighten-1"
                                class="timepicker-textfield"
                                required
                                :rules="[rules.required]"
                            ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menu_weekDinnerBeginTime"
                                v-model="weekDinnerBeginTime"
                                :min="weekLunchEndTime"
                                :max="weekDinnerEndTime"
                                format="24hr"
                                color="grey lighten-1"
                                @click:minute="$refs.weekDinnerBeginTime.save(weekDinnerBeginTime)"
                            ></v-time-picker>
                        </v-dialog>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                      >   
                        <v-dialog
                            ref="weekDinnerEndTime"
                            v-model="menu_weekDinnerEndTime"
                            :close-on-content-click="false"
                            :return-value.sync="weekDinnerEndTime"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="weekDinnerEndTime"
                                readonly
                                outlined
                                v-bind="attrs"
                                v-on="on"
                                color="grey lighten-1"
                                class="timepicker-textfield"
                                required
                                :rules="[rules.required]"
                            ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menu_weekDinnerEndTime"
                                v-model="weekDinnerEndTime"
                                :min="weekDinnerBeginTime"
                                format="24hr"
                                color="grey lighten-1"
                                @click:minute="$refs.weekDinnerEndTime.save(weekDinnerEndTime)"
                            ></v-time-picker>
                        </v-dialog>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-container>
                    <v-row justify="center">
                      <v-btn
                        color="grey lighten-1"
                        class="ma-2 black--text"
                        large
                        style="margin-top: -28px !important;"
                        @click="sendUpdateMonthlyData"
                        :disabled="!value"
                      >
                        設定する
                      </v-btn>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </form>
            </v-form>
          </v-dialog>
          <!-- >>>>>>>Registration of business days and hours Part End  >>>>>>>> -->
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="red"
          :event-color="getEventColor"
          :type="type"
          :weekdays="weekday"
          :weekday-format="japaneseWeekday"
          :month-format="japaneseMonth"
          @click:date="setDay"
        >
        <!-- <<<<<<<< Customize Event Name Displayed Part <<<<<<<<<-->
            <template v-slot:day="{ date }">
              <template v-for="event in eventsMap[date]">
                <v-menu
                  :key="event.shop_id"
                  offset-x
                >
                  <template v-slot:activator="{ on }">
                    <div
                      v-if="!event.holiday_flag"
                      v-ripple
                      class="my-event"
                      v-on="on"
                      v-html="event.dinner_begin_time.slice(0, 5)
                      + '-' + event.dinner_end_time.slice(0, 5)"
                    ></div>
                    <div
                      v-if="!event.holiday_flag"
                      v-ripple
                      class="my-event"
                      v-on="on"
                      v-html="event.lunch_begin_time.slice(0, 5)
                      + '-' + event.lunch_end_time.slice(0, 5)"
                    ></div>
                    <div
                      v-if="event.holiday_flag"
                      v-ripple
                      class="holiday-event"
                      v-on="on"
                      v-html="'店舗定休日'"
                    ></div>
                  </template>
                </v-menu>
              </template>
            </template>
        <!-- >>>>>>>>> Customize Event Name Displayed Part >>>>>>>>>-->

          </v-calendar>
      </v-sheet>
      <!-- <<<<<<< If you click the number of day, then this dialog will display. <<<<<<<<< --->
      <v-container>
            <div class="text-center">
                <v-dialog
                    v-model="setDayDialogOpen"
                    max-width="350px"
                >
                  <v-card>
                      <v-card-title class="headline lighten-2">
                        <v-row justify="center">
                          <v-spacer></v-spacer>
                          <span
                              style="font-size: 0.8em; display: flex;"
                              align="center"
                          >
                            <v-icon>mdi-calendar-month-outline</v-icon>
                            <span style="padding-top: 3px; padding-left: 3px;"> {{ selectedDate }}</span>
                          </span>
                          <v-spacer></v-spacer>
                          <v-btn
                            icon
                            right
                            @click="setDayDialogOpen = false"
                          >
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-row>
                      </v-card-title>
                      <v-divider horizontal style="margin: 10px;"></v-divider>
                      <v-card-text>
                          <v-row>
                              <v-col>
                                  <v-dialog
                                      v-model="setBusinessDayDialogOpen"
                                      persistent
                                      max-width="450px"
                                  >
                                      <template v-slot:activator="{ on, attrs }">
                                      <v-btn
                                          outlined
                                          class="mr-4"
                                          color="red darken-2"
                                          v-bind="attrs"
                                          v-on="on"
                                          large
                                          style="margin-left: 20px; min-width: 200px"
                                      >
                                          <v-icon>mdi-clock-time-five-outline</v-icon>
                                          <span style="padding-top: 2px; padding-left: 3px;"> 営業時間設定</span>
                                      </v-btn>
                                      </template>
                                      <v-form ref="updateDailyForm" lazy-validation>
                                        <form @submit.prevent="sendUpdateDayData()">
                                          <v-card>
                                            <v-card-title>
                                              <v-row justify="center">
                                                <v-spacer></v-spacer>
                                                <span
                                                    style="font-size: 1em; display: flex;"
                                                    align="center"
                                                >
                                                  <v-icon>mdi-calendar-month-outline</v-icon>
                                                  <span style="padding-top: 4px; padding-left: 3px;"> {{ selectedDate }}</span>
                                                </span>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                  icon
                                                  right
                                                  @click="setBusinessDayDialogOpen = false"
                                                >
                                                  <v-icon>mdi-close</v-icon>
                                                </v-btn>
                                              </v-row>
                                            </v-card-title>
                                            <v-divider horizontal></v-divider>
                                            <v-card-text>
                                              <v-container class="grey lighten-5">
                                                <v-row>
                                                  <span style="font-size: 1.3em; margin: 10px;"><strong>営業時間</strong></span>
                                                </v-row>
                                                <v-row>
                                                  <v-col
                                                    cols="12"
                                                    sm="3"
                                                    style="margin-top: 15px;"
                                                  >
                                                    <h3>ランチ</h3>
                                                  </v-col>
                                                  <v-col
                                                    cols="12"
                                                    sm="4"
                                                  >
                                                    <v-dialog
                                                        ref="lunchBeginTime"
                                                        v-model="menu_lunchBeginTime"
                                                        :close-on-content-click="false"
                                                        :return-value.sync="lunchBeginTime"
                                                        transition="scale-transition"
                                                        max-width="290px"
                                                        min-width="290px"
                                                    >
                                                        <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                            v-model="lunchBeginTime"
                                                            readonly
                                                            outlined
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            color="grey lighten-1"
                                                            class="timepicker-textfield"
                                                            required
                                                            :rules="[rules.required]"
                                                        ></v-text-field>
                                                        </template>
                                                        <v-time-picker
                                                            v-if="menu_lunchBeginTime"
                                                            v-model="lunchBeginTime"
                                                            :max="lunchEndTime"
                                                            format="24hr"
                                                            color="grey lighten-1"
                                                            @click:minute="$refs.lunchBeginTime.save(lunchBeginTime)"
                                                        ></v-time-picker>
                                                    </v-dialog>
                                                  </v-col>
                                                  <v-col
                                                    cols="12"
                                                    sm="4"
                                                  >   
                                                    <v-dialog
                                                        ref="lunchEndTime"
                                                        v-model="menu_lunchEndTime"
                                                        :close-on-content-click="false"
                                                        :return-value.sync="lunchEndTime"
                                                        transition="scale-transition"
                                                        max-width="290px"
                                                        min-width="290px"
                                                    >
                                                        <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                            v-model="lunchEndTime"
                                                            readonly
                                                            outlined
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            color="grey lighten-1"
                                                            class="timepicker-textfield"
                                                            required
                                                            :rules="[rules.required]"
                                                        ></v-text-field>
                                                        </template>
                                                        <v-time-picker
                                                            v-if="menu_lunchEndTime"
                                                            v-model="lunchEndTime"
                                                            :min="lunchBeginTime"
                                                            :max="dinnerBeginTime"
                                                            format="24hr"
                                                            color="grey lighten-1"
                                                            @click:minute="$refs.lunchEndTime.save(lunchEndTime)"
                                                        ></v-time-picker>
                                                    </v-dialog>
                                                  </v-col>
                                                </v-row>
                                                <v-spacer></v-spacer>
                                                <v-row>
                                                  <v-col
                                                    cols="12"
                                                    sm="3"
                                                    style="margin-top: 15px"
                                                  >
                                                    <h3>ディナー</h3>
                                                  </v-col>
                                                  <v-col
                                                    cols="12"
                                                    sm="4"
                                                  >
                                                    <v-dialog
                                                        ref="dinnerBeginTime"
                                                        v-model="menu_dinnerBeginTime"
                                                        :close-on-content-click="false"
                                                        :return-value.sync="dinnerBeginTime"
                                                        transition="scale-transition"
                                                        max-width="290px"
                                                        min-width="290px"
                                                    >
                                                        <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                            v-model="dinnerBeginTime"
                                                            readonly
                                                            outlined
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            color="grey lighten-1"
                                                            class="timepicker-textfield"
                                                            required
                                                            :rules="[rules.required]"
                                                        ></v-text-field>
                                                        </template>
                                                        <v-time-picker
                                                            v-if="menu_dinnerBeginTime"
                                                            v-model="dinnerBeginTime"
                                                            :min="lunchEndTime"
                                                            :max="dinnerEndTime"
                                                            format="24hr"
                                                            color="grey lighten-1"
                                                            @click:minute="$refs.dinnerBeginTime.save(dinnerBeginTime)"
                                                        ></v-time-picker>
                                                    </v-dialog>
                                                  </v-col>
                                                  <v-col
                                                    cols="12"
                                                    sm="4"
                                                  >   
                                                    <v-dialog
                                                        ref="dinnerEndTime"
                                                        v-model="menu_dinnerEndTime"
                                                        :close-on-content-click="false"
                                                        :return-value.sync="dinnerEndTime"
                                                        transition="scale-transition"
                                                        max-width="290px"
                                                        min-width="290px"
                                                    >
                                                        <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                            v-model="dinnerEndTime"
                                                            readonly
                                                            outlined
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            color="grey lighten-1"
                                                            class="timepicker-textfield"
                                                            required
                                                            :rules="[rules.required]"
                                                        ></v-text-field>
                                                        </template>
                                                        <v-time-picker
                                                            v-if="menu_dinnerEndTime"
                                                            v-model="dinnerEndTime"
                                                            :min="dinnerBeginTime"
                                                            format="24hr"
                                                            color="grey lighten-1"
                                                            @click:minute="$refs.dinnerEndTime.save(dinnerEndTime)"
                                                        ></v-time-picker>
                                                    </v-dialog>
                                                  </v-col>
                                                </v-row>
                                              </v-container>
                                              <v-container>
                                                <v-row justify="center"> 
                                                  <v-btn
                                                    color="grey lighten-1"
                                                    class="ma-2 black--text"
                                                    large
                                                    @click="sendUpdateDayData"
                                                  >
                                                  設定する
                                                  </v-btn>
                                                </v-row>
                                              </v-container>
                                            </v-card-text>
                                            <v-card-actions>
                                            </v-card-actions>
                                          </v-card>
                                        </form>
                                      </v-form>
                                  </v-dialog>
                              </v-col>
                          </v-row>
                          <v-row justify="center">
                              <v-col>
                                  <v-dialog
                                      bottom
                                      right
                                      v-model="setHolidayDialogOpen"
                                      persistent
                                      max-width="300px"
                                  >
                                      <template v-slot:activator="{ attrs }">
                                      <v-btn
                                          outlined
                                          class="mr-4"
                                          color="red darken-2"
                                          v-bind="attrs"
                                          large
                                          style="margin-left: 20px; min-width: 200px;"
                                          @click="sendHolidayData"
                                      >
                                          休業日に設定
                                      </v-btn>
                                      </template>
                                      
                                        <v-card>
                                          <v-card-title></v-card-title>
                                          <v-card-text>
                                            <v-row justify="center">
                                                <v-icon 
                                                  size="5em"
                                                  color="red"
                                                >
                                                  mdi-check-circle-outline
                                                </v-icon>
                                            </v-row>
                                            <v-container>
                                              <v-row justify="center">
                                                <h1>カレンダーが</h1>
                                              </v-row>
                                            </v-container>
                                            <v-container>
                                              <v-row justify="center">
                                                <h1>変更されました</h1>
                                              </v-row>
                                            </v-container>
                                          </v-card-text>
                                          <v-card-actions class="d-flex justify-center">
                                              <v-btn
                                                  color="grey"
                                                  class="ma-2 black--text "
                                                  large
                                                  outlined
                                                  style="width: 80%;"
                                                  @click="setHolidayDialogOpen = false"
                                              >
                                                設定する
                                              </v-btn>
                                          </v-card-actions>
                                        </v-card>
                                  </v-dialog>
                              </v-col>
                          </v-row>
                      </v-card-text>
                      <v-card-actions>
                      </v-card-actions>
                  </v-card>
                </v-dialog>
            </div>
      </v-container>
      <!-- >>>>>>> If you click the number of day, then the above dialog will display. >>>>>>> --->

    </v-col>
  </v-row>
</template>
<script>
  import json from '../../data/calendar_data.json';
  import axios from 'axios'
  
  export default {
    data: () => ({
      posts: [],
      errors: [],
      contents: null,
      focus: '',
      type: 'month',
      weekday: [1, 2, 3, 4, 5, 6, 0],
      weekDayArray:  ['月','火','水','木','金','土','日'],
      events: myEvents,
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      setDayDialogOpen: false,
      selectedDate: '',
      settingsDate: null,
      //Registration of busienss day and time part
      setMonthlyDialogOpen: false,
      lunchBeginTime: null,
      lunchEndTime: null,
      dinnerBeginTime: null,
      dinnerEndTime: null,
      weekLunchBeginTime: null,
      weekLunchEndTime: null,
      weekDinnerBeginTime: null,
      weekDinnerEndTime: null,

      menu_lunchBeginTime: false,
      menu_lunchEndTime: false,
      menu_dinnerBeginTime: false,
      menu_dinnerEndTime: false,
      menu_weekLunchBeginTime: false,
      menu_weekLunchEndTime: false,
      menu_weekDinnerBeginTime: false,
      menu_weekDinnerEndTime: false,


      //Set day part
      setBusinessDayDialogOpen: false,
      setHolidayDialogOpen: false,

      //checkbox part
      checkedDay1: false,
      checkedDay2: false,
      checkedDay3: false,
      checkedDay4: false,
      checkedDay5: false,
      checkedDay6: false,
      checkedDay0: false,
      //form part
      value: true, 
      rules: {
          required: value => !!value || 'Required.'
      },

      
    }),

    mounted () {
      //this.$refs.calendar.checkChange()
      this.$refs.calendar.next()
      this.focus = ''
      console.log(this.$refs.calendar)
      
      this.fetchAPIData()
    },
    computed: {
    // convert the list of events into a map of lists keyed by setting_date
      eventsMap () {
        const map = {}
        console.log("This.events ==" + this.events)
        this.events.forEach(e => (map[e.settings_date] = map[e.settings_date] || []).push(e))
        return map
      }
    },
    methods: {
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      //Set each day's business time dialog open
      setDay ({ date, weekday }) {
          this.setDayDialogOpen = true
          this.weekDayNum = weekday
          console.log(this.weekDayNum)
          let weekDayArray =  ['月','火','水','木','金','土','日']
          console.log(typeof(date))
          this.selectedDate = date.substr(0,4) + '年' + date.substr(5,2) + '月' + date.substr(8,2) + '日 (' + weekDayArray[weekday-1] + ')'
          console.log(this.selectedDate)
          this.settingsDate = date

      },

      fetchAPIData() {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "laravel_session=eyJpdiI6Ino0dmc1eU5VWVE0ZlF5cXdhZXVvYVE9PSIsInZhbHVlIjoiQ0IrbnVmWWNRT01lRVdjSWhPaExaNmgxRHdyWGlDRTRLZytTUDBpWFE5NXI4UHF4M2RudTBsUHdYdnFDK1ZldHoxdXlTdlBxOFwvYXlCYUcwVUFKRG1wT2E4dzRVN3pHYmVReTFjV0RNUlwvRnp3Z0RIWHdOMDFUaTN1RmM0M05VVyIsIm1hYyI6IjMyNDg4MjRhYWQ4OGI2ZTNlNmNkMGUxZTNmMWE5MWQyZWFjZDc3ZGJjZjRkMTVjMmU0YTEzMmY5MzViNGRhZmMifQ%3D%3D");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch("https://familytakeout.com/manage/shop/calendar/2020/11", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

      },
      //English --> Japanese
      japaneseWeekday(d){
        var weekDayArray =  ['日','月','火','水','木','金','土']
        for (var i = 0; i <= 6; i++)
          if(d.weekday == i)
            return weekDayArray[i]
        
      },
      japaneseMonth(m){
        var monthArray = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',]
        for (var i = 1; i < 13; i++) {
          if(m.month == i) 
            return monthArray[i-1]
        }
      },
      changeTitle () {
        console.log(this.$refs.calendar.title)
        let calendarTitle = this.$refs.calendar.title
        console.log(calendarTitle.slice(0, -5))
        let ref = calendarTitle.slice(0, -5)
        let yearName = calendarTitle.slice(-4)
        
        const monthJapaneseNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        const monthEnglihNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        
        for(var i = 0; i < 12; i++)
          if(ref === monthEnglihNames[i])
            // //var this.displayedTitle = new String()
            // displayedTitle = monthJapaneseNames[i] + yearName
            return this.title = monthJapaneseNames[i] + " " + yearName;
        //this.events = events
        //this.$refs.calendar.prev()
        // this.$refs.calendar.next()

      },

      //form part
      sendUpdateMonthlyData () {
        let validationFlag
        validationFlag = this.$refs.updateMonthlyForm.validate()
        
        if (validationFlag === true) {
          let calendarYear = Object.values(this.$refs.calendar.days)[0].year
          let calendarMonth = Object.values(this.$refs.calendar.days)[0].month
          let calendarDate = calendarYear.toString() + "-" + calendarMonth.toString()
          let obj = {
            date: calendarDate,
            sunday: this.checkedDay6,
            monday: this.checkedDay0,
            tuesday: this.checkedDay1,
            wednesday: this.checkedDay2,
            thursday: this.checkedDay3,
            friday: this.checkedDay4,
            saturday: this.checkedDay5,
            lunch_begin_time: this.weekLunchBeginTime,
            lunch_end_time: this.weekLunchEndTime,
            dinner_begin_time: this.weekDinnerBeginTime,
            dinner_end_time: this.weekDinnerEndTime,
          }
          console.log(obj)
          let ref = this;
          axios.post('https://familytakeout.com/manage/shop/calendar/update_monthly', obj)
          .then(function (response) {
            console.log(response);
            alert("Success")
            ref.setMonthlyDialogOpen = false;  //This part should be revised.
          })
          .catch(function (error) {
            console.log(error);
            ref.setMonthlyDialogOpen = false;  //This part should be revised.
            alert("API call failed!")
          });
        }
      },
      sendUpdateDayData () {
        let validationFlag;
        validationFlag = this.$refs.updateDailyForm.validate()
        if (validationFlag === true) {
          let obj = {
            settings_date: this.settingsDate,
            lunch_begin_time: this.lunchBeginTime,
            lunch_end_time: this.lunchEndTime,
            dinner_begin_time: this.dinnerBeginTime,
            dinner_end_time: this.dinnerEndTime,
          }
          console.log(obj)
          let ref = this;
          axios.post('https://familytakeout.com/manage/shop/calendar/update', obj) //This part should be revised
          .then(function (response) {
            console.log(response);
            ref.setBusinessDayDialogOpen = false; 
            ref.setDayDialogOpen = false;
            alert("Success!")
          })
          .catch(function (error) {
            console.log(error);
            ref.setBusinessDayDialogOpen = false;
            ref.setDayDialogOpen = false;
            alert("API call failed!")

          });
        }
      },
      sendHolidayData() {
        let obj = {
          settings_date: this.settingsDate,
          holiday_flag: true,
        }
        console.log(obj)
        var ref=this;
        axios.post('https://familytakeout.com/manage/shop/calendar/holiday', obj) //This part shoud be revised
        .then(function (response) {
          console.log(response);
          ref.setHolidayDialogOpen = true; 
          ref.setDayDialogOpen = false;
          alert("Success!")
        })
        .catch(function (error) {
          console.log(error);
          ref.setDayDialogOpen = false;
          alert("API call failed!")
        }); 

      },

      
    },
  }
  //get event from json data
  var myEvents =  Object.values(json.data)[0];
  console.log(typeof(myEvents))

</script>

<style scoped>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .my-event {
    font-size: 1.9vw;
  }
  .holiday-event {
    font-size: 1.9vw;
    padding: 20% 0%;
  }
  .mycheckbox {
    width: 25%;
    max-width: 25%;
  }
  .timepicker-textfield {
    width: 100%;
  }
  .col-sm-3  h3{
    text-align: left !important;
    margin-left: 10px;
    margin-bottom: 5px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .my-event {
    font-size: 13px;
  }
  .holiday-event {
    font-size: 13px;
    padding: 20% 0%;
  }
  .mycheckbox {
    width: 14%;
  }
  .timepicker-textfield {
    width: 80%;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .my-event {
    margin-top: 5%;
    font-size: 1.5vw;
  }
  .holiday-event {
    font-size: 1.5vw;
    padding: 20% 0%;
  }
  .mycheckbox {
    width: 14%;
  }
  .timepicker-textfield {
    width: 80%;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .my-event {
    margin-top: 5%;
    font-size: 1.3vw;
  }
  .holiday-event {
    font-size: 1.3vw;
    padding: 20% 0%;
  }
  .mycheckbox {
    width: 14%;
  }
  .timepicker-textfield {
    width: 80%;
  }
}

/* Extra large devices (large laptops and desktops, 1100px and up) */
@media only screen and (min-width: 1100px) {
  .my-event {
    margin-top: 5%;
    font-size: 1.3vw;
  }
  .holiday-event {
    font-size: 1.3vw;
    padding: 17% 0%;
  }
  .mycheckbox {
    width: 14%;
  }
  .timepicker-textfield {
    width: 80%;
  }
}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .my-event {
    margin-top: 3%;
    font-size: 1.3vw;
  }
  .holiday-event {
    font-size: 1.3vw;
    padding: 13% 0%;
  }
  .mycheckbox {
    width: 14%;
  }
  .timepicker-textfield {
    width: 80%;
  }
}
  .my-event {
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    color: #585656;
    width: 100%;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
  .holiday-event {
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    color: #fffcfb;
    background-color: rgba(119, 116, 119, 0.336);
    width: 100%;
    cursor: pointer;
    margin-bottom: 1px;
  }
  
  .weekday {
    border-style: ridge; 
    border-width: 2.2px; 
    margin: 3px 0px;
    padding: 0px 15px;
  }

  .dialogbtn {
      width: 100px;
      height: 30px;
      color: rgb(250, 248, 248);
      background-color: rgb(209, 209, 209);
  }
  .container .col-12{
    padding: 0px;
  }
  .col-sm-3  h3{
    text-align: right;
    margin-right: 25px;
  }

</style>