export class User {
  public id: string;
  public name: string;
  public lastName: string;
  public age: number;
  public height: number;
  public weight: number;

  constructor(
    data: Partial<User>
  ) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.lastName = data.lastName || '';
    this.age = data.age || 0;
    this.height = data.height || 0;
    this.weight = data.weight || 0;
  }

  fullName(): string {
    return `${this.lastName} ${this.name}`
  }
}
