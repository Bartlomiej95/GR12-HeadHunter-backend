import { Controller,
    Get,
    Inject,
    Param,
    Patch,
    Post,
    UploadedFile,
    UploadedFiles,
    UseFilters,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { destionation } from 'src/multer/multer.storage';
import {ChangeStudentStatusResponse, StudentsSelectedByHrResponse, UploadeFileMulter} from 'src/types';
import { FileTypeValidationPipe } from 'src/pipe/file-validation.pipe';
import { AcceptableExceptionFilter } from 'src/filter/not-acceptable.filter';
import { StudentService } from './student.service';
import { StudentEntity } from './student.entity';
import { UserStatus } from 'src/types';
import { AuthGuard } from 'src/guards/Auth.guard';

@Controller('student')
export class StudentController {

    constructor(
        @Inject(StudentService) private studentService: StudentService
    ) { }

    @Get('/selected/:hrId')
    @UseGuards(AuthGuard)
    async studentsSelectedByHr(
        @Param('hrId') hrId: string
    ): Promise<StudentsSelectedByHrResponse>{
        return await this.studentService.studentsSelectedByHr(hrId);
    }


    @Post('/add')
    //@UseGuards(AuthGuard('jwt')) // do testów nieaktywne, jeszcze nie przetestowane
    @UseInterceptors(
        FileFieldsInterceptor([
            {
                name: 'file', maxCount: 1,
            }
        ], {
            dest: destionation(),
        })
    )
    @UseFilters(new AcceptableExceptionFilter())
    async uploadAndAddStudents(
        @UploadedFiles(
            new FileTypeValidationPipe()
        ) incomeFile: UploadeFileMulter,
    ) {
        try {

            await this.studentService.addStudentFromList(incomeFile);
            return {
                actionStatus: true,
                message: `Import zakończony pomyślnie`,
            }
        } catch (err) {
            console.log(err)
            return {
                actionStatus: false,
                message: `Błąd w trakcie importu kursantów`,
            }
        }
    }

    @Get('/freelist')
    async getFreeStudents() {
        try {
            const result = await this.studentService.getFreeStudnetList();
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

    @Patch('/:id/:status')
    //@UseGuards(AuthGuard('jwt')) // do testów nieaktywne, jeszcze nie przetestowane
    async changeStatus(
        @Param('id') id: string,
        @Param('status') status: UserStatus,
    ): Promise<ChangeStudentStatusResponse> {
        try {
            const result = await this.studentService.changeStatus(id, status);
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
