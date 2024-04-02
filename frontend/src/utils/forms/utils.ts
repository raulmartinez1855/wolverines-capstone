export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER as string;

export enum FormSteps {
  START,
  SUBMITTING,
  DONE,
}

export const loading = (delay: number, value: any) =>
  new Promise((resolve) => setTimeout(resolve, delay, value));
