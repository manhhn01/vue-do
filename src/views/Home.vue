<template>
  <div>
    <div v-if="isLoading" class="loader"></div>
    <transition name="fade" @after-enter="psc.update()">
      <div v-if="!isLoading" class="main">
        <div id="all-task">
          <div class="t-center" v-if="tasks.length === 0">No tasks yet</div>
          <Task
            v-for="task in tasks"
            :task="task"
            :key="task.id"
            @completedChange="updateTaskCompleted"
          />
        </div>
        <div class="fixed-footer">
          <router-link :to="{ name: 'AddTask' }" class="add-task-btn btn">
            Add Task
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Task from "@/components/Task.vue";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    Task,
  },
  created() {
    this.isLoading = true;
    fetch("/tasks")
      .then((res) => res.json())
      .then((data) => {
        this.tasks = data;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  data() {
    return {
      tasks: [],
      isLoading: true,
    };
  },
  computed: {
    ongoingTasks() {
      return this.tasks.filter((task) => !task.isCompleted);
    },
    completedTasks() {
      return this.tasks.filter((task) => task.isCompleted);
    },
    ...mapState(["psc"]),
  },
  methods: {
    updateTaskCompleted(id, checked) {
      this.tasks = this.tasks.map((task) => {
        if (task.id === id) {
          task.isCompleted = checked;
          this.updateTask(task);
        }
        return task;
      });
    },
    updateTask(task) {
      fetch("/tasks/" + task.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$footer-height: 90px;

.main {
  padding-bottom: $footer-height;
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: $footer-height;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 30%,
    rgba(255, 255, 255, 0) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;

  .add-task-btn {
    display: block;
    font-size: 1.1rem;
    font-weight: 500;
    color: white;
    background-color: rgb(58, 58, 58);
    border-radius: 10px;
    padding: 8px 18px;
  }
}

.loader {
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
