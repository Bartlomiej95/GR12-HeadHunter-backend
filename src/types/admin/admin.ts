export interface Admin {
  id: string;
  email: string;
  password: string;
}

export interface AfterAddData {
  actionStatus: boolean;
  message: string;
}
