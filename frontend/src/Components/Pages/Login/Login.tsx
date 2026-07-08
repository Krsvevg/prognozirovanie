import styles from './Styles.module.scss';
import { JSX, memo } from 'react';
import { Button } from '../../UI/Button';
import { useNavigate } from 'react-router';
import {useAuthStore} from '@/store/authStore';

function LoginComponent(): JSX.Element {
  const navigate = useNavigate();
  const role = useAuthStore(
    (state) => state.role
  );

  const setRole = useAuthStore(
    (state) => state.setRole
  );

  const handleContinue = () => {
    if(role === "employee"){
      setRole("employee");
      navigate("/employee");
    }

    if(role === "applicant"){
      setRole("applicant");
      navigate("/applicant");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>
          Аналитика специальностей
        </h2>

        <h3 className={styles.subtitle}>
          Выберите роль для продолжения
        </h3>

        <div className={styles.buttons}>
          <Button
            color={role === 'employee' ? 'blue' : 'secondary'}
            onClick={() => setRole('employee')}
            fullWidth
          >
            Сотрудник вуза
          </Button>

          <Button
            color={role === 'applicant' ? 'blue' : 'secondary'}
            onClick={() => setRole('applicant')}
            fullWidth
          >
            Абитуриент
          </Button>
        </div>

        <Button
          onClick={handleContinue}
          disabled={role === 'guest'}
          fullWidth
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
}

export const Login = memo(LoginComponent);