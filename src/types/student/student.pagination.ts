export class StudentPagination {
  take?: number; //ilość obiektów na stronie
  page?: number; //aktualna strona
  sort?:
    | 'firstName'
    | 'lastName'
    | 'courseCompletion'
    | 'courseEngagment'
    | 'projectDegree'
    | 'teamProjectDegree'
    | 'expectedTypeWork'
    | 'targetWorkCity'
    | 'expectedSalary'
    | 'canTakeApprenticeship'
    | 'monthsOfCommercialExp'; //nazwy pól, po których można sortować
  sortBy: 'ASC' | 'DESC' | ''; //rosnąco lub malejąco, pusty string nie sortuje
}
