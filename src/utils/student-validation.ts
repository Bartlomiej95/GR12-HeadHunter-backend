import { UserEntity } from 'src/auth/user.entity';
import { UserImport } from 'src/types';
import {
  ExpectedContractType,
  ExpectedTypeWork,
  StudentSupplementing,
} from '../types/student/student.supplementing';

export const studentDataValidator = async (
  data: UserImport,
): Promise<boolean> => {
  const result = await UserEntity.find({
    where: {
      email: data.email,
    },
  });

  if (result.length > 0) {
    return false;
  }

  if (data.courseCompletion > 5 || data.courseCompletion < 1) {
    return false;
  }

  if (data.courseEngagement > 5 || data.courseEngagement < 1) {
    return false;
  }

  if (data.projectDegree > 5 || data.projectDegree < 1) {
    return false;
  }

  if (data.teamProjectDegree > 5 || data.teamProjectDegree < 1) {
    return false;
  }

  return true;
};

export class ReturnValid {
  validError: boolean;
  data: string[];
}

export const studentSupplementingValidator = async (
  data: StudentSupplementing,
): Promise<ReturnValid> => {
  const ValidError: string[] = [];

  for (const [key] of Object.entries(data)) {
    switch (key) {
      case 'tel':
        if (typeof data.tel !== 'number' && typeof data.tel !== null) {
          ValidError.push('Phone number');
        }
        break;
      case 'firstName':
        if (
          typeof data.firstName !== 'string' &&
          typeof data.firstName !== null
        ) {
          ValidError.push('First name');
        }
        break;

      case 'lastName':
        if (
          typeof data.lastName !== 'string' &&
          typeof data.lastName !== null
        ) {
          ValidError.push('Last name');
        }
        break;
      case 'githubUsername':
        if (
          typeof data.githubUsername !== 'string' &&
          typeof data.githubUsername !== null
        ) {
          ValidError.push('Github username');
        }
        break;
      case 'bio':
        if (typeof data.bio !== 'string' && typeof data.bio !== null) {
          ValidError.push('Biography');
        }
        break;
      case 'expectedTypeWork':
        if (
          !Object.values(ExpectedTypeWork).includes(data.expectedTypeWork) &&
          typeof data.expectedTypeWork !== null
        ) {
          ValidError.push('Expected type work');
        }
        break;
      case 'targetWorkCity':
        if (
          typeof data.targetWorkCity !== 'string' &&
          typeof data.targetWorkCity !== null
        ) {
          ValidError.push('target work city');
        }
        break;

      case 'expectedContractType':
        if (
          !Object.values(ExpectedContractType).includes(
            data.expectedContractType,
          ) &&
          typeof data.expectedContractType !== null
        ) {
          ValidError.push('Expected contract type');
        }
        break;
      case 'expectedSalary':
        if (
          typeof data.expectedSalary !== 'string' &&
          typeof data.expectedSalary !== null
        ) {
          ValidError.push('Expected salary');
        }
        break;
      case 'canTakeApprenticeship':
        if (
          typeof data.canTakeApprenticeship !== 'boolean' &&
          typeof data.canTakeApprenticeship !== null
        ) {
          ValidError.push('Can take apprenticeship');
        }
        break;
      case 'monthsOfCommercialExp':
        if (
          typeof data.monthsOfCommercialExp !== 'number' &&
          typeof data.monthsOfCommercialExp !== null
        ) {
          ValidError.push('Months of commercial experience');
        }
        break;
      case 'education':
        if (
          typeof data.education !== 'string' &&
          typeof data.education !== null
        ) {
          ValidError.push('Education');
        }
        break;
      case 'workExperience':
        if (
          typeof data.workExperience !== 'string' &&
          typeof data.workExperience !== null
        ) {
          ValidError.push('Work experience');
        }
        break;

      case 'courses':
        if (typeof data.courses !== 'string' && typeof data.courses !== null) {
          ValidError.push('Courses');
        }
        break;
      case 'portfolioUrls':
        if (
          typeof data.portfolioUrls !== 'string' &&
          typeof data.portfolioUrls !== null
        ) {
          ValidError.push('Portfolio urls');
        }
        break;
      case 'projectUrls':
        if (
          typeof data.projectUrls !== 'string' &&
          typeof data.projectUrls !== null
        ) {
          ValidError.push('Project urls');
        }
        break;
      default:
        break;
    }
  }

  if (ValidError.length === 0) {
    return {
      validError: false,
      data: null,
    };
  } else {
    return {
      validError: true,
      data: ValidError,
    };
  }
};
