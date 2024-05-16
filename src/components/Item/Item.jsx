import React from "react";
import { Input } from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import pen from "../../assets/images/icon.webp";
import styles from "./Item.module.css";

export const Item = ({
  id,
  onChange,
  handlerEditor,
  editedValue,
  text,
  updatedTask,
  editTask,
  deleteTask,
}) => {

  // ↓ Переменная для редактирования значений текста задачи. 
  // Если переписанное значение не пустое или ложное и его id равен id изменяемой задачи, то переменная будет равна true, в противном случае false 
  const isEditMode = editedValue && editedValue.id === id;

  return (
    <>
      <li id={id} className={styles.item}>
        <div className={styles.items}>
          <label className={styles.checkbox}>
            <Input
              className={styles.input}
              onChange={onChange}
              type="checkbox"
            />
            <div className={styles.checkmark}></div>
          </label>
          <div className={styles.texts}>
            {isEditMode ? (
              <Input
                className={styles.editor}
                onChange={handlerEditor}
                value={editedValue.text}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    updatedTask(editedValue);
                  }
                }}
                type="text"
              />
            ) : (
              <p>{text}</p>
            )}
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            onClick={editTask}
            children={<img width="20px" src={pen} alt="icon" />}
          />
          <Button
            className={styles.cross}
            onClick={deleteTask}
            children="×"
          />
        </div>
      </li>
    </>
  );
};
