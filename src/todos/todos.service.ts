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

  async findAll(user_id: number) {
    return this.prisma.todo.findMany({
      where: {
        user_id,
      },
    });
  }

  async findOne(id: number, user_id: number) {
    const todo = await this.prisma.todo.findUnique({
      where: { id, user_id },
    });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    await this.findOne(id, updateTodoDto.user_id as number);
    return this.prisma.todo.update({
      where: { id, user_id: updateTodoDto.user_id },
      data: updateTodoDto,
    });
  }

  async remove(id: number, user_id: number) {
    await this.findOne(id, user_id);
    return this.prisma.todo.delete({
      where: { id, user_id },
    });
  }
}
