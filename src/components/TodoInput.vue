<template>
  <div>
    <input type="text"
      class="todoInput"
      v-model="content"
      v-on:keyup.enter="addTodo"
      maxlength="50"
      required />
    <button
      v-on:click="addTodo">
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
  private _submit(): void {
    this.$emit('add-item', this.content);
  }

  /** methods */
  private addTodo($event: Event): void {
    if (!/.+/.test(this.content.trim())) {
      alert('글자를 입력 해 주세요!');
      this.content = '';
      return;
    } else if(this.content.trim().length > 50) {
      alert('50자 까지 입력할 수 있습니다.');
      return;
    } else {
      console.log(this.content);
      this._submit();
      this._clearInput();
    }
  }

  private _clearInput(): void {
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