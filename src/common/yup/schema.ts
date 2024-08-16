import { boolean, mixed, number, object, ref, string } from 'yup';

export const schema = object().shape({
  name: string()
    .required('Please enter name')
    .matches(/^[A-Z]/g, 'Name should be starts with capital letter'),
  age: number()
    .required('Please enter age')
    .positive('Age must be a positive integer'),
  email: string()
    .required('Please enter email address')
    .email('Please enter valid email'),
  password: string()
    .required('Please enter password')
    .matches(/(?=.*\d)/g, 'Should contain at least one number')
    .matches(/(?=.*[A-Z])/g, 'Should contain at least one uppercase letter')
    .matches(/(?=.*[a-z])/g, 'Should contain at least one lowercase letter')
    .matches(
      /(?=.*[@$!%*?&])/g,
      'Should contain at least one special character',
    ),
  password_confirmation: string()
    .required('Please enter password again')
    .oneOf([ref('password')], 'Passwords must match'),
  gender: string().required('Please select a gender'),
  country: string().required('Please select country'),
  picture: mixed<File | FileList>()
    .required()
    .test('fileFormat', 'File should have png or jpeg extension', (file) => {
      if (!file) return false;
      if (file instanceof FileList) return /(png|jpeg)$/.test(file[0]?.name);
      return file && /(png|jpeg)$/.test(file?.name);
    })
    .test('fileSize', 'File size must be less than 1MB', (file) => {
      if (!file) return false;
      if (file instanceof FileList) return file[0]?.size <= 1024000;
      return file && file?.size <= 1024000;
    }),
  accept_terms: boolean()
    .required('Please accept terms')
    .isTrue('Please accept terms'),
});
