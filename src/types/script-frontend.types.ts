import { z } from 'zod';
// export type ValidationRules = {
//   min?: number;
//   max?: number;
//   step?: number;
//   required?: boolean;
//   pattern?: string;
// };

const SelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const InputBaseSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.string(),
});

const NumberInputSchema = InputBaseSchema.extend({
  type: z.literal('number'),
});

const TextInputSchema = InputBaseSchema.extend({
  type: z.literal('text'),
});

const SelectInputSchema = InputBaseSchema.extend({
  type: z.literal('select'),
  options: z.array(SelectOptionSchema),
});

const InputSchema = z.union([
  NumberInputSchema,
  TextInputSchema,
  SelectInputSchema,
]);

const LayoutConfigSchema = z.object({
  columns: z.number().describe('Number of columns in the form'),
  spacing: z
    .enum(['small', 'medium', 'large'])
    .describe('Spacing between form elements'),
});

const FormConfigSchema = z.object({
  title: z.string(),
  description: z.string(),
  inputs: z.array(InputSchema),
  layout: LayoutConfigSchema,
});

export type FormConfig = z.infer<typeof FormConfigSchema>;
export type Input = z.infer<typeof InputSchema>;
export type TextInput = z.infer<typeof TextInputSchema>;
export type NumberInput = z.infer<typeof NumberInputSchema>;
export type SelectInput = z.infer<typeof SelectInputSchema>;
export type SelectOption = z.infer<typeof SelectOptionSchema>;
export type LayoutConfig = z.infer<typeof LayoutConfigSchema>;
export type InputBase = z.infer<typeof InputBaseSchema>;

export interface Coordinates {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}
