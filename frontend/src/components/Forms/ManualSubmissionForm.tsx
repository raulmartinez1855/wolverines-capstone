import TextInput from "@/components/Forms/Inputs/TextInput";
import { Field } from "formik";
import * as yup from "yup";
import FormStateWrapper from "./FormStateWrapper";
import SelectDropDown from "./SelectDropDown";

const freeFormFields = [
  { id: "Usage Overall", label: "Usage Overall" },
  { id: "Usage Pass", label: "Usage Pass" },
  { id: "Usage Rush", label: "Usage Rush" },
  { id: "Usage FirstDown", label: "Usage on First Down" },
  { id: "Usage SecondDown", label: "Usage on Second Down" },
  { id: "Usage ThirdDown", label: "Usage on Third Down" },
  { id: "Usage StandardDowns", label: "Usage on Standard Downs" },
  { id: "Usage PassingDowns", label: "Usage on Passing Downs" },
  { id: "ATT", label: "ATT" },
  { id: "AVG", label: "AVG" },
  { id: "CAR", label: "CAR" },
  { id: "COMPLETIONS", label: "COMPLETIONS" },
  { id: "FGA", label: "FGA" },
  { id: "FGM", label: "FGM" },
  { id: "FUM", label: "FUM" },
  { id: "INT", label: "INT" },
  { id: "In 20", label: "In 20" },
  { id: "LONG", label: "LONG" },
  { id: "LOST", label: "LOST" },
  { id: "NO", label: "NO" },
  { id: "PCT", label: "PCT" },
  { id: "PD", label: "PD" },
  { id: "PTS", label: "PTS" },
  { id: "QB HUR", label: "QB HUR" },
  { id: "REC", label: "REC" },
  { id: "SACKS", label: "SACKS" },
  { id: "SOLO", label: "SOLO" },
  { id: "TB", label: "TB" },
  { id: "TD", label: "TD" },
  { id: "TFL", label: "TFL" },
  { id: "TOT", label: "TOT" },
  { id: "XPA", label: "XPA" },
  { id: "XPM", label: "XPM" },
  { id: "YDS", label: "YDS" },
  { id: "YPA", label: "YPA" },
  { id: "YPC", label: "YPC" },
  { id: "YPP", label: "YPP" },
  { id: "YPR", label: "YPR" },
  { id: "Division", label: "Division" },
  { id: "ExpectedWins", label: "Expected Wins" },
  { id: "Total Games", label: "Total Games" },
  { id: "Total Wins", label: "Total Wins" },
  { id: "Total Losses", label: "Total Losses" },
  { id: "Total Ties", label: "Total Ties" },
  { id: "ConferenceGames Games", label: "Conference Games Games" },
  { id: "ConferenceGames Wins", label: "Conference Games Wins" },
  { id: "ConferenceGames Losses", label: "Conference Games Losses" },
  { id: "ConferenceGames Ties", label: "Conference Games Ties" },
  { id: "HomeGames Games", label: "Home Games Games" },
  { id: "HomeGames Wins", label: "Home Games Wins" },
  { id: "HomeGames Losses", label: "Home Games Losses" },
  { id: "HomeGames Ties", label: "Home Games Ties" },
  { id: "AwayGames Games", label: "Away Games Games" },
  { id: "AwayGames Wins", label: "Away Games Wins" },
  { id: "AwayGames Losses", label: "Away Games Losses" },
  { id: "AwayGames Ties", label: "Away Games Ties" },
  { id: "Team firstDowns", label: "Team First Downs" },
  { id: "Team fourthDownConversions", label: "Team Fourth Down Conversions" },
  { id: "Team fourthDowns", label: "Team Fourth Downs" },
  { id: "Team fumblesLost", label: "Team Fumbles Lost" },
  { id: "Team fumblesRecovered", label: "Team Fumbles Recovered" },
  { id: "Team games", label: "Team Games" },
  { id: "Team interceptionTDs", label: "Team Interception TDs" },
  { id: "Team interceptionYards", label: "Team Interception Yards" },
  { id: "Team interceptions", label: "Team Interceptions" },
  { id: "Team kickReturnTDs", label: "Team Kick Return TDs" },
  { id: "Team kickReturnYards", label: "Team Kick Return Yards" },
  { id: "Team kickReturns", label: "Team Kick Returns" },
  { id: "Team netPassingYards", label: "Team Net Passing Yards" },
  { id: "Team passAttempts", label: "Team Pass Attempts" },
  { id: "Team passCompletions", label: "Team Pass Completions" },
  { id: "Team passesIntercepted", label: "Team Passes Intercepted" },
  { id: "Team passingTDs", label: "Team Passing TDs" },
  { id: "Team penalties", label: "Team Penalties" },
  { id: "Team penaltyYards", label: "Team Penalty Yards" },
  { id: "Team possessionTime", label: "Team Possession Time" },
  { id: "Team puntReturnTDs", label: "Team Punt Return TDs" },
  { id: "Team puntReturnYards", label: "Team Punt Return Yards" },
  { id: "Team puntReturns", label: "Team Punt Returns" },
  { id: "Team rushingAttempts", label: "Team Rushing Attempts" },
  { id: "Team rushingTDs", label: "Team Rushing TDs" },
  { id: "Team rushingYards", label: "Team Rushing Yards" },
  { id: "Team sacks", label: "Team Sacks" },
  { id: "Team tacklesForLoss", label: "Team Tackles For Loss" },
  { id: "Team thirdDownConversions", label: "Team Third Down Conversions" },
  { id: "Team thirdDowns", label: "Team Third Downs" },
  { id: "Team totalYards", label: "Team Total Yards" },
  { id: "Team turnovers", label: "Team Turnovers" },
];

