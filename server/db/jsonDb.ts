import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");

// Ensure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export class Collection<T extends { id: string; createdAt?: string; updatedAt?: string }> {
  private filePath: string;

  constructor(private name: string, private defaultData: T[] = []) {
    this.filePath = path.join(DATA_DIR, `${name}.json`);
    this.init();
  }

  private init() {
    if (!fs.existsSync(this.filePath)) {
      this.write(this.defaultData);
    }
  }

  private read(): T[] {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }
      const content = fs.readFileSync(this.filePath, "utf-8");
      return JSON.parse(content) as T[];
    } catch (error) {
      console.error(`Error reading database file: ${this.filePath}`, error);
      return [];
    }
  }

  private write(data: T[]): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.error(`Error writing database file: ${this.filePath}`, error);
    }
  }

  async find(filter?: Partial<T>): Promise<T[]> {
    const items = this.read();
    if (!filter) return items;

    return items.filter((item) => {
      for (const key in filter) {
        if (item[key] !== filter[key]) return false;
      }
      return true;
    });
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    const items = this.read();
    const found = items.find((item) => {
      for (const key in filter) {
        if (item[key] !== filter[key]) return false;
      }
      return true;
    });
    return found || null;
  }

  async findById(id: string): Promise<T | null> {
    const items = this.read();
    return items.find((item) => item.id === id) || null;
  }

  async create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    const items = this.read();
    const timestamp = new Date().toISOString();
    const newItem = {
      ...data,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: timestamp,
      updatedAt: timestamp,
    } as unknown as T;

    items.push(newItem);
    this.write(items);
    return newItem;
  }

  async findByIdAndUpdate(id: string, update: Partial<Omit<T, "id">>): Promise<T | null> {
    const items = this.read();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const timestamp = new Date().toISOString();
    const updatedItem = {
      ...items[index],
      ...update,
      updatedAt: timestamp,
    } as T;

    items[index] = updatedItem;
    this.write(items);
    return updatedItem;
  }

  async findByIdAndDelete(id: string): Promise<boolean> {
    const items = this.read();
    const initialLength = items.length;
    const filtered = items.filter((item) => item.id !== id);
    this.write(filtered);
    return filtered.length < initialLength;
  }
}
