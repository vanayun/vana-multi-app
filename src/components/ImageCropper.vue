<template>
  <div>
    <input type="file" name="image" accept="image/*"
           style="font-size: 16px; padding: 10px 0;"
           @change="setImage($event.target.files)" />
    <br/>
    <div style="width: 400px; height:300px; border: 1px solid gray; display: inline-block;">
      <vue-cropper
          ref='cropper'
          :guides="true"
          :view-mode="1"
          drag-mode="crop"
          :auto-crop-area="0.5"
          :min-container-width="250"
          :min-container-height="180"
          :background="true"
          :rotatable="true"
          :src="imageSrc"
          alt="Source Image"
          :img-style="{ 'width': '400px', 'height': '300px' }">
      </vue-cropper>
    </div>
    <img :src="cropImg" style="width: 200px; height: 150px; border: 1px solid gray" />
    <button @click="doCrop" v-if="imageSrc != ''" style="margin-right: 40px;">Crop</button>
    <button @click="rotate" v-if="imageSrc != ''">Rotate</button>
    <button @click="zoomIn" v-if="imageSrc != ''"> + </button>
    <button @click="zoomOut" v-if="imageSrc != ''"> - </button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import VueCropper from 'vue-cropperjs';
import cropperVue from 'vue-croppa/src/cropper.vue';

@Component({
  components: {
    VueCropper,
  }
})
export default class ImageCropper extends Vue {

  /** data */
  public imageSrc: string;
  public cropImg: string;

  constructor() {
    super();
    this.imageSrc = '';
    this.cropImg = '';
  }

  public $refs!: {
    cropper: VueCropper
  }

  /** emit */
  @Emit('doCropped')
  private doCropped(cropImg: string): void {
    this.$emit('do-crop', cropImg);
  }

  /** methods */

  public setImage(files: [any]): void {
    
    // 1. 파일을 요소를 가져옴.
    const file = files[0];

    // 2. 이미지 파일인지 체크
    if (!/^image\/\w+$/.test(file.type)) {
      alert('이미지 파일만 올릴 수 있습니다.');
      return;
    }

    if (typeof FileReader === 'function') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageSrc = event.target.result
        // 화면에 이미지 replace
        this.$refs.cropper.replace(this.imageSrc);
      }

      reader.readAsDataURL(file);
    } else {
      alert('Sorry, FileReader API not supported');
    }
  }

  public doCrop(): void {
    this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    // 부모창에 반영 상태를 알림.
    this.doCropped(this.cropImg);
  }

  public rotate(): void {
    this.$refs.cropper.rotate(90);
  }

  public zoomIn(e: Event): void {
    let ratio = .1;
    this.zoom(ratio, e);
  }

  public zoomOut(e: Event): void {
    let ratio = -.1;
    this.zoom(ratio, e);
  }

  public zoom(zoomRatio: number, event: Event): void  {
    const canvasData = this.$refs.cropper.getCanvasData();
    let ratio = zoomRatio;
    if (ratio < 0) {
      ratio = 1 / (1 - ratio);
    } else {
      ratio = 1 + ratio;
    }

    return this.$refs.cropper.zoomTo((canvasData.width * ratio) / canvasData.naturalWidth, null, event);
  }
}
</script>