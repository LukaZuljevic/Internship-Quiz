export type ValidationRules<T> = {
  [K in keyof T]?: {
    required?: boolean;
    minLength?: number;
    regex?: RegExp;
    match?: string;
    errorMessages: {
      required?: string;
      minLength?: string;
      regex?: string;
      match?: string;
    };
  };
};
