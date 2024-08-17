export interface UncontrolledFormInterface {
  name: FormDataEntryValue;
  age: FormDataEntryValue;
  email: FormDataEntryValue;
  password: FormDataEntryValue;
  gender: FormDataEntryValue;
  accept_terms: boolean;
  picture: string | ArrayBuffer | null;
  country: FormDataEntryValue;
}

export interface ControlledFormInterface extends FormData {
  picture: FileList | File | undefined;
}

export interface ControlledFormStoreInterface extends FormData {
  picture: ArrayBuffer | string | null;
}

interface FormData {
  accept_terms: boolean;
  age: number;
  country: string;
  email: string;
  gender: string;
  name: string;
  password: string;
  password_confirmation: string;
}
