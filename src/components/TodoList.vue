<template>
  <div>
    <ul class="todoList">
      <li
        v-for="todo in todoItems"
        :key="todo.id">
        <span>
          <label>
            <input
              type="checkbox"
              id="${todo.id}"
              v-model="todo.done"
              @change="doneTodo"
              ref=true
            >
            <span :class="{'done': todo.done}"> {{ todo.content }} </span>
          </label>
        </span>
        <span class="date">
          {{ todo.createdAt }}
        </span>
        <span>
          <button
            class="removeButton"
            v-on:click="removeTodo(todo.id)">
            삭제
          </button>
        </span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
import { Todo } from '@/model/todo';

@Component({})
export default class TodoList extends Vue {
  @Prop()
  public todoItems!: Todo [];

  constructor() {
    super();
  }

  /** emit */
  @Emit('removeTodoItem')
  private _removeTodoItem(id: string): void {
    this.$emit('remove-item', id);
  }
  @Emit('saveTodoItem')
  private _doneTodoItem(): void {
    this.$emit('done-item');
  }

  /** created */
  private created() {
    console.log(this.todoItems);
  }

  /** methods */

  public doneTodo(): void {
    this._doneTodoItem();
  }

  private removeTodo(id: string): void {
    this._removeTodoItem(id);
  }

}
</script>
<style scoped>
  .done {
    text-decoration : line-through
  }
</style>

