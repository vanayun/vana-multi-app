<template>
  <div>
    <input type="text"
      class="todoInput"
      v-model="content"
      @keyup.enter="addTodo"
      maxlength="50"
      required />
    <button
      @click="addTodo">
      등록하기</button>
  </div>
</template>
<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';

@Component({})
export default class TodoInput extends Vue {
  /** data */
  private content!: string;

  constructor() {
    super();
    this.content = '';
  }

  /** emit */
  @Emit('addTodoItem')
  private submit(): void {
    this.$emit('add-item', this.content);
  }

  /** methods */
  private addTodo($event: Event): void {
    if (!/.+/.test(this.content.trim())) {
      alert('글자를 입력 해 주세요!');
      this.content = '';
      return;
    } else {
      console.log(this.content);
      this.submit();
      this.clearInput();
    }
  }

  private clearInput(): void {
    this.content = '';
  }
}
</script>
<style scoped>
  input:focus {
    outline: none;
  }

  .todoInput {
    width: 350px;
    height: 34px;
    font-size: 14px;
  }

  button{
    margin-top: 1px;
    background:#9370db;
    color:#fff;
    border:none;
    position:relative;
    height:40px;
    font-size: 14px;
    padding:0 2em;
    cursor:pointer;
    transition:800ms ease all;
    outline:none;
  }
  button:hover{
    background:#fff;
    color:#9370db;
  }
  button:before,button:after{
    content:'';
    position:absolute;
    top:0;
    right:0;
    height:2px;
    width:0;
    background: #9370db;
    transition:400ms ease all;
  }
  button:after{
    right:inherit;
    top:inherit;
    left:0;
    bottom:0;
  }
  button:hover:before,button:hover:after{
    width:100%;
    transition:800ms ease all;
  }
</style>