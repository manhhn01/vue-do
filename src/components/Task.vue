<template>
  <div class="card task">
    <div class="left">
      <transition name="shrink" @after-enter="psc.update()">
        <div v-if="!task.isCompleted" class="task-header">
          <ul class="tag-list">
            <li v-for="(tag, index) in task.tags" :key="index">{{ tag }}</li>
          </ul>
          <div class="edit-btn"></div>
        </div>
      </transition>

      <div
        class="task-body"
        :class="{ 'has-description': task.description.length > 0 }"
      >
        <h2 class="title" :class="{ 't-strike': task.isCompleted }">
          {{ task.title || "(No title)" }}
        </h2>
      </div>

      <transition name="shrink">
        <div v-if="!task.isCompleted" class="task-footer">
          <p class="description" v-if="task.description.length > 0">
            {{ task.description }}
          </p>
          <div class="date flex">
            <fa-icon :icon="['far', 'calendar']" class="icon-sm mr-5" />
            {{ taskDate }}
          </div>
          <div class="time flex">
            <fa-icon :icon="['far', 'clock']" class="icon-sm mr-5" />
            {{ taskTime }}
          </div>
        </div>
      </transition>
    </div>

    <div class="right">
      <div class="checkbox-wrapper">
        <input
          type="checkbox"
          :id="'checkbox' + task.id"
          :checked="task.isCompleted"
          @click="$emit('completedChange', task.id, $event.target.checked)"
        />
        <label :for="'checkbox' + task.id" class="checkbox"></label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import dayjs from "dayjs";

export default {
  name: "Task",
  props: ["task"],
  computed: {
    date() {
      return dayjs(this.task.deadline);
    },
    taskDate() {
      let today = dayjs();
      if (this.date.isSame(today, "date")) {
        return "Today";
      } else if (this.date.isSame(today, "year")) {
        return this.date.format("MM/D");
      } else {
        return this.date.format("MM/D/YYYY");
      }
    },
    taskTime() {
      return this.date.format("HH:mm");
    },
    ...mapState(["psc"]),
  },
};
</script>

<style lang="scss" scoped>
.task {
  padding: {
    top: 15px;
    bottom: 15px;
  }
  display: flex;
  min-height: 60px;
  background-color: white;
  font-family: "Montserrat", sans-serif;
  margin {
    left: 10px;
    right: 10px;
  }

  & + & {
    margin-top: 10px;
  }

  .left {
    flex: 1;
    .tag-list {
      display: flex;
      list-style-type: none;
      margin: 0;

      li {
        padding: 5px 12px;
        margin-right: 8px;
        border: solid rgba(10, 10, 10, 0.1) 2px;
        font-weight: 500;
        border-radius: 1.2rem;
        cursor: pointer;
      }
    }

    .task-body {
      padding: {
        top: 8px;
        bottom: 8px;
      }

      &.has-description {
        padding-bottom: 0;
      }

      .title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
      }
    }

    .task-footer {
      .description {
        margin-bottom: 8px;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
      }

      .date,
      .time {
        font-size: 0.9rem;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.58);
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
  }

  @for $i from 1 through 5 {
    &:nth-child(5n + #{$i}) {
      background-color: nth($lcolor, $i);
      .checkbox::before {
        border-color: darken(nth($lcolor, $i), 60%);
      }
      input[type="checkbox"]:checked + .checkbox::before {
        border-width: 10px;
      }
    }
  }

  .shrink-enter-active {
    transition: max-height 400ms ease, opacity 200ms 200ms ease-in;
  }
  .shrink-leave-active {
    transition: max-height 400ms 150ms ease, opacity 200ms ease-in;
  }

  .shrink-enter-from,
  .shrink-leave-to {
    max-height: 0;
    opacity: 0;
  }

  .shrink-enter-to,
  .shrink-leave-from {
    max-height: 80px;
    opacity: 1;
  }
}
</style>
