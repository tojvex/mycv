import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize} from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.usersService.create(body.email, body.password)
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log('handler is running')
        const user  = await this.usersService.findOne(+id)
        if(!user){
            throw new NotFoundException('user not found')
        }
        return user
    }

    @Get()
    findAllUsers(@Query('email') email: string ){
        return this.usersService.find(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string){
        return this.usersService.remove(+id)
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
        return this.usersService.update(+id, body)

    }

}
