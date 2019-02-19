
interface ITodo {
  id: string;
  content: string;
  createdAt: string;
  done: boolean;
}
export class Todo implements ITodo {
  public id: string;
  public content: string;
  public createdAt: string;
  public done: boolean;

  constructor(id: string, content: string, createdAt: string, done: boolean) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.done = done;
  }
}
