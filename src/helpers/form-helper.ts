import * as yup from "yup";

export interface PreviewFormData {
  cnpj: string;
  local: string;
  razaoSocial: string;
  periodoApuracao: string;
  comercioSemNF: number;
  comercioComNF: number;
  industriaSemNF: number;
  industriaComNF: number;
  servicosSemNF: number;
  servicosComNF: number;
}

export interface PreviewData extends PreviewFormData {
  servicosTotal?: number;
  total?: number;
  industriaTotal?: number;
  comercioTotal?: number;
}

const isNumber = (v: any) => !isNaN(Number(v));

export const previewSchema = yup.object({
  cnpj: yup.string().notRequired(),
  razaoSocial: yup.string().notRequired(),
  periodoApuracao: yup.string().notRequired(),
  local: yup.string().notRequired(),
  comercioSemNF: yup
    .number()
    .transform((_, ov) => (isNumber(Number(ov)) ? Number(ov) : 0))
    .notRequired(),
  comercioComNF: yup
    .number()
    .transform((_, ov) => (isNumber(Number(ov)) ? Number(ov) : 0))
    .notRequired(),
  industriaSemNF: yup
    .number()
    .transform((_, ov) => (isNumber(Number(ov)) ? Number(ov) : 0))
    .notRequired(),
  industriaComNF: yup
    .number()
    .transform((_, ov) => (isNumber(Number(ov)) ? Number(ov) : 0))
    .notRequired(),
  servicosSemNF: yup
    .number()
    .transform((_, ov) => (isNumber(Number(ov)) ? Number(ov) : 0))
    .notRequired(),
  servicosComNF: yup
    .number()
    .transform((_, ov) => (isNumber(Number(ov)) ? Number(ov) : 0))
    .notRequired(),
});
