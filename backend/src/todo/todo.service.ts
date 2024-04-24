import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ChangeStatusDto,
  CreateTodoDto,
  EditTodoDto,
} from './dto';
@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  getAllTodos(userId: number) {
    return this.prisma.todo.findMany({
      where: { userId },
    });
  }

  getTodoById(userId: number, todoId: number) {
    return this.prisma.todo.findFirst({
      where: { userId, id: todoId },
    });
  }

  async createTodo(
    userId: number,
    dto: CreateTodoDto,
  ) {
    const todo = await this.prisma.todo.create({
      data: { userId, ...dto },
    });

    return todo;
  }

  async editTodo(
    userId: number,
    todoId: number,
    dto: EditTodoDto,
  ) {
    const todo =
      await this.prisma.todo.findUnique({
        where: {
          id: todoId,
        },
      });
    if (!todo || todo.userId !== userId)
      throw new ForbiddenException(
        'Access to resource denied',
      );

    return this.prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTodo(
    userId: number,
    todoId: number,
  ) {
    const todo =
      await this.prisma.todo.findUnique({
        where: { id: todoId },
      });

    if (!todo || todo.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
  }

  async checkPendingTodo(
    userId: number,
    todoId: number,
    dto: ChangeStatusDto,
  ) {
    const todo =
      await this.prisma.todo.findUnique({
        where: {
          id: todoId,
        },
      });
    if (!todo || todo.userId !== userId)
      throw new ForbiddenException(
        'Access to resource denied',
      );

    return this.prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        ...dto,
      },
    });
  }
}
