import { Button, Container, Menu, Modal, Title } from "@mantine/core";
import { TextInput } from "./components/TextInput";
import { useEffect, useState } from "react";
import { CirclePicker } from "react-color";
import "./index.css";
import { TodoCard } from "./components";
import { todoColors } from "./components/constants";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { Notifications, notifications } from "@mantine/notifications";

interface todoType {
  id: string;
  title: string;
  color: string;
}

const App = () => {
  const [todos, setTodos] = useState<todoType[]>([]);
  const [deleteModal, setDeleteModal] = useState({ state: false, todoId: "" });

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos.length));
  }, [todos]);

  // handle delete Todo
  const deleteTodo = (todoId: string) => {
    todoId ? setDeleteModal({ state: true, todoId }) : null;
  };

 
  // handle Error for Entet Todo info
  const handleError = (errors: typeof form.errors) => {
    errors.title
      ? notifications.show({
          styles: () => ({
            description: {
              textAlign: "center",
              fontSize: "20px",
            },
          }),
          message: "فیلد تودو را پر کنید",
          color: "red",
        })
      : errors.color &&
        notifications.show({
          styles: () => ({
            description: {
              textAlign: "center",
              fontSize: "20px",
            },
          }),
          message: "رنگ را انتخاب کنید",
          color: "red",
        });
  };

  // handle Submit Todo info Form with empty Validation
  const handleSubmit = (values: typeof form.values) => {
    form.isValid() &&
      setTodos((old) => [
        ...old,
        {
          id: randomId(),
          title: values.title,
          color: values.color,
          checkState: false,
        },
      ]);
    form.setFieldValue("color", "");
    form.setFieldValue("title", "");
  };

  // handle Todo Color - set color from color picker
  const handleChangeColor = (color: any) => {
    form.setFieldValue("color", color.hex);
  };

  // config Todo info Form and set Validation Rules
  const form = useForm({
    initialValues: {
      title: "",
      color: "",
    },
    validate: {
      title: (value) => (value.length < 1 ? true : null),
      color: (value) => (value.length < 1 ? true : null),
    },
  });

  return (
    <Container className="pt-[100px] overflow-visible">
      {/* Modal for Confirm DeleteTodo */}
      <Modal
        centered
        withCloseButton={false}
        onClose={() => setDeleteModal({ state: false, todoId: "" })}
        opened={deleteModal.state}
      >
        <div className="flex flex-col justify-center items-center gap-[20px]">
          <span className="text-rose-700 text-[20px] font-bold">
            از حذف تودو مطمئن هستید؟
          </span>
          <div className="flex flex-row justify-center items-center gap-[20px]">
            <Button
              className="confirmDelete-btn-grad confirmDelete-btn-grad:hover"
              onClick={() => {
                setTodos((old) =>
                  old.filter((item) => {
                    return item.id !== deleteModal.todoId;
                  })
                );
                setDeleteModal({ state: false, todoId: "" });
              }}
            >
              بله
            </Button>
            <Button
              className="cancelDelete-btn-grad cancelDelete-grad:hover"
              onClick={() => setDeleteModal({ state: false, todoId: "" })}
            >
              خیر
            </Button>
          </div>
        </div>
      </Modal>

      {/* Notifications config */}
      <Notifications position="top-center" zIndex={2077} autoClose={2000} />

      <Title className="textBgColor text-center text-[50px]">
        هنایا تودو لیست
      </Title>

      {/* Form for Entry Todo info */}
      <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
        <div className="flex flex-row items-center gap-[10px] mt-[20px]">
          {/* Input for Entry Todo title */}
          <TextInput
            {...form.getInputProps("title")}
            w={"100%"}
            placeholder="تودو را بنویسید"
          />

          {/* Menu for Select Todo BackGrounColor */}
          <Menu
            position="top-start"
            offset={10}
            styles={() => ({
              dropdown: {
                backgroundColor: "#1C1917",
                borderRadius: "10px",
              },
              item: {
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
            })}
          >
            <Menu.Target>
              <Button
                px={"15px"}
                h={"50px"}
                type="button"
                size="lg"
                className="btn-grad btn-grad:hover"
              >
                انتخاب رنگ
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>
                <CirclePicker
                  colors={todoColors}
                  onChange={handleChangeColor}
                />
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          {/* Buttun for Submit Todo info */}
          <Button
            px={"15px"}
            h={"50px"}
            type="submit"
            size="lg"
            className="submit-btn-grad submit-btn-grad:hover"
          >
            ثبت تودو
          </Button>
        </div>
      </form>

      {/* Container for Todos */}
      <div
        className={
          `flex flex-col gap-[20px] w-full mt-[20px] p-[20px] glassyBg max-h-[400px] 
            overflow-auto scrollbar-none` +
          (todos.length === 0 ? " hidden" : "")
        }
      >
        {/* Create Todos List */}
        <div className="flex flex-col gap-[10px] w-full justify-center">
          {todos.length !== 0 &&
            todos.map((item: todoType) => {
              return (
                <TodoCard
                  deleteFunc={deleteTodo}
                  key={item.id}
                  id={item.id}
                  bgColor={item.color}
                  todoText={item.title}
                  children={undefined}
                />
              );
            })}
        </div>
      </div>
    </Container>
  );
};

export default App;
