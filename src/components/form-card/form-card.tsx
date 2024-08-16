import './form-card.scss';
import {
  ControlledFormStoreInterface,
  UncontrolledFormInterface,
} from '../../interfaces.ts';

interface Props {
  form: UncontrolledFormInterface | ControlledFormStoreInterface;
}

export default function FormCard(props: Props) {
  const { form } = props;

  return (
    <div className="card">
      <img className="card-image" src={form.picture?.toString()} alt="" />
      <ul className="list">
        <li className="list-item">
          <span className="label">Name: </span>
          <span className="value">{form.name as string}</span>
        </li>
        <li className="list-item">
          <span className="label">Age: </span>
          <span className="value">{form.age as string}</span>
        </li>
        <li className="list-item">
          <span className="label">email: </span>
          <span className="value">{form.email as string}</span>
        </li>
        <li className="list-item">
          <span className="label">Password: </span>
          <span className="value">{form.password as string}</span>
        </li>
        <li className="list-item">
          <span className="label">Gender: </span>
          <span className="value">{form.gender as string}</span>
        </li>
        <li className="list-item">
          <span className="label">Country: </span>
          <span className="value">{form.country as string}</span>
        </li>
      </ul>
    </div>
  );
}
