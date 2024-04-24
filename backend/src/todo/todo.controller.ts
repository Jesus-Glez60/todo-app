import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

import {
  ChangeStatusDto,
  CreateTodoDto,
  EditTodoDto,
} from './dto';
import { TodoService } from './todo.service';

@UseGuards(JwtGuard)
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAllTodos(@GetUser('id') userId: number) {
    return this.todoService.getAllTodos(userId);
  }

  @Get(':id')
  getTodoById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) todoId: number,
  ) {
    return this.todoService.getTodoById(
      userId,
      todoId,
    );
  }
  @Post()
  createTodo(
    @GetUser('id') userId: number,
    @Body() dto: CreateTodoDto,
  ) {
    return this.todoService.createTodo(
      userId,
      dto,
    );
  }

  @Patch(':id')
  editTodo(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) todoId: number,
    @Body() dto: EditTodoDto,
  ) {
    return this.todoService.editTodo(
      userId,
      todoId,
      dto,
    );
  }

  @Delete(':id')
  deleteTodo(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) todoId: number,
  ) {
    this.todoService.deleteTodo(userId, todoId);
  }

  @Put(':id')
  checkPendingTodo(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) todoId: number,
    @Body() dto: ChangeStatusDto,
  ) {
    this.todoService.checkPendingTodo(
      userId,
      todoId,
      dto,
    );
  }
}
