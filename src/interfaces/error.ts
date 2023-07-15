export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
