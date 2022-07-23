import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  providers: [StudentService, JwtStrategy],
  controllers: [StudentController]
})
export class StudentModule {}
