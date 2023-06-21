import { Checkbox, Card as MantineTodoCard, Tooltip } from "@mantine/core";
import { CardProps as MantineTodoCardProps } from "@mantine/core";
import { useState } from "react";
import { TextInput } from "..";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsCheckCircle } from "react-icons/bs";

interface CardProps extends MantineTodoCardProps {
  bgColor: string;
  todoText: string;
  id: string;
  deleteFunc: any;
}

const TodoCard = ({
  deleteFunc,
  id,
  bgColor,
  todoText,
  ...otherProps
}: CardProps) => {
  const [checked, setChecked] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [inputValue, setValue] = useState(todoText);
  const [isEdit, setIsEdit] = useState(false);

  // handle Todo Checked and set todo readOnly and uneditable
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.currentTarget.checked);
    setIsEdit(false);
    setReadOnly(true);
  };

  // handle Todo Edit and set todo editable
  const handleEditTodo = () => {
    setReadOnly(false);
    setIsEdit(true);
  };

  // handle Todo confirm Edit and set todo readOnly
  const handleConfirmEditTodo = () => {
    setReadOnly(true);
    setIsEdit(false);
  };

  // handle delte Todo and pass todoId to parent Component
  const handleDeleteTodo = () => {
    deleteFunc(id, true);
  };
  return (
    // Todo Card Component
    <MantineTodoCard
      id={id}
      fz={"18px"}
      fw={600}
      radius="20px"
      px={"15px"}
      py={"5px"}
      bg={!checked ? bgColor : "#D1D5DB"}
      styles={() => ({})}
      {...otherProps}
      className="overflow-visible"
    >
      {/* Todo Card Component with checkBox, Edit, ConfirmEdit and delete Button */}
      <div className="flex flex-row justify-between items-center gap-[5px] overflow-visible">
        <div className="flex flex-row w-full justify-between items-center gap-[5px] overflow-visible">
          <Tooltip disabled={checked} label="انجام شد" withArrow color="green">
            <Checkbox
              styles={() => ({
                input: {
                  border: "1px solid gray",
                },
              })}
              checked={checked}
              onChange={handleCheck}
              className="cursor-pointer"
              radius="xl"
              size={"1.7rem"}
            />
          </Tooltip>
          <TextInput
            className={checked ? "line-through decoration-[1px]" : ""}
            w={"100%"}
            ml={"20px"}
            value={inputValue}
            readOnly={readOnly}
            onChange={(event) => setValue(event.currentTarget.value)}
            styles={() => ({
              input: {
                fontSize: "16px",
                color: checked && "gray",
                border: readOnly || checked ? "none" : "1px solid #AAAAAA80",
                backgroundColor: readOnly || checked ? "transparent" : "white",
                textAlign: "right",
                height: "20px",
              },
            })}
          />
        </div>
        <div className="flex flex-row gap-[5px] p-[10px] bg-white rounded-[20px] overflow-visible">
          <Tooltip
            position="top"
            disabled={checked}
            label={isEdit ? "تایید تغییرات" : "ویرایش"}
            withArrow
            color={isEdit ? "teal" : "blue"}
          >
            <div className="overflow-visible">
              {isEdit ? (
                <BsCheckCircle
                  className="cursor-pointer"
                  size="1.7rem"
                  color={"#22C55E"}
                  onClick={!checked && handleConfirmEditTodo}
                />
              ) : (
                <BiEdit
                  className="cursor-pointer"
                  size="1.7rem"
                  color={"#0EA5E9"}
                  onClick={!checked && handleEditTodo}
                />
              )}
            </div>
          </Tooltip>

          <Tooltip disabled={checked} label="حذف" position="top" color="red">
            <div className="overflow-visible">
              <RiDeleteBinLine
                className="cursor-pointer"
                size="1.7rem"
                color={"#EF4444"}
                onClick={handleDeleteTodo}
              />
            </div>
          </Tooltip>
        </div>
      </div>
    </MantineTodoCard>
  );
};

export default TodoCard;
