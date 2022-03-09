export interface Documents {
  position: number;
  id: string;
  docCode: string;
  docDate: string;
  docName: string;
  docType: string;
  address: string;
  status: string;
  isSpecial: boolean;
  author: Author;
  isEdit?: boolean;
}

export interface Author {
  account: string;
  fio: string;
  post: string;
}
