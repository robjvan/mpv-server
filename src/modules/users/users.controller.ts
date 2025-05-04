import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  public getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Patch('/:id')
  public updateUserById(@Param('id') id: number, @Body() data: any) {
    return this.usersService.updateUserById(id, data);
  }

  @Delete('/:id')
  public deactivateUserById(@Param('id') id: number) {
    return this.usersService.deactivateUserById(id);
  }
}
