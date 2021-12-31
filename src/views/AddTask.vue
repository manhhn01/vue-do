<template>
  <div class="main">
    <TextInput
      :name="'title'"
      :placeholder="'Enter title'"
      :touched-placeholder="'No title'"
      :label="'Task Title'"
      v-model="title"
    />
    <TextInput
      :name="'description'"
      :placeholder="'Enter description'"
      :touched-placeholder="'No description'"
      :label="'Description'"
      v-model="description"
    />
    <DateInput
      :name="'datetime'"
      :label="'Deadline'"
      :required="true"
      v-model="deadline"
    />
    <TagInput
      :name="'tags'"
      :label="'Labels'"
      :placeholder="'Enter labels'"
      :touched-placeholder="'No label'"
      v-model="tags"
    />
    <div class="fixed-footer">
      <button
        class="save-task-btn btn"
        @click="saveTask"
        :disabled="!validInput"
      >
        Save Task
      </button>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/TextInput.vue";
import DateInput from "@/components/DateInput.vue";
import TagInput from "../components/TagInput.vue";

export default {
  name: "AddTask",
  components: {
    TextInput,
    DateInput,
    TagInput,
  },
  methods: {
    saveTask() {
      if (this.validInput) {
        fetch("/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: this.title,
            description: this.description,
            deadline: this.deadline,
            tags: this.tags,
          }),
        }).then(() => {
          this.$router.push({ name: "Home" });
        });
      }
    },
  },
  computed: {
    validInput() {
      if (this.deadline === "Invalid Date" || this.deadline === "")
        return false;
      return true;
    },
  },
  data() {
    return {
      title: "",
      description: "",
      deadline: "",
      tags: [],
    };
  },
};
</script>

<style lang="scss" scoped>
$footer-height: 60px;

.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: $footer-height;
  background: white;
  display: flex;
  align-items: center;

  .save-task-btn {
    flex: 1;
    text-align: center;
    display: block;
    font-size: 1.1rem;
    font-weight: 500;
    color: white;
    background-color: rgb(58, 58, 58);
    border-radius: 10px;
    margin: 0 8px;
    padding: 8px 18px;

    &:disabled {
      background-color: rgb(153, 153, 153);
    }
  }
}
</style>
