<template>
  <div class="input-group">
    <label for="title">
      {{ label }}
      <span v-if="required" class="red">*</span>
    </label>
    <input
      type="text"
      :name="name"
      :id="id"
      :placeholder="
        touched && touchedPlaceholder ? touchedPlaceholder : placeholder
      "
      :value="modelValue"
      @blur="touched = true"
      @focus="touched = false"
      @change="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "TextInput",
  emits: ["update:modelValue"],
  props: {
    name: {
      type: String,
      required: true,
    },
    placeholder: {
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
    touchedPlaceholder: String,
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
input {
  outline: none;
  border: none;
  width: 100%;
  border-color: transparent;
  border-bottom: solid 2px #cbcbcb;
  padding: 4px 5px;
  box-sizing: border-box;
  transition: border-bottom-color 350ms ease;
}

input:focus {
  border-bottom-color: #414141;
}

label {
  font-size: 0.85rem;
  font-weight: 400;
  color: $text3;
  margin-left: 5px;
}
</style>
