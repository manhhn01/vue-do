<template>
  <div class="input-group">
    <label for="title">
      {{ label }}
      <span v-if="required" class="red">*</span>
    </label>
    <input
      type="datetime-local"
      :class="valid ? '' : 'error'"
      :name="name"
      :id="id"
      @keyup="onDateInput($event)"
    />
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "DateInput",
  emits: ["update:modelValue"],
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    onDateInput({ target }) {
      let date = new dayjs(target.value);
      if (target.value.length == 0 || !date.isValid()) {
        this.valid = false;
      } else this.valid = true;
      this.$emit("update:modelValue", date.toString());
    },
  },
  computed: {
    id() {
      return this.name + "Input";
    },
  },
  data() {
    return {
      valid: true,
    };
  },
};
</script>

<style lang="scss" scoped>
input {
  outline: none;
  width: 100%;
  border-color: transparent;
  border-bottom: solid 2px #cbcbcb;
  padding: 4px 5px;
  box-sizing: border-box;
  transition: border-bottom-color 350ms ease;

  &.error {
    border-bottom-color: rgb(167, 0, 0);
  }

  &:focus {
    border-bottom-color: #414141;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
}

label {
  font-size: 0.85rem;
  font-weight: 400;
  color: $text3;
  margin-left: 5px;
}
</style>
