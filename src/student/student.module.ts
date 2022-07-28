import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.registerAsync({
    useFactory: () => ({
      timeout: 5000,
      maxRedirects: 5,
    })
  })],
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
