import { PreviewData, PreviewFormData } from "./form-helper";

export * from "./form-helper";
export * from "./mask";

export function previewFormDto(formData: PreviewFormData): PreviewData {
  const comercioTotal = formData?.comercioSemNF + formData?.comercioComNF;
  const industriaTotal = formData?.industriaSemNF + formData?.industriaComNF;
  const servicosTotal = formData?.servicosSemNF + formData?.servicosComNF;
  const total = comercioTotal + industriaTotal + servicosTotal;

  return {
    cnpj: formData?.cnpj,
    razaoSocial: formData?.razaoSocial,
    local: formData?.local,
    periodoApuracao: formData?.periodoApuracao,
    comercioSemNF: formData?.comercioSemNF,
    comercioComNF: formData?.comercioComNF,
    comercioTotal,
    industriaSemNF: formData?.industriaSemNF,
    industriaComNF: formData?.industriaComNF,
    industriaTotal,
    servicosSemNF: formData?.servicosSemNF,
    servicosComNF: formData?.servicosComNF,
    servicosTotal,
    total,
  };
}

export function previewDataDto(data: Record<string, any>) {
  return {
    cnpj: data?.cnpj || "",
    razaoSocial: data?.razaoSocial || "",
    local: data?.local || "Localização não informada",
    periodoApuracao: data?.periodoApuracao || "",
    comercioSemNF: !!Number(data?.comercioSemNF)
      ? Number(data?.comercioSemNF).toFixed(2).replace(".", ",")
      : "-",
    comercioComNF: !!Number(data?.comercioComNF)
      ? Number(data?.comercioComNF).toFixed(2).replace(".", ",")
      : "-",
    comercioTotal: !!Number(data?.comercioTotal)
      ? Number(data?.comercioTotal).toFixed(2).replace(".", ",")
      : "-",
    industriaSemNF: !!Number(data?.industriaSemNF)
      ? Number(data?.industriaSemNF).toFixed(2).replace(".", ",")
      : "-",
    industriaComNF: !!Number(data?.industriaComNF)
      ? Number(data?.industriaComNF).toFixed(2).replace(".", ",")
      : "-",
    industriaTotal: !!Number(data?.industriaTotal)
      ? Number(data?.industriaTotal).toFixed(2).replace(".", ",")
      : "-",
    servicosSemNF: !!Number(data?.servicosSemNF)
      ? Number(data?.servicosSemNF).toFixed(2).replace(".", ",")
      : "-",
    servicosComNF: !!Number(data?.servicosComNF)
      ? Number(data?.servicosComNF).toFixed(2).replace(".", ",")
      : "-",
    servicosTotal: !!Number(data?.servicosTotal)
      ? Number(data?.servicosTotal).toFixed(2).replace(".", ",")
      : "-",
    total: !!Number(data?.total)
      ? Number(data?.total).toFixed(2).replace(".", ",")
      : "-",
  };
}

export function addSeparatorsToNumberString(
  value: string,
  separators: string[] = []
) {
  separators.forEach((separator) => {
    if (value.includes(separator)) {
      // Only lets value have 1 separator of the same type
      value = `${value.split(separator)[0]}${separator}${value
        .split(separator)[1]
        .replace(/separator/, "")}`;
    }

    const qtdSeparators = separators.reduce((ac, at) => {
      if (value.includes(at)) ac += 1;
      return ac;
    }, 0);

    if (qtdSeparators > 1) {
      const firstSeparatorIndex = separators
        .map((separator) => value.indexOf(separator))
        .reduce((ac, at) => (ac < at ? ac : at));

      const firstSeparator = separators.find(
        (separator) => value.indexOf(separator) === firstSeparatorIndex
      );

      const regex = new RegExp(`[^1-9${firstSeparator}]`, "g");
      value = value.replace(regex, "");
    }
  });

  return value;
}
