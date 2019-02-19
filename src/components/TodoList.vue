<template>
  <div>
    <ul class="todoList">
      <li v-for="todo in todoItems"
          :key="todo.id">
        <span>
          <label>
            <input type="checkbox"
              id="${todo.id}"
              v-model="todo.done"
              @change="doneTodo"
              ref=true>
            <span :class="{'done': todo.done}"> {{ todo.content }} </span>
          </label>
        </span>
        <span class="date">
          {{ todo.createdAt }}
        </span>
        <span>
          <button
            class="removeButton"
            @click="removeTodo(todo.id)">
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
  private todoItems!: Todo [];

  constructor() {
    super();
  }

  /** emit */
  @Emit('removeTodoItem')
  private removeTodoItem(id: string): void {
    this.$emit('remove-item', id);
  }
  @Emit('saveTodoItem')
  private doneTodoItem(): void {
    this.$emit('done-item');
  }

  /** created */
  private created() {
    console.log(this.todoItems);
  }

  /** methods */

  private doneTodo(): void {
    this.doneTodoItem();
  }

  private removeTodo(id: string): void {
    this.removeTodoItem(id);
  }

}
</script>
<style scoped>
  .done {
    text-decoration : line-through
  }
</style>

