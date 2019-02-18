export class Todo {
  private id: string;
  private content: string;
  private createdAt: string;
  private done: boolean;

  constructor(id: string, content: string, createdAt: string, done: boolean) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.done = done;
  }
}
