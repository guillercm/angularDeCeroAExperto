import { Args } from "@core/interfaces/args/args.interface";
import { Type } from "@angular/core";

export type PatoFormComponentType<T, T2> = {
  seccion?: number;
  component: Type<T>;
  formFieldComponent: Type<T2>;
  value: any;
  validators?: any[];
  asyncValidators?: any[];
  valueChangesSubscribe?: boolean;
  args?: {
    formField?: Partial<Args<T2>>,
    control?: Partial<Args<T>>
  };
  classes?: {
    formField?: any,
    control?: any
  };
};
