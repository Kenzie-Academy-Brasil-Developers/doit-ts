import {
  Box,
  Button,
  Grid,
  useDisclosure,
  Center,
  Text,
  Heading,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { FaClipboard } from "react-icons/fa";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/Searchbox";
import { Header } from "../../components/Header";
import { ModalCreateTask } from "../../components/Modal/ModalCreateTask";
import { ModalTaskDetail } from "../../components/Modal/ModalTaskDetail";
import { CardSkeleton } from "../../components/Skeleton/CardSkeleton";
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
  const { tasks, loadTasks, notFound, taskNotFound } = useTasks();

  const [selectedTask, setSelectedTask] = useState<Task>({} as Task);

  const {
    isOpen: isTaskDetailOpen,
    onOpen: onTaskDetailOpen,
    onClose: onTaskDetailClose,
  } = useDisclosure();

  const {
    isOpen: isCreateTaskOpen,
    onOpen: onCreateTaskOpen,
    onClose: onCreateTaskClose,
  } = useDisclosure();

  useEffect(() => {
    loadTasks(user.id, accessToken).then((res) => setLoading(false));
  }, []);

  const handleClick = (task: Task) => {
    setSelectedTask(task);
    onTaskDetailOpen();
  };

  if (notFound) {
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
          <Center mt="4" textAlign="center" display="flex" flexDir="column">
            <Heading size="lg"> Não encontramos resultados para: </Heading>
            <Text fontSize="xl" color="gray.300" fontWeight="bold">
              {taskNotFound}
            </Text>
            <Box
              mt="6"
              w={["80%", "40%"]}
              padding="6"
              boxShadow="base"
              bg="white"
            >
              <Stack>
                <Skeleton
                  startColor="gray.100"
                  endColor="gray.200"
                  height="20px"
                  borderRadius="20px"
                  w="80%"
                />
                <Skeleton
                  startColor="gray.100"
                  endColor="gray.200"
                  height="20px"
                  borderRadius="20px"
                  w="60%"
                />
              </Stack>

              <Stack mt="8">
                <Skeleton
                  startColor="gray.100"
                  endColor="gray.200"
                  height="15px"
                  borderRadius="15px"
                />
                <Skeleton
                  startColor="gray.100"
                  endColor="gray.200"
                  height="15px"
                  borderRadius="15px"
                />
              </Stack>
            </Box>
          </Center>
        </Box>
      </>
    );
  }

  return (
    <>
      <ModalTaskDetail
        isOpen={isTaskDetailOpen}
        onClose={onTaskDetailClose}
        task={selectedTask}
      />
      {!loading && !tasks.length ? (
        <>
          <ModalCreateTask
            isOpen={isCreateTaskOpen}
            onClose={onCreateTaskClose}
          />
          <Header />
          <Box
            mt="4"
            w="90vw"
            paddingY="16"
            paddingX={["6", "0"]}
            ml="5vw"
            justifyContent="center"
            textAlign="center"
            borderWidth="2px"
            borderColor="gray.200"
            borderStyle="dashed"
          >
            <Center fontSize="5xl">
              <FaClipboard color="#bdbdbd" />
            </Center>
            <Heading fontSize="4xl" as="h1" mt="4">
              Vamos criar sua primeira tarefa
            </Heading>
            <Text color="gray.400" mt="6">
              Insira sua meta e mostra a você mesmo <br />
              capacidade em cumprir
              <Text fontWeight="bold" color="gray.900">
                suas atividades
              </Text>
            </Text>

            <Button
              padding="6"
              mt="6"
              bgColor="purple.800"
              color="white"
              _hover={{ bg: "purple.900 " }}
              onClick={onCreateTaskOpen}
            >
              Criar sua primeira tarefa
            </Button>
          </Box>
        </>
      ) : (
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
            {loading ? (
              <CardSkeleton repeatCount={9} />
            ) : (
              tasks.map((task) => <Card task={task} onClick={handleClick} />)
            )}
          </Grid>
        </Box>
      )}
    </>
  );
};
