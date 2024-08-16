import '../styles.scss';
import { ValidationError } from 'yup';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountries } from '../../redux/slices/countries.slice.ts';
import { ReactNode, useState } from 'react';
import { addUncontrolledForm } from '../../redux/slices/forms.slice.ts';
import { useNavigate } from 'react-router-dom';
import PasswordStrength from '../password-strength/password-strength.tsx';
import { schema } from '../../common/yup/schema.ts';

interface ErrorsObj {
  [key: string]: string[];
}

export default function UncontrolledForm(): ReactNode {
  const [errors, setErrors] = useState<ErrorsObj>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(selectCountries);
  const [password, setPassword] = useState<string>('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    const accept_terms = !!formValues.accept_terms;

    try {
      schema.validateSync(
        { ...formValues, accept_terms },
        { abortEarly: false },
      );
      const reader = new FileReader();
      reader.readAsDataURL(event.currentTarget.picture.files[0]);
      reader.onload = () =>
        dispatch(
          addUncontrolledForm({
            accept_terms,
            age: formValues.age,
            country: formValues.country,
            email: formValues.email,
            gender: formValues.gender,
            name: formValues.name,
            password: formValues.password,
            picture: reader.result,
          }),
        );
      navigate('/');
    } catch (error) {
      if (error instanceof ValidationError) {
        setPassword(formValues.password.toString());
        setErrors(
          error.inner.reduce((acc: ErrorsObj, err) => {
            if (err.path) {
              if (!acc[err.path]) acc[err.path] = [];
              acc[err.path].push(err.message);
            }
            return acc;
          }, {}),
        );
      }
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Name:</label>
        <input className="input-field" type="text" id="name" name="name" />
        <div className="errors">
          {errors?.name ? errors.name.join('; ') : ' '}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="age">Age:</label>
        <input className="input-field" type="number" id="age" name="age" />
        <div className="errors">
          {errors?.age ? errors.age.join('; ') : ' '}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="email">Email:</label>
        <input className="input-field" type="email" id="email" name="email" />
        <div className="errors">
          {errors?.email ? errors.email.join('; ') : ' '}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="password">Password:</label>
        <input
          className="input-field"
          type="password"
          id="password"
          name="password"
        />
        <PasswordStrength password={password} />
        <div className="errors errors_password">
          {errors?.password ? generatePasswordError(errors.password) : ' '}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="password_confirmation">Confirm Password:</label>
        <input
          className="input-field"
          type="password"
          id="password_confirmation"
          name="password_confirmation"
        />
        <div className="errors">
          {errors?.password_confirmation
            ? errors.password_confirmation.join('; ')
            : ' '}
        </div>
      </div>
      <div className="form-group form-group_gender">
        <span className="form-group_title">Gender:</span>
        <div className="form-group_inner">
          <div className="form-field_gender">
            <label htmlFor="gender_male">Male</label>
            <input type="radio" id="gender_male" name="gender" value="male" />
          </div>
          <div className="form-field_gender">
            <label htmlFor="gender_female">Female</label>
            <input
              type="radio"
              id="gender_female"
              name="gender"
              value="female"
            />
          </div>
        </div>
        <div className="errors">
          {errors?.gender ? errors.gender.join('; ') : ' '}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <div className="form-field form-field_country">
          <input
            className="input-field"
            type="text"
            id="country"
            name="country"
            list="country-list"
          />
          <datalist className="cointry-list" id="country-list">
            {countries.map((country) => (
              <option key={country} value={country}></option>
            ))}
          </datalist>
        </div>
        <div className="errors">
          {errors?.country ? errors.country.join('; ') : ' '}
        </div>
      </div>
      <div className="form-field form-field_file">
        <label className="form-btn label-file" htmlFor="picture">
          Upload picture
        </label>
        <input className="input-file" type="file" id="picture" name="picture" />
        <div className="errors">
          {errors?.picture ? errors.picture.join('; ') : ' '}
        </div>
      </div>
      <div className="form-group">
        <div className="form-field form-field_accept">
          <input
            type="checkbox"
            id="accept_terms"
            name="accept_terms"
            value="accept_terms"
            defaultChecked={false}
          />
          <label htmlFor="accept_terms">
            I accept Terms and Conditions agreement
          </label>
        </div>
        <div className="errors">
          {errors?.accept_terms ? errors.accept_terms.join('; ') : ' '}
        </div>
      </div>
      <button className="form-btn form-submit" type="submit">
        Submit
      </button>
    </form>
  );
}

function generatePasswordError(errors: string[]) {
  return [
    ...errors.filter((message) => !message.startsWith('Should')),
    `Password should contain at least:${errors
      .filter((message) => message.startsWith('Should'))
      .map((should) => should.replace('Should contain at least', ''))
      .join(',')}`,
  ].join('; ');
}
