<template>
  <div>
    <button class="btn btn-primary"
      @click="showModal = true">
      이미지 등록하기!
    </button>
    <div class="imageContainer">
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

  public openAddImageModal(): void {
    this.showModal = true;
  }

  public doCropped(cropImage: string): void {
    this.tempCropImage = cropImage;
  }

  public handleCancel(): void {
    this.showModal = false;
    this.tempCropImage = '';
    if(typeof FileReader === 'function') {
      console.log(FileReader);
    }
  }
  public handleImageUpload(): void {
    this.showModal = false;
    console.log('imageuploadHandle');
    // localstorage에 저장하기.
    if(this.tempCropImage) {
      localStorage.setItem('cropImage', this.tempCropImage);
      this.cropImage = this.tempCropImage;
    }
  }

  public created() {
    //localstorage에 저장되어있는 이미지 가져오기
    this.cropImage = localStorage.getItem('cropImage') || '';
  }
}
</script>
<style scoped>
.btn {
    outline:none;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    text-transform: none;
    vertical-align: middle;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    cursor: pointer;
}
.btn-secondary {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
    margin-right: 8px;
}
.btn-primary {
    color: #fff;
    background-color: #9370db;
    border-color: #9370db;
}

img { max-width: 100%;}
</style>

