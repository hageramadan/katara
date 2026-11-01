"use client";

import { useEffect, useState } from "react";
import { getRegistrationFields } from "./api";
import type { RegistrationField, RegistrationType } from "./types";

type FieldsState = {
  key: string;
  fields: RegistrationField[];
  status: "ready" | "error";
};

export function useRegistrationFields(type: RegistrationType, language: "ar" | "en") {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<FieldsState | null>(null);
  const key = `${type}:${language}:${attempt}`;

  useEffect(() => {
    let active = true;
    getRegistrationFields(type, language).then(
      (fields) => {
        if (active) setState({ key, fields, status: "ready" });
      },
      () => {
        if (active) setState({ key, fields: [], status: "error" });
      },
    );
    return () => { active = false; };
  }, [type, language, key]);

  return {
    fields: state?.key === key ? state.fields : [],
    status: state?.key === key ? state.status : "loading",
    retry: () => setAttempt((value) => value + 1),
  };
}
