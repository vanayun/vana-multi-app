<template>
  <div class="todo_list">
    <ul>
      <li v-for="todo in todoItems"
          :key="todo.id">
          <div class="display_table_type todo_list_type">
            <div style="width:18px">
              <label>
                <input type="checkbox"
                  id="${todo.id}"
                  v-model="todo.done"
                  @change="doneTodo"
                  ref=true>
              </label>
            </div>
            <div class="content">
              <div :class="{'done': todo.done}"> 
                {{ todo.content }} 
              </div>
              <span class="date">
                {{ todo.createdAt }}
              </span>
            </div>
            <div class="btn_group" style="width:35px">
              <button
                class="btn_remove"
                @click="removeTodo(todo.id)">
                삭제
              </button>
            </div>
          </div>
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

  /** data */
  public doneFlag: boolean = false;

  constructor() {
    super();
  }

  /** emit */
  @Emit('saveTodoItem')
  public doneTodoItem(): void {
    this.$emit('done-item');
  }
  @Emit('removeTodoItem')
  public removeTodoItem(id: string): void {
    this.$emit('remove-item', id);
  }

  /** methods */
  public doneTodo(): void {
    this.doneTodoItem();
  }

  public removeTodo(id: string): void {
    this.removeTodoItem(id);
  }
}
</script>
<style scoped>
  .todo_list {margin-top:15px}
  .todo_list li{font-size:16px;color:#666;text-align:left}
  .todo_list li + li{padding-top:5px;border-top: 1px solid #ddd}
  .todo_list .done {text-decoration: line-through}
  .todo_list .date {font-size: 12px}

  .display_table_type{display:table;width:100%;table-layout:fixed}
  .display_table_type > div{display:table-cell;text-align:left;vertical-align:top}
  .display_table_type > div.content{padding-left: 10px;word-break:break-all}
</style>

