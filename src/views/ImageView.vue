<template>
  <div class="image_area">
    <button class="btn btn-primary"
      @click="showModal = true">
      이미지 등록하기!
    </button>
    <div class="thumbnail_area">
      <p>나의 썸네일 이미지</p>
      <div v-show="!cropImage">
        <p>등록된 썸네일이 없습니다.</p>
      </div>
      <img :src="cropImage" />
    </div>
    <common-modal
      v-if="showModal">
      <h3 slot="header">이미지 등록</h3>
      <div slot="body">
        <!--image cropper-->
        <image-cropper 
          @do-crop="doCropped" />
        <!--// image cropper-->
      </div>
      <div slot="footer">
        <button class="btn btn-secondary" 
          @click="handleCancel">
          취소
        </button>
        <button class="btn btn-primary" 
          @click="handleImageUpload">
          확인
        </button>
      </div>
    </common-modal>
  </div>
</template>
<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import CommonModal from '@/components/CommonModal.vue';
import ImageCropper from '@/components/ImageCropper.vue';
import shortid from 'shortid';

@Component({
  components: {
    CommonModal,
    ImageCropper,
  },
})
export default class ImageView extends Vue {

  /** data */
  public cropImage: string;
  public tempCropImage!: string;
  public showModal: boolean = false;

  constructor() {
    super();
    this.cropImage = '';
    this.showModal = false;
  }

  /** methods */
  public openAddImageModal(): void {
    this.showModal = true;
  }
 
  // cropper에서 crop할 때 이벤트를 받아 이미지를 dataURL을 temp에 담아놓는다.
  public doCropped(cropImage: string): void {
    this.tempCropImage = cropImage;
  }

  // 취소한 경우 temp도 비워준다.
  public handleCancel(): void {
    this.showModal = false;
    this.tempCropImage = '';
  }

  public handleImageUpload(): void {
    this.showModal = false;
    
    // temp에 있는 이미지만 localstorage에 저장하기. crop을 하지 않은 이미지는 저장되지 않는다.
    if(this.tempCropImage) {
      localStorage.setItem('cropImage', this.tempCropImage);
      this.cropImage = this.tempCropImage;
    }
  }

  /** created */
  public created() {
    //localstorage에 저장되어있는 이미지 가져오기
    this.cropImage = localStorage.getItem('cropImage') || '';
  }
}
</script>
<style scoped>
.btn{margin-top: 1px;background:#9370db;color:#fff;border:none;position:relative;height:40px;font-size: 14px;padding:0 2em;}
.btn-secondary{color: #fff;background-color: #6c757d;border-color: #6c757d;margin-right: 8px}
.btn-primary{color: #fff;background-color: #9370db;border-color: #9370db}
.image_area{width:600px;margin:0 auto}
.image_area img{max-width: 100%;}
</style>

