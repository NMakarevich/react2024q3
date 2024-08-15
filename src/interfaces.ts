export interface FormInterface {
  name: FormDataEntryValue;
  age: FormDataEntryValue;
  email: FormDataEntryValue;
  password: FormDataEntryValue;
  gender: FormDataEntryValue;
  accept_terms: FormDataEntryValue;
  picture: string | ArrayBuffer | null;
  country: FormDataEntryValue;
}
