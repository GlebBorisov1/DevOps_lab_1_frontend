import SenderForm from './components/SenderForm.jsx';
import DataReader from './components/DataReader.jsx';

export default function App() {
  return (
    <main className="card">
      <h1>Отправка данных</h1>
      <p className="description">
        Введите текст и отправьте его на сервер. Принятые данные будут
        добавлены в файл data.txt.
      </p>

      <SenderForm />

      <hr className="divider" />

      <DataReader />
    </main>
  );
}