import { Injectable } from '@nestjs/common';
import { safetyConfiguration } from 'config';
import { AfterAddData } from 'src/types';
import { randomSigns } from 'src/utils/random-signs';
import { HrDto } from './dto/hr-add.dto';
import { HrEntity } from './hr.entity';
import { Role } from 'src/types';
import { sendActivationLink } from 'src/utils/email-handler';

@Injectable()
export class HrService {

    async addHrUser(data: HrDto): Promise<AfterAddData> {

        const hr = new HrEntity();

        hr.email = data.email;
        hr.company = data.company;
        hr.fullName = data.fullName;
        hr.maxReservedStudents = data.maxReservedStudents;
        hr.link = randomSigns(safetyConfiguration.linkLength);
        hr.role = Role.recruiter

        await hr.save()

        await sendActivationLink(hr.link, hr.email);

        return {
            actionStatus: true,
            message: 'hr user added',
        }
    }
}
