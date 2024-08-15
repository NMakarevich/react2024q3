import { useSelector } from 'react-redux';
import {
  selectControlledForms,
  selectUncontrolledForms,
} from '../../redux/slices/forms.slice.ts';
import FormCard from '../../components/form-card/form-card.tsx';

export default function MainPage() {
  const uncontrolledForms = useSelector(selectUncontrolledForms);
  const controlledForms = useSelector(selectControlledForms);

  return (
    <div className="columns">
      <div className="column">
        <h3 className="column-title">Uncontrolled forms:</h3>
        <div className="column-content">
          {[...uncontrolledForms].reverse().map((form, index) => (
            <FormCard key={index} form={form} />
          ))}
        </div>
      </div>
      <div className="column">
        <h3 className="column-title">Controlled forms:</h3>
        <div className="column-content">
          {[...controlledForms].reverse().map((form, index) => (
            <FormCard key={index} form={form} />
          ))}
        </div>
      </div>
    </div>
  );
}
