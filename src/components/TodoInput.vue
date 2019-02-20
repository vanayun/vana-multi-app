<template>
  <div>
    <input type="text"
      class="todo_input"
      v-model="content"
      @keyup.enter="addTodo"
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
  public content!: string;

  constructor() {
    super();
    this.content = '';
  }

  /** emit */
  @Emit('addTodoItem')
  public submit(): void {
    this.$emit('add-item', this.content);
  }

  /** methods */
  public addTodo($event: Event): void {
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

  public clearInput(): void {
    this.content = '';
  }
}
</script>
<style scoped>
  input:focus {
    outline: none;
  }

  .todo_input {width: 489px;height: 40px;padding:0 10px; font-size: 14px;}

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
    outline:none;
  }
</style>