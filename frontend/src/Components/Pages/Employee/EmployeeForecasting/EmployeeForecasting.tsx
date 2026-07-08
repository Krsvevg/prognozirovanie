import {
  JSX,
  memo,
  useState,
  useEffect,
  useMemo,
  useRef
} from "react";

import styles from './Styles.module.scss';


import { useSpecialties } from "@/Hooks/useSpecialties";
import { useYearsHorizon } from "@/Hooks/useYearsHorizon";
import { useYearsHistoryFrom } from "@/Hooks/useYearsHistoryFrom";
import { useYearsHistoryTo } from "@/Hooks/useYearsHistoryTo";


import { Button } from "@/Components/UI/Button";
import { Select } from "@/Components/UI/Select/Select";

import { useReportGeneration } from "@/Hooks/useReportGeneration";

import { ReportModalWindow } from "@/Components/Widgets/ReportModal";

const forecastMethods = [
  {
    value: "sma",
    label: "Скользящее среднее"
  },
  {
    value: "demographic",
    label: "Демографический метод"
  },
  {
    value: "exponential_smoothing",
    label: "Экспоненциальное сглаживание"
  }
];

const movingAverageOptions = [
  {
    value: "1",
    label: "За 1 год"
  },

  {
    value: "2",
    label: "За 2 года"
  },

  {
    value: "3",
    label: "За 3 года"
  },

  {
    value: "4",
    label: "За 4 года"
  }
];

