import shortid from 'shortid';
import moment from 'moment';
import { Todo } from './todo';

export class TodoList {
  public static allTodos: Todo[] = [];
  public createTodoItem(content: string): number {
    const newItem = new Todo(shortid.generate(), content, moment().format('YYYY-MM-DD HH:mm:ss'), false);
    const totalCount: number = TodoList.allTodos.push(newItem);
    return totalCount;
  }

  public allTodoItems(): Todo[] {
    return TodoList.allTodos;
  }
}
