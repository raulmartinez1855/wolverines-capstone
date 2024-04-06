import { DropDownOption } from "@/components/Forms/SelectDropDown/drop-down-styles";
import axios from "axios";

export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER as string;

export enum FormSteps {
  START,
  SUBMITTING,
  DONE,
}

export const loading = (delay: number, value: any) =>
  new Promise((resolve) => setTimeout(resolve, delay, value));

export interface FormDropDownOptionValues {
  players: DropDownOption[];
  conferences: DropDownOption[];
  positions: DropDownOption[];
  seasons: DropDownOption[];
  teams: DropDownOption[];
}

export const getDropDownFormOpts =
  async (): Promise<FormDropDownOptionValues> => {
    const res = await axios.get(backendUrl + "/mappings");
    res.data.players = res.data.players.map((v: any) => ({
      label: `${v.Player} (${v.Team})`,
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
