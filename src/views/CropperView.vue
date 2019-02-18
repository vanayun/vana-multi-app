<template>
  <div>
    CropperView
    <croppa v-model="myCroppa"></croppa>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Croppa from 'vue-croppa';
import 'vue-croppa/dist/vue-croppa.css';

@Component({

})
export default class CropperView extends Vue {

  /** data */
  myCroppa: string;
  constructor() {
    super();
    this.myCroppa = '';
  }

  mounted() { }
}
</script>
