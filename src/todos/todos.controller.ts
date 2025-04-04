import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, CreateTodoManyDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Payload } from 'src/interfaces/payload';
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req: Payload) {
    createTodoDto.user_id = req.User.id;
    return this.todosService.create(createTodoDto);
  }

  @Post('many')
  createMany(@Body() createTodoDto: CreateTodoManyDto) {
    return this.todosService.createMany(createTodoDto.data);
  }

  @Get()
  findAll(@Req() req: Payload) {
    return this.todosService.findAll(req.User.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
