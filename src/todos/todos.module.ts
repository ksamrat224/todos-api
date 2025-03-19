import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [TodosController],
  providers: [TodosService, PrismaClient],
})
export class TodosModule {}
