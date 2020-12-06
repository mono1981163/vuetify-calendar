
<template>
    <v-card>
        <v-card-title class="headline grey lighten-2">
            <v-icon>mdi-calendar</v-icon>
            &nbsp;&nbsp;2020.12.6
            <v-icon>mdi-cross</v-icon>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col>
                    <v-btn
                        outlined
                        class="mr-4"
                        color="red darken-2"
                        @click="setEachDateDialogOpen = false"
                    >
                    営業時間設定
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn
                        outlined
                        class="mr-4"
                        color="red darken-2"
                        @click="setEachDateDialogOpen = false"
                    >
                    休業日に設定
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
    </v-card>
</template>


<script>
export default {
    name: 'SetDateDialog',

}
</script>