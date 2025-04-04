import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TodosService {
  //Dependency Injection
  constructor(private readonly prisma: PrismaClient) {}

  async create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: createTodoDto,
    });
  }
  async createMany(createTodoDto: CreateTodoDto[]) {
    return this.prisma.todo.createMany({
      data: createTodoDto,
    });
  }

  async findAll() {
    return this.prisma.todo.findMany();
  }

  async findOne(id: number) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    await this.findOne(id);
    return this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
