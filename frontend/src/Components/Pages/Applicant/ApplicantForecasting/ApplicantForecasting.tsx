import { JSX, memo, useState } from "react";
import styles from './Styles.module.scss';

import { useSpecialties } from "@/Hooks/useSpecialties";
import { Button } from "@/Components/UI/Button";
import { Select } from "@/Components/UI/Select/Select";
import { ReportModalWindow } from "@/Components/Widgets/ReportModal";
import { useReportGeneration } from "@/Hooks/useReportGeneration";

function ApplicantForecastingComponent(): JSX.Element {
  const {
    specialties,
    loading,
    error
  } = useSpecialties();
  const {
    isLoading,
    reportUrl,
    error: reportError,
    generateReport,
    reset
  } = useReportGeneration();
  const [specialty, setSpecialty] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = async () => {
    if (!specialty) {
      setValidationError(
        "Выберите направление подготовки"
      );
      return;
    }
    setValidationError('');
    const params = {
      specialty,
      horizon: {
        from: "2021",
        to: "2025"
      },
      history: {
        from: "2019",
        to: "2020"
      },
      method: "exponential_smoothing"
    };
    setIsModalOpen(true);
    await generateReport(params);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }
  
  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Прогноз востребованности направления
          </h1>
          <p className={styles.subtitle}>
            Получите прогноз по выбранной специальности
          </p>
        </div>

        <div className={styles.input_container}>
          <label htmlFor="specialty">
            Направление подготовки
          </label>

          <Select
            id="specialty"
            value={specialty}
            options={specialties}
            placeholder="Выберите направление"
            onChange={(value) => {
              setSpecialty(value);
              setValidationError('');
            }}
          />

          {validationError && (
            <span className={styles.error}>
              {validationError}
            </span>
          )}
        </div>

        <div className={styles.buttons}>
          <Button
            onClick={handleSubmit}
          >
            Сформировать отчёт
          </Button>

          <div className={styles.settings}>
            <Button
              disabled
            >
              Настройки отчёта
            </Button>
            <span className={styles.badge}>
              В разработке
            </span>
          </div>
        </div>
      </div>

      <ReportModalWindow
        isOpen={isModalOpen}
        isLoading={isLoading}
        error={reportError}
        reportUrl={reportUrl}
        onClose={closeModal}
      />
    </>
  );
}


export const ApplicantForecasting = memo(ApplicantForecastingComponent);