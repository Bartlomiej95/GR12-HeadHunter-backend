import { Body, Controller, Inject, Post, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AcceptableExceptionFilter } from 'src/filter/not-acceptable.filter';
import { NewHrUserValidation } from 'src/pipe/hr-validation.pipe';
import { AfterAddData } from 'src/types';
import { HrDto } from './dto/hr-add.dto';
import { HrService } from './hr.service';

@Controller('recruiter')
export class HrController {
    constructor(
        @Inject(HrService) private hrService: HrService
    ) { }


    @Post('/add')
    //@UseGuards(AuthGuard('jwt')) ścieżka będzie autoryzowana dla admina narazie do testów nie musi być 
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

}
