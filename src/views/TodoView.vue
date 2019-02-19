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
  private todoItems: Todo [];

  constructor() {
    super();
    this.todoItems = [];
  }

  /** methods */
  private addTodoItem(content: string) {
    const todo: Todo = this.makeTodoInstance(content);
    this.todoItems.push(todo);
    this.saveLocalStorage();
  }

  private removeTodoItem(id: string) {
    this.todoItems = this.todoItems.filter((val) => val['id'] !== id);
    this.saveLocalStorage();
  }

  private saveTodoItem() {
    this.saveLocalStorage();
  }

  private saveLocalStorage() {
    localStorage.setItem('todoItems', JSON.stringify(this.todoItems));
  }

  private makeTodoInstance(content: string): Todo {
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

