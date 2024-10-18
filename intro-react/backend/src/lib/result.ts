import type { ResultFn } from "@/../shared/types";
import { ApiError } from "./error";

// Definerer ResultHandler-objektet som implementerer ResultFn-typen
export const ResultHandler: ResultFn = {

    // success-metoden brukes til å håndtere vellykkede resultater
    success(data) {
      // Returnerer et objekt med success true og dataen som ble vellykket behandlet
      return { success: true, data };
    },
  
    // failure-metoden brukes til å håndtere feil
    failure(error: unknown, code = "INTERNAL_SERVER_ERROR") {
      let err = ""; // Initialiserer en variabel for feilmelding
  
      // Sjekker typen av error og behandler den deretter
      // Hvis error er en streng, settes det direkte som feilmelding
      if (typeof error === "string") err = error;
      // Hvis error er et objekt (ikke null), konverteres det til en JSON-streng
      if (typeof error === "object" && err !== null) err = JSON.stringify(error);
      // Hvis error er en Error-instans, brukes meldingen fra feilen
      if (error instanceof Error) err = error.message;
  
      // Returnerer et objekt som indikerer feil med success false og inkluderer feilmelding og kode
      return { success: false, error: { message: err, code } };
    },
  };