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

export interface StudentSupplementing {
  tel: number | null;
  firstName: string | null;
  lastName: string | null;
  githubUsername: string | null;
  bio: string | null;
  expectedTypeWork: ExpectedTypeWork | null;
  targetWorkCity: string | null;
  expectedContractType: ExpectedContractType | null;
  expectedSalary: string | null;
  canTakeApprenticeship: boolean | null;
  monthsOfCommercialExp: number | null;
  education: string | null;
  workExperience: string | null;
  courses: string | null;
  portfolioUrls: string | null;
  projectUrls: string | null;
}
