export enum ExpectedTypeWork {
  AT_LOCATION = 'atLocation',
  CHANGE_OF_LOCATION = 'changeOfLocation',
  MANUAL = 'manual',
  IRRELEVANT = 'irrelevant',
}

export enum ExpectedContractType {
  UoP = 'UoP',
  B2B = 'B2B',
  UZ_UoD = 'UZ/UoD',
  IRRELEVANT = 'irrelevant',
}

export interface UserRegisterType {
  id: string;
  password: string;
  email: string;
  tel: number;
  firstName: string;
  lastName: string;
  githubUsername: string;
  portfolioUrls: string[];
  projectUrls: string[];
  bio: string;
  expectedTypeWork: ExpectedTypeWork;
  targetWorkCity: string;
  expectedContractType: ExpectedContractType;
  expectedSalary: number | null;
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
  education: string | null;
  workExperience: string;
  courses: string;
}
