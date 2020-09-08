<script>
import { FormItem } from "element-ui";
import { noop } from "element-ui/src/utils/util";
import AsyncValidator from "async-validator";
import { hasHanzi } from "@/utils/util";
export default {
  extends: FormItem,
  name: "el-form-item",
  methods: {
    validate(trigger, callback = noop) {
      this.validateDisabled = false;
      const rules = this.getFilteredRule(trigger);
      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback();
        return true;
      }
      this.validateState = "validating";
      const descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger;
        });
      }
      descriptor[this.prop] = rules;
      const validator = new AsyncValidator(descriptor);
      const model = {};
      model[this.prop] = this.fieldValue;
      validator.validate(
        model,
        { firstFields: true },
        (errors, invalidFields) => {
          this.validateState = !errors ? "success" : "error";
          if (errors) {
            const msg = errors[0].message;
            if (!hasHanzi(msg) && this.$children && this.$children.length) {
              const tar = this.$children.find(item => item.$attrs.placeholder);
              if (tar) {
                this.validateMessage = tar.$attrs.placeholder;
              } else if (this.label) {
                this.validateMessage = `${this.label}必填`;
              } else {
                this.validateMessage = msg;
              }
            } else {
              this.validateMessage = msg;
            }
          } else {
            this.validateMessage = "";
          }
          callback(this.validateMessage, invalidFields);
          this.elForm &&
            this.elForm.$emit(
              "validate",
              this.prop,
              !errors,
              this.validateMessage || null
            );
        }
      );
    }
  }
};
</script>
