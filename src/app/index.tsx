import { yupResolver } from "@hookform/resolvers/yup";
import { Button, ScrollView } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Field } from "@/components/form/Field";
import { Form } from "@/components/form/Form";
import { PreviewFormData, previewFormDto, previewSchema } from "@/helpers";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { previewCSS } from "@/styles/preview";
import * as Print from "expo-print";

export default function HomeScreen() {
  const methods = useForm<PreviewFormData>({
    resolver: yupResolver(previewSchema as any, { abortEarly: false }),
  });

  const onSubmit = useCallback(async (formData: PreviewFormData) => {
    const query = new URLSearchParams(
      previewFormDto(formData) as any
    ).toString();
    const url = `https://mei.quadrinhos.org/preview?${query}`;
    const response = await fetch(url);

    const html = await response.text();

    const htmlWithStyle = `
    <html>
      <head>
        <style>
          @page {
            size: A4;
          }

          ${previewCSS}
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;

    await Print.printAsync({ html: htmlWithStyle });
  }, []);

  return (
    <ScrollView className="flex flex-1 pb-8">
      <ThemedView className="flex flex-1 px-2 pb-20">
        <Form methods={methods}>
          <Field
            name="cnpj"
            mask="cnpj"
            label="CNPJ"
            placeholder="Digite aqui seu CNPJ"
          />
          <Field
            name="razaoSocial"
            label="Empreendedor individual (razão social)"
            placeholder="Digite aqui sua razão social"
          />
          <Field
            name="periodoApuracao"
            label="Período de apuração"
            placeholder="Digite aqui o período de apuração (ex: JANEIRO/2024)"
          />
          <Field
            name="local"
            label="Localização"
            placeholder="Digite aqui a localização"
          />

          <ThemedView className="pt-4 form-group">
            <ThemedView className="w-full">
              <ThemedText type="defaultSemiBold" className="text-justify">
                RECEITA BRUTA MENSAL – REVENDA DE MERCADORIAS (COMÉRCIO)
              </ThemedText>
            </ThemedView>
            <ThemedView>
              <Field
                number
                name="comercioComNF"
                label="Sem emissão de documento fiscal"
              />
            </ThemedView>
            <ThemedView>
              <Field
                number
                name="comercioSemNF"
                label="Com documento fiscal emitido"
              />
            </ThemedView>
          </ThemedView>
          <ThemedView className="pt-4 form-group">
            <ThemedView className="w-full">
              <ThemedText>
                RECEITA BRUTA MENSAL – VENDA DE PRODUTOS INDUSTRIALIZADOS
                (INDÚSTRIA)
              </ThemedText>
            </ThemedView>
            <ThemedView>
              <Field
                number
                name="industriaComNF"
                label="Sem emissão de documento fiscal"
              />
            </ThemedView>
            <ThemedView>
              <Field
                number
                name="industriaSemNF"
                label="Com documento fiscal emitido"
              />
            </ThemedView>
          </ThemedView>

          <ThemedView className="pt-4 form-group">
            <ThemedView className="w-full">
              <ThemedText>
                RECEITA BRUTA MENSAL – PRESTAÇÃO DE SERVIÇOS
              </ThemedText>
            </ThemedView>
            <ThemedView>
              <Field
                number
                name="servicosComNF"
                label="Sem emissão de documento fiscal"
              />
            </ThemedView>
            <ThemedView>
              <Field
                number
                name="servicosSemNF"
                label="Com documento fiscal emitido"
              />
            </ThemedView>
          </ThemedView>

          <ThemedView className="pt-4">
            <Button onPress={methods.handleSubmit(onSubmit)} title="Enviar" />
          </ThemedView>
        </Form>
      </ThemedView>
    </ScrollView>
  );
}
