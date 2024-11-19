import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors, ClassSerializerInterceptor, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/currentUser.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService,
        private authService: AuthService
    ) { }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password)
        session.userId = user.id

        return user

    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password)
        session.userId = user.id

        return user

    }

    @Get('/whoAmI')
    getUser(@Session() session: any) {
        if(!session.userId){
            throw new NotFoundException('you are not logged in')
        }
        return this.usersService.findOne(session.userId)

    }

    @Get('/whoAmI2')
    whoAmI(@CurrentUser() user: User){
        return user

    }

    @Post('/signOut')
    signOut(@Session() session: any) {
        session.userId = null
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log('handler is running')
        const user = await this.usersService.findOne(+id)
        if (!user) {
            throw new NotFoundException('user not found')
        }
        return user
    }


    @UseGuards(AuthGuard)
    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(+id)
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(+id, body)

    }

}
