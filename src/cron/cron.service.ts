import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
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

  @Cron('0 7 * * 1-5', {
    name: 'changeStudentStatus',
    timeZone: 'Europe/Paris',
  })
  async sendReminderToStudents() {
    await this.StudentService.sendReminder();
  }
}
