<template>
  <div class="input-group">
    <label for="title">{{ label }}</label>
    <div class="tag-input">
      <span v-for="(tag, index) of modelValue" :key="index" class="tag">
        <span class="tag-title">{{ tag }}</span>
        <span class="remove-btn" @click="removeTag(index)">&#10005;</span>
      </span>
      <input
        type="text"
        class="input-field"
        :placeholder="
          !modelValue.length
            ? touched && touchedPlaceholder
              ? touchedPlaceholder
              : placeholder
            : ''
        "
        @blur="touched = true"
        @focus="touched = false"
        @keyup="onTagInput($event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TagInput",
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    touchedPlaceholder: String,
    modelValue: {
      type: Array,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    removeTag(index) {
      this.emitValue(this.modelValue.slice(index, 1));
    },
    onTagInput({ target, keyCode }) {
      //backspace
      if (keyCode === 8 && target.value === "") {
        this.emitValue(this.modelValue.slice(-1));
      } else if (target.value.includes(",") || keyCode === 13) {
        let tag = target.value.split(",")[0];
        if (tag.length > 0) this.emitValue([...this.modelValue, tag]);
        target.value = "";
      }
    },
    emitValue(value) {
      this.$emit("update:modelValue", value);
    },
  },
  computed: {
    id() {
      return this.name + "Input";
    },
  },
  data() {
    return {
      touched: false,
    };
  },
};
</script>

<style lang="scss" scoped>
label {
  font-size: 0.85rem;
  font-weight: 400;
  color: $text3;
  margin-left: 5px;
}

.tag-input {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-color: transparent;
  border-bottom: solid 2px #cbcbcb;
  padding: 4px 5px;
  box-sizing: border-box;
  transition: border-bottom-color 350ms ease;

  input[type="text"] {
    width: 0;
    flex: 1;
    outline: none;
    border: none;
  }
}

.tag {
  display: flex;
  margin-right: 4px;

  .tag-title {
    padding: 2px 3px 2px 5px;
    word-break: break-all;
  }

  .remove-btn {
    padding-top: 5px;
    font-size: 0.85rem;
  }
}
</style>
