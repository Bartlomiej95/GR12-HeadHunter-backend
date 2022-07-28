import { Body, Controller, Get, Inject, Param, Post, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from 'src/guards/Auth.guard';
import { AcceptableExceptionFilter } from 'src/filter/not-acceptable.filter';
import { NewHrUserValidation } from 'src/pipe/hr-validation.pipe';
import { AfterAddData } from 'src/types';
import { HrDto } from './dto/hr-add.dto';
import { HrService } from './hr.service';
import { UserObject } from 'src/decorators/user-object.decorator';
import { UserEntity } from 'src/auth/user.entity';

@Controller('recruiter')
export class HrController {
    constructor(
        @Inject(HrService) private hrService: HrService
    ) { }


    @Post('/add')
    //@UseGuards(AuthGuard()) ścieżka będzie autoryzowana dla admina narazie do testów nie musi być 
    @UsePipes(NewHrUserValidation)
    @UseFilters(new AcceptableExceptionFilter())
    async addRecruiterAccount(
        @Body() hrData: HrDto
    ): Promise<AfterAddData> {
        try {
            const response = await this.hrService.addHrUser(hrData);
            return response;
        } catch (err) {
            console.log(err);
            return {
                actionStatus: false,
                message: err.message
            }
        }
    }

    @Get('/addstudent/:id')
    @UseGuards(AuthGuard)
    async addStudentToList(
        @UserObject() user: UserEntity,
        @Param('id') id: string
    ) {
        return await this.hrService.AddStudentToList(user, id);
    }

    @Get('/:hrid/student/:stid')
    // @UseGuards(AuthGuard)
    async getStudentCV(
        @Param('hrid') hrId: string,
        @Param('stid') studentId: string
    ): Promise<any> {
        try {
            const result = await this.hrService.getStudentCV(hrId, studentId);
            return {
                actionStatus: true,
                data: result
            }
        } catch (err) {
            console.log(err)
            return {
                actionStatus: false,
                data: null
            }
        }
    }

}
