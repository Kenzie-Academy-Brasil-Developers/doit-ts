import { Box, Button, Grid, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/Searchbox";
import { Header } from "../../components/Header";
import { ModalTaskDetail } from "../../components/Modal/ModalTaskDetail";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { user, accessToken } = useAuth();
  const { tasks, loadTasks } = useTasks();

  const [selectedTask, setSelectedTask] = useState<Task>({} as Task);

  const {
    isOpen: isTaskDetailOpen,
    onOpen: onTaskDetailOpen,
    onClose: onTaskDetailClose,
  } = useDisclosure();

  useEffect(() => {
    loadTasks(user.id, accessToken).then((res) => setLoading(false));
  }, []);

  const handleClick = (task: Task) => {
    setSelectedTask(task);
    onTaskDetailOpen();
  };

  return (
    <>
      <ModalTaskDetail
        isOpen={isTaskDetailOpen}
        onClose={onTaskDetailClose}
        task={selectedTask}
      />
      <Box>
        <Header />
        <SearchBox />
        <Grid
          w="100%"
          templateColumns="repeat(auto-fill, minmax(420px, 1fr))"
          gap={10}
          paddingX="8"
          mt="8"
        >
          {tasks.map((task) => (
            <Card task={task} onClick={handleClick} />
          ))}
        </Grid>
      </Box>
    </>
  );
};
