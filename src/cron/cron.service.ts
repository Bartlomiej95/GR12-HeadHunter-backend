import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from "@nestjs/schedule";
import { StudentService } from 'src/student/student.service';

@Injectable()
export class CronService {
  constructor(private StudentService: StudentService) {}

  @Cron('55 23 * * *', {
    name: 'changeStudentStatus',
    timeZone: 'Europe/Paris',
  })
  async changeStudentStatus() {
    await this.StudentService.removeReservation();
  }

  @Cron(CronExpression.EVERY_DAY_AT_7AM)
  async sendReminderToStudents() {
    await this.StudentService.sendReminder();
  }
}
