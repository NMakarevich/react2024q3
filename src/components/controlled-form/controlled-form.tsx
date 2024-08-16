import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../common/yup/schema.ts';
import PasswordStrength from '../password-strength/password-strength.tsx';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountries } from '../../redux/slices/countries.slice.ts';
import { addControlledForm } from '../../redux/slices/forms.slice.ts';
import { useNavigate } from 'react-router-dom';
import { ControlledFormInterface } from '../../interfaces.ts';

export default function ControlledForm(): React.ReactNode {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const [password, setPassword] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  function handleSelectFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    }
  }

  function onSubmitHandler(data: ControlledFormInterface) {
    if (data.picture instanceof FileList) {
      const reader = new FileReader();
      reader.readAsDataURL(data.picture[0]);
      reader.onload = () => {
        dispatch(addControlledForm({ ...data, picture: reader.result }));
        navigate('/');
      };
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="form-field">
        <label htmlFor="name">Name:</label>
        <input
          {...register('name')}
          className="input-field"
          type="text"
          id="name"
          name="name"
        />
        <div className="errors">{errors.name?.message}</div>
      </div>
      <div className="form-field">
        <label htmlFor="age">Age:</label>
        <input
          {...register('age')}
          className="input-field"
          type="number"
          id="age"
          name="age"
        />
        <div className="errors">{errors.age?.message}</div>
      </div>
      <div className="form-field">
        <label htmlFor="email">Email:</label>
        <input
          {...register('email')}
          className="input-field"
          type="email"
          id="email"
          name="email"
        />
        <div className="errors">{errors.email?.message}</div>
      </div>
      <div className="form-field">
        <label htmlFor="password">Password:</label>
        <input
          {...register('password', {
            onChange: (e) => setPassword(e.target.value),
          })}
          className="input-field"
          type="password"
          id="password"
          name="password"
        />
        <PasswordStrength password={password} />
        <div className="errors">{errors.password?.message}</div>
      </div>
      <div className="form-field">
        <label htmlFor="password_confirmation">Confirm Password:</label>
        <input
          {...register('password_confirmation')}
          className="input-field"
          type="password"
          id="password_confirmation"
          name="password_confirmation"
        />
        <div className="errors">{errors.password_confirmation?.message}</div>
      </div>
      <div className="form-group form-group_gender">
        <span className="form-group_title">Gender:</span>
        <div className="form-group_inner">
          <div className="form-field_gender">
            <label htmlFor="gender_male">Male</label>
            <input
              {...register('gender')}
              type="radio"
              id="gender_male"
              name="gender"
              value="male"
            />
          </div>
          <div className="form-field_gender">
            <label htmlFor="gender_female">Female</label>
            <input
              {...register('gender')}
              type="radio"
              id="gender_female"
              name="gender"
              value="female"
            />
          </div>
        </div>
        <div className="errors">{errors.gender?.message}</div>
      </div>
      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <div className="form-field form-field_country">
          <input
            {...register('country')}
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
        <div className="errors">{errors?.country?.message}</div>
      </div>
      <div className="form-field form-field_file">
        <div className="form-field_file-label">
          <label className="form-btn label-file" htmlFor="picture">
            Upload picture
          </label>
          <p className="file-name">{fileName}</p>
        </div>
        <input
          {...register('picture', { onChange: handleSelectFile })}
          className="input-file"
          type="file"
          id="picture"
          name="picture"
        />
        <div className="errors">{errors.picture?.message}</div>
      </div>
      <div className="form-group">
        <div className="form-field form-field_accept">
          <input
            {...register('accept_terms')}
            type="checkbox"
            id="accept_terms"
            name="accept_terms"
          />
          <label htmlFor="accept_terms">
            I accept Terms and Conditions agreement
          </label>
        </div>
        <div className="errors">{errors.accept_terms?.message}</div>
      </div>
      <button
        className="form-btn form-submit"
        type="submit"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
}