const dropDownFields = [
  { id: "Season", label: "Season", options: [{ label: "2020", value: 2020 }] },
  { id: "Stars", label: "Stars", options: [{ label: "a", value: "a" }] },
  // { id: "PlayerId", label: "Player Name", options: [{ label: "", value: "" }] },
  {
    id: "PositionId",
    label: "Position",
    options: [{ label: "a", value: "a" }],
  },
  { id: "TeamId", label: "Team Name", options: [{ label: "a", value: "a" }] },
  {
    id: "ConferenceId",
    label: "Conference ",
    options: [{ label: "a", value: "a" }],
  },
];

const initalManualSubmissionFormValues = [
  ...freeFormFields,
  ...dropDownFields,
].reduce((acc: any, cv) => {
  acc[cv.id] = undefined;
  return acc;
}, {});

console.log(initalManualSubmissionFormValues);

const validationSchemaObj = [...freeFormFields, ...dropDownFields].reduce(
  (acc: any, cv) => {
    acc[cv.id] = yup.number().required(`${cv.label} is required`);
    return acc;
  },
  {}
);

const validationSchema = yup.object(validationSchemaObj);

export default function ManualSubmissionForm() {
  return (
    <FormStateWrapper
      initialValues={initalManualSubmissionFormValues}
      validationSchema={validationSchema}
    >
      <>
        <h2 className="text-4xl text-white">
          Transfer Portal Prediction Model - Manual
        </h2>
        <p className="text-xl mb-[6.4rem]">
          Utilize this model to generate a transfer portal prediction for any
          arbitrary player by season stats.
        </p>
        <h2 className="text-2xl text-white">Enter Stats Manually</h2>

        {dropDownFields.map((v) => {
          return (
            <Field
              key={v.id}
              name={v.id}
              labelCopy={v.label}
              options={v.options}
              component={SelectDropDown}
            />
          );
        })}
        {freeFormFields.map((v) => {
          return (
            <Field
              key={v.id}
              id={v.id}
              name={v.id}
              labelCopy={v.label}
              type="number"
              component={TextInput}
            />
          );
        })}
      </>
    </FormStateWrapper>
  );
}
