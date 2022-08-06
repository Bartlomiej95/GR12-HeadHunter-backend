import { forwardRef, Module } from "@nestjs/common";
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { HttpModule } from '@nestjs/axios';
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    forwardRef(() => MailModule),
  ],
  providers: [StudentService],
  controllers: [StudentController],
  exports: [StudentService],
})
export class StudentModule {}
