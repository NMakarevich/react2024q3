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
