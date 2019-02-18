<template>
  <div>
    <todo-input
      @add-item="addTodoItem" />
    <todo-list
      :todoItems="todoItems"
      @remove-item="removeTodoItem"
      @done-item="saveTodoItem" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TodoInput from '@/components/TodoInput.vue';
import TodoList from '@/components/TodoList.vue';
import shortid from 'shortid';
import moment from 'moment';
import { Todo } from '@/model/todo';

@Component({
  components: {
    TodoInput,
    TodoList,
  },
})
export default class TodoView extends Vue {
  /** data */
  public todoItems: Todo [];

  constructor() {
    super();
    this.todoItems = [];
  }

  /** methods */
  public addTodoItem(content: string) {
    const todo: Todo = this._makeTodoInstance(content);
    this.todoItems.push(todo);
    this._saveLocalStorage();
  }

  public removeTodoItem(id: string) {
    this.todoItems = this.todoItems.filter((val) => val['id'] !== id);
    this._saveLocalStorage();
  }

  public saveTodoItem() {
    this._saveLocalStorage();
  }

  private _saveLocalStorage() {
    localStorage.setItem('todoItems', JSON.stringify(this.todoItems));
  }

  private _makeTodoInstance(content: string): Todo {
    const todo = new Todo(
      shortid.generate(),
      content,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      false,
    );
    return todo;
  }

  /** created
   *  localStorage에 있는 todoItems 미리 호출
   */
  private created() {
    if (localStorage.getItem('todoItems')) {
      this.todoItems = JSON.parse(localStorage.getItem('todoItems') || '') || [];
    }
  }
}
</script>
<style scoped>
</style>