function EmployeeForecastingComponent(): JSX.Element {
  const {
    specialties,
    loading: loadingSpec,
    error: errorSpec
  } = useSpecialties();

  const {
    yearsHorizon,
    loading: loadingHorizon,
    error: errorHorizon
  } = useYearsHorizon();

  const {
    years: yearsHistoryFrom,
    loading: loadingHistoryFrom,
    error: errorHistoryFrom
  } = useYearsHistoryFrom();
  const {
    years: yearsHistoryTo,
    loading: loadingHistoryTo,
    error: errorHistoryTo
  } = useYearsHistoryTo();

  const {
    isLoading: isReportLoading,
    error: reportError,
    reportUrl,
    generateReport,
    reset: resetReportState

  } = useReportGeneration();

  const [
    isModalOpen,
    setIsModalOpen
  ] = useState(false);

  const [
    specialty,
    setSpecialty
  ] = useState("");

  const [
    forecastMethod,
    setForecastMethod
  ] = useState("");

  const [
    movingAverageYears,
    setMovingAverageYears
  ] = useState("");

  const [
    yearToHorizon,
    setYearToHorizon
  ] = useState("");

  const [
    yearFromHistory,
    setYearFromHistory
  ] = useState("");

  const [
    yearToHistory,
    setYearToHistory
  ] = useState("");

  const [
    showReadonlyWarning,
    setShowReadonlyWarning
  ] = useState(false);

  const warningRef =
    useRef<HTMLDivElement>(null);

  const yearFromHorizon = useMemo(()=>{
    if(!yearToHistory){
      return "";
    }
    const nextYear =
      String(Number(yearToHistory)+1);
    const exists =
      yearsHorizon.some(
        year =>
          year.value === nextYear
      );
    return exists
      ? nextYear
      : "";
  },[
    yearToHistory,
    yearsHorizon
  ]);

  const yearsHistoryToOptions = useMemo(()=>{
    if(!yearFromHistory){
      return yearsHistoryTo;
    }

    return yearsHistoryTo.filter(
      year =>
        Number(year.value) > Number(yearFromHistory)
    );
  },[
    yearFromHistory,
    yearsHistoryTo
  ]);

  const yearsHorizonToOptions =
    useMemo(()=>{
      let options =
        yearsHorizon;

      if(yearToHistory){
        options =
          options.filter(
            year =>
              Number(year.value) > Number(yearToHistory)
          );
      }

      if(yearFromHorizon){
        options =
          options.filter(
            year =>
              Number(year.value) >= Number(yearFromHorizon)
          );
      }
      return options;
    },[
      yearsHorizon,
      yearToHistory,
      yearFromHorizon
    ]);

  useEffect(()=>{
    if(!yearFromHistory){
      setYearToHistory("");
      return;
    }

    if(
      yearToHistory && Number(yearToHistory) < Number(yearFromHistory)
    ){
      setYearToHistory("");
    }
  },[
    yearFromHistory,
    yearToHistory
  ]);

  useEffect(()=>{
    if(!yearFromHorizon){
      setYearToHorizon("");
      return;
    }
    if(
      yearToHorizon && Number(yearToHorizon) < Number(yearFromHorizon)
    ){
      setYearToHorizon("");
    }
  },[
    yearFromHorizon,
    yearToHorizon
  ]);

  useEffect(()=>{
    const handleClickOutside =
      (event: MouseEvent)=>{
        if(
          warningRef.current &&
          !warningRef.current.contains(
            event.target as Node
          )
        ){
          setShowReadonlyWarning(false);
        }
      };
    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    return ()=>{
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  },[]);

  const isFormValid =
    specialty &&
    forecastMethod &&
    yearFromHorizon &&
    yearToHorizon &&
    yearFromHistory &&
    yearToHistory &&
    (
      forecastMethod !== "sma" || movingAverageYears
    );

  const handleSubmit = async()=>{
    const finalMethod =
      forecastMethod === "sma" && movingAverageYears ? `sma_${movingAverageYears}` : forecastMethod;

    const params = {
      specialty,
      horizon:{
        from: yearFromHorizon,
        to: yearToHorizon
      },

      history:{
        from: yearFromHistory,
        to: yearToHistory
      },
      method: finalMethod
    };
    setIsModalOpen(true);
    await generateReport(params);
  };
    const handleReset = () => {
    setSpecialty("");
    setForecastMethod("");
    setMovingAverageYears("");
    setYearFromHistory("");
    setYearToHistory("");
    setYearToHorizon("");
    resetReportState();
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetReportState();
  };

  if (
    loadingSpec ||
    loadingHorizon ||
    loadingHistoryFrom ||
    loadingHistoryTo
  ) {
    return <div>Загрузка...</div>;
  }

  if(errorSpec){
    return <div>Ошибка: {errorSpec}</div>;
  }

  if(errorHorizon){
    return <div>Ошибка: {errorHorizon}</div>;
  }

  if(errorHistoryFrom){
    return <div>Ошибка: {errorHistoryFrom}</div>;
  }

  if(errorHistoryTo){
    return <div>Ошибка: {errorHistoryTo}</div>;
  }
  return (
    <>
      <div>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Прогноз востребованности специальностей
          </h2>
          <h3 className={styles.subtitle}>
            Параметры прогноза
          </h3>
        </div>

        <div className={styles.container}>
          <div className={styles.input__container}>
            <label>
              Направление подготовки
            </label>

            <Select
              value={specialty}
              options={specialties}
              placeholder="Выберите специальность"
              onChange={setSpecialty}
            />
          </div>

          <div className={styles.input__container}>
            <label>
              Метод прогнозирования
            </label>
            <Select
              value={forecastMethod}
              options={forecastMethods}
              placeholder="Выберите метод"
              onChange={(value)=>{
                setForecastMethod(value);
                if(value !== "sma"){
                  setMovingAverageYears("");
                }
              }}
            />
          </div>
          {
            forecastMethod === "sma" && (
              <div className={styles.input__container}>
                <label>
                  Количество лет
                </label>
                <Select
                  value={movingAverageYears}
                  options={movingAverageOptions}
                  placeholder="Выберите период"
                  onChange={setMovingAverageYears}
                />
              </div>
            )
          }

          <div className={styles.input__container}>
            <label>
              Исторические данные
            </label>

            <div className={styles.years}>
              <Select
                value={yearFromHistory}
                options={yearsHistoryFrom}
                placeholder="Начальный год"
                onChange={setYearFromHistory}
              />
              <span>
                —
              </span>

              <Select
                value={yearToHistory}
                options={yearsHistoryToOptions}
                placeholder={
                  yearFromHistory
                  ?
                  "Конечный год"
                  :
                  "Сначала выберите начальный год"
                }
                disabled={!yearFromHistory}
                onChange={setYearToHistory}
              />
            </div>
          </div>

          <div className={styles.input__container}>
            <label>
              Горизонт прогноза
            </label>

            <div
              className={styles.years}
              style={{
                position:"relative"
              }}
            >
              <div
                ref={warningRef}
                onClick={()=>
                  setShowReadonlyWarning(true)
                }

                style={{
                  padding:"0 16px",
                  backgroundColor:
                    "rgba(255,255,255,.06)",
                  border:
                    "1px solid rgba(255,255,255,.08)",
                  borderRadius:"8px",
                  minHeight:"48px",
                  display:"flex",
                  alignItems:"center",
                  flex:1,
                  cursor:"help",
                  opacity:
                    yearFromHorizon ? 1 : .7
                }}
              >
                {
                  yearFromHorizon ||
                  "Сначала заполните исторические данные"
                }
              </div>
              <span>
                —
              </span>

              <Select
                value={yearToHorizon}
                options={yearsHorizonToOptions}
                placeholder={
                  yearFromHorizon ? "Конечный год" : "Сначала заполните историю"
                }
                disabled={!yearFromHorizon}
                onChange={setYearToHorizon}
              />
            </div>
          </div>
        </div>
        <div className={styles.button_container}>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Сформировать отчёт
          </Button>
          <Button
            onClick={handleReset}
          >
            Сбросить фильтры
          </Button>
          <div className={styles.coming_soon}>
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
        isLoading={isReportLoading}
        error={reportError}
        reportUrl={reportUrl}
        onClose={closeModal}
      />
    </>
  );
}

export const EmployeeForecasting = memo(EmployeeForecastingComponent);
