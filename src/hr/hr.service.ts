import { Injectable } from '@nestjs/common';
import { safetyConfiguration } from 'config';
import { AfterAddData } from 'src/types';
import { randomSigns } from 'src/utils/random-signs';
import { HrDto } from './dto/hr-add.dto';
import { HrEntity } from './hr.entity';
import { Role } from 'src/types';
import { sendActivationLink } from 'src/utils/email-handler';
import { UserEntity } from 'src/auth/user.entity';

@Injectable()
export class HrService {

    async addHrUser(data: HrDto): Promise<AfterAddData> {

        const user = new UserEntity();

        user.email = data.email;
        user.link = randomSigns(safetyConfiguration.linkLength);
        user.role = Role.recruiter

        await user.save()

        const hr = new HrEntity()
        hr.company = data.company;
        hr.fullName = data.fullName;
        hr.maxReservedStudents = data.maxReservedStudents;
        hr.user = user;

        await hr.save()

        await sendActivationLink(user.link, 'recruiter', user.email);

        return {
            actionStatus: true,
            message: 'Rekruter dodany',
        }
    }
}
