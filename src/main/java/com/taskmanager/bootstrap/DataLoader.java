package com.taskmanager.bootstrap;

import com.taskmanager.entity.Task;
import com.taskmanager.entity.TaskStatus;
import com.taskmanager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final TaskRepository taskRepository;

    @Override
    public void run(String... args) throws Exception {
        if (taskRepository.count() == 0) {
            Task task1 = Task.builder()
                    .title("Learn Spring Boot")
                    .description("Understand the basics of Spring Boot and REST APIs")
                    .status(TaskStatus.PENDING)
                    .build();

            Task task2 = Task.builder()
                    .title("Build Task Manager App")
                    .description("Create a full-stack task manager application using React and Spring Boot")
                    .status(TaskStatus.COMPLETED)
                    .build();

            taskRepository.save(task1);
            taskRepository.save(task2);

            System.out.println("Sample Initial data loaded.");
        }
    }
}
