export type ProjectProps = {
  id: string;
  projectTitle: string;
  imageUrl: string;
  projectDescription: string;
  publishedAt?: string | null;
  isPublic: boolean;
  status: "draft" | "published";
  tags: string[];
  projectUrl: string;
};


/*
// Definerer en type for unike identifikatorer ved hjelp av crypto.randomUUID
export type ID = ReturnType<typeof crypto.randomUUID>;

// Definerer type for vellykkede operasjoner som inneholder generisk data av type T
export type Data<T> = {
  success: true; // Angir at operasjonen var vellykket
  data: T; // Inneholder resultatet av operasjonen
};

// Definerer type for feil som inneholder en feilkode og en feilmelding
type Err = {
  code: ErrorCode; // En spesifikk feilkode
  message: string; // En beskrivende melding
};

// Definerer en type for mislykkede operasjoner
export type Error = {
  success: false; // Angir at operasjonen mislykkes
  error: Err; // Inneholder feilen
};

// Definerer en type som er enten vellykket eller mislykket
export type Result<T> = Data<T> | Error;

// Definerer en type for funksjoner som håndterer Result-objekter
// En success for å lage vellykkede Result-objekter
// En failure for å lage mislykkede Result-objekter
export type ResultFn = {
  success: <T>(data: T) => Data<T>;
  failure: (error: unknown, code: ErrorCode) => Error;
};*/