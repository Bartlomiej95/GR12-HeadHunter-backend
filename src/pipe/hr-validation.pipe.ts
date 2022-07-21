import { ArgumentMetadata, Injectable, PipeTransform, NotAcceptableException } from "@nestjs/common";
import { HrDto } from "src/hr/dto/hr-add.dto";
import { emailAvailabilityConfirm } from "src/utils/find-user";



@Injectable()
export class NewHrUserValidation implements PipeTransform<HrDto, Promise<HrDto>> {

    async transform(data: HrDto, metadata: ArgumentMetadata): Promise<HrDto> {

        const emailAvailability = await emailAvailabilityConfirm(data.email)

        if (!emailAvailability) {
            throw new NotAcceptableException(Error, 'email already exist')
        };

        const correctEmail = data.email.includes('@');

        if (!correctEmail) {
            throw new NotAcceptableException(Error, 'incorrect email format')
        }

        if (data.fullName.length < 1 || data.company.length < 1) {
            throw new NotAcceptableException(Error, 'required filds are empty')
        }

        if (Number(data.maxReservedStudents) > 999 || Number(data.maxReservedStudents) < 1) {
            throw new NotAcceptableException(Error, 'invalid reserved studenst number')
        }

        return data;
    }
}