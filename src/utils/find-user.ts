import { authLoginDto } from "src/auth/dto/auth-login.dto";
import { AdminEntity } from "src/auth/admin.entity";
import { HrEntity } from "src/hr/hr.entity";


export const findUser = async (data: authLoginDto): Promise<HrEntity | AdminEntity | null> => {
    const hr = await HrEntity.findOne({
        where: {
            email: data.email
        }
    })

    if (hr) {
        return hr
    }

    const admin = await AdminEntity.findOne({
        where: {
            email: data.email
        }
    })

    if (admin) {
        return admin
    }

    return null;
}

export const validateUser = async (token: string): Promise<AdminEntity | HrEntity | null> => {
    const hr = await HrEntity.findOne({
        where: {
            loggedIn: token
        }
    })

    if (hr) {
        return hr
    }

    const admin = await AdminEntity.findOne({
        where: {
            loggedIn: token
        }
    })

    if (admin) {
        return admin
    }

    return null;
}

export const emailAvailabilityConfirm = async (email: string): Promise<boolean> => {

    const hr = await HrEntity.findOne({
        where: {
            email: email
        }
    })

    if (hr) {
        return false;
    }

    const admin = await AdminEntity.findOne({
        where: {
            email: email
        }
    })

    if (admin) {
        return false
    }

    return true;

}