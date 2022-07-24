import { Controller, Get, Inject, Post, UploadedFile, UploadedFiles, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { destionation } from 'src/multer/multer.storage';
import { UploadeFileMulter } from 'src/types';
import { FileTypeValidationPipe } from 'src/pipe/file-validation.pipe';
import { AcceptableExceptionFilter } from 'src/filter/not-acceptable.filter';
import { StudentService } from './student.service';
import { StudentEntity } from './student.entity';

@Controller('student')
export class StudentController {

    constructor(
        @Inject(StudentService) private studentService: StudentService
    ) { }


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
}