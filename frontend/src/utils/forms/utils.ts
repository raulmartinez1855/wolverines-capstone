import { DropDownOption } from "@/components/Forms/SelectDropDown/drop-down-styles";
import axios from "axios";
import { FormikValues } from "formik";

export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER as string;
const formMappingsUrl = backendUrl + "mappings";
const playerPredictionsUrl = backendUrl + "predict/player";
const manualPredictionsUrl = backendUrl + "predict/manual";

export enum FormSteps {
  START,
  SUBMITTING,
  DONE,
}

export const predictionMap = ["Transfer Not Likely", "Transfer Likely"];

export const loading = (delay: number, value: any) =>
  new Promise((resolve) => setTimeout(resolve, delay, value));

export interface FormDropDownOptionValues {
  players: DropDownOption[];
  conferences: DropDownOption[];
  positions: DropDownOption[];
  seasons: DropDownOption[];
  teams: DropDownOption[];
}

export interface FormInputFieldProps {
  id: string | number;
  label: string | number;
}

export interface ModelPrediction {
  model: string;
  probability: number;
}

export interface DropDownFormInputFieldProps extends FormInputFieldProps {
  options: DropDownOption[];
}

export const getDropDownFormOpts =
  async (): Promise<FormDropDownOptionValues> => {
    const res = await axios.get(formMappingsUrl);
    res.data.players = res.data.players.map((v: any) => ({
      label: `${v.Player} (${v.Team} - ${v.Position})`,
      value: v.PlayerId,
    }));
    res.data.conferences = res.data.conferences.map((v: any) => ({
      label: v.Conference,
      value: v.ConferenceId,
    }));
    res.data.positions = res.data.positions.map((v: any) => ({
      label: v.Position,
      value: v.PositionId,
    }));
    res.data.seasons = res.data.seasons.map((v: any) => ({
      label: v.Season,
      value: v.Season,
    }));
    res.data.teams = res.data.teams.map((v: any) => ({
      label: v.Team,
      value: v.TeamId,
    }));

    return res.data;
  };

export const genPlayerPredictions = async (
  values: FormikValues
): Promise<ModelPrediction[]> => {
  const res = await axios.post(playerPredictionsUrl, values);
  return res.data;
};

export const genManualPredictions = async (
  values: FormikValues
): Promise<ModelPrediction[]> => {
  const res = await axios.post(manualPredictionsUrl, values);
  return res.data;
};
