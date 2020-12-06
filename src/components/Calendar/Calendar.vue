<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
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
          <v-spacer></v-spacer>
          <WorkDateTimeSet/>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :weekdays="weekday"
          :event-color="getEventColor"
          :type="type"
          @click:date="setEachDate"
          @change="updateRange"
        ></v-calendar>
        <div class="text-center">
            <v-dialog
                v-model="setEachDateDialogOpen"
                width="500"
            >
              <SetDateDialog/>
            </v-dialog>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  import WorkDateTimeSet from './WorkDateTimeSet';
  import SetDateDialog from './SetDateDialog';

  export default {
    name: 'Calendar',

    components: {
      WorkDateTimeSet,
      SetDateDialog,
    },

    data: () => ({
      focus: '',
      type: 'month',
      weekday: [1, 2, 3, 4, 5, 6, 0],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      setEachDateDialogOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      getEventColor() {
        const eventColor = "grey";
        return eventColor;
      },
      setEachDate () {
          this.setEachDateDialogOpen = true
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      updateRange ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: !allDay,
          })
        }

        this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>
