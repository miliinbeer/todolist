import { useState, useEffect } from "react";
import { Input } from "./components/ui/Input/Input";
import { Button } from "./components/ui/Button/Button";
import { List } from "./components/List/List";
import { Item } from "./components/Item/Item";
import "./assets/styles/global.css";

function App() {
  const [todos, setTodos] = useState([]);
  // ↑ Переменная состояния массива с объектами
  const [value, setValue] = useState("");
  // ↑ Переменная состояния строки для значений Input
  const [editedValue, setEditedValue] = useState();
  // ↑ Переменная состояния для значений измененного текста задачи

  // ↓ Обработчик для введенных значений в Input
  const handlerInput = (event) => {
    setValue(event.target.value);
  };
  // ↓ Обработчик для введенных значений в Input, изменяющий текст задачи
  const handlerEditor = (event) => {
    setEditedValue((prev) => ({ ...prev, text: event.target.value }));
  };

  // ↓ Обработчик кнопки по добавлению задач
  const handlerButton = () => {
    if (value.trim().length) {
      // ↑ Метод trim() удаляет пробелы по краям строки
      addTask();
      setValue("");
    }
  };

  // ↓ Функция для загрузки данных из локального хранилища
  useEffect(() => {
    const task = localStorage.getItem("task");
    if (task) {
      setTodos(JSON.parse(task));
    }
  }, []);

  // ↓ Функция по созданию и добавлению задачи
  const addTask = () => {
    const text = value[0].toUpperCase() + value.slice(1);
    // ↓ Проверка задачи с таким же текстом
    const isExist = todos.find((el) => el.text === text);
    if (!isExist) {
      todos.push({
        id: Date.now(),
        text,
        completed: false,
      });
      // ↓ Сохранение задачи в локальном хранилище
      setTodos((todo) => {
        const saveTask = [...todo];
        localStorage.setItem("task", JSON.stringify(saveTask));
        return saveTask;
      });
    }
  };

  // ↓ Функция по удалению задачи
  const deleteTask = (id) => {
    const deleteTask = todos.filter((el) => el.id !== id);
    setTodos(deleteTask);
    // ↓ Удаление задачи из локального хранилища
    localStorage.setItem("task", JSON.stringify(deleteTask));
  };

  // ↓ Функция по удалению всех задач
  const deleteAll = () => {
    setTodos([]);
    // ↓ Удаление всех задач из локального хранилища
    localStorage.clear();
  };

  // ↓ Функция по переключению выбранных задач из false на true
  const toggleCompleted = (id) => {
    setTodos(
      todos.map((el) =>
        el.id === id ? { ...el, completed: !el.completed } : el
      )
    );
  };

  // ↓ Функция по удалению выбранных задач
  const deleteSelected = () => {
    const deleteTask = todos.filter((el) => !el.completed);
    setTodos(deleteTask);
    // ↓ Удаление выбранных задач из локального хранилища
    localStorage.setItem("task", JSON.stringify(deleteTask));
  };

  const updatedTask = (todo) => {
    const newTodos = todos.map((el) => {
      // ↓ Если id элемента равен id отредактированной задачи, ...
      if (el.id === todo.id) {
        // ... То возвращается новый объект с обновленным текстом задачи, ...
        return {
          ...el,
          text: todo.text,
        };
      }
      // ... В противном случае возвращается сам элемент
      return el;
    });
    // ↓ Установленое новое значение для состояния todos
    setTodos(newTodos);
    // ↓ Сохранение измененной задачи в локальном хранилище
    localStorage.setItem("task", JSON.stringify(newTodos));
    setEditedValue("");
  };

  return (
    <>
      <div className="container">
        <h1 className="title">To Do List</h1>
        <div className="items">
          <Input
            // ↓ Прослушиватель событий, использующийся для обнаружения события нажатии клавиши
            onKeyDown={(event) => {
              // ↓ Event.key позволяет узнать значение нажатой клавиши при вводе текста. 
              // При нажатии на "Enter", создаться и добавится задача.
              // Отрабатывает, как event.preventDefault() при отправки формы
              if (event.key === "Enter") {
                addTask(setValue(""));
              }
            }}
            className="input"
            onChange={handlerInput}
            value={value}
            type="text"
            placeholder="Введите задачу"
          />
          <Button className="button" onClick={handlerButton} children="Write" />
        </div>
        <div>
          {todos.length === 0 ? (
            ""
          ) : (
            <List className="list">
              {todos.map((todo) => {
                return (
                  <Item
                    key={todo.id}
                    id={todo.id}
                    handlerEditor={handlerEditor}
                    updatedTask={updatedTask}
                    editedValue={editedValue}
                    onChange={() => toggleCompleted(todo.id)}
                    editTask={() => {
                      setEditedValue(todo);
                    }}
                    deleteTask={() => deleteTask(todo.id)}
                    text={todo.text}
                  />
                );
              })}
              <div className="buttons">
                <Button
                  className="button"
                  onClick={deleteSelected}
                  children="Delete Selected"
                />
                <Button
                  className="button"
                  onClick={deleteAll}
                  children="Delete All"
                />
              </div>
            </List>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
