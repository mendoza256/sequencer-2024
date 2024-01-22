import { Time } from "tone/build/esm/core/type/Units";
import * as Tone from "tone";

export function convertToStepZeroToFifteen(step: number) {
  return step % 16;
}

export function convertTransportPositionToStep(position: Time) {
  const quarterNotes = parseInt(position.split(":")[1]);
  const sixteenthNotes = parseInt(position.split(":")[2]);
  return quarterNotes * 4 + sixteenthNotes;
}

export function convertTimeToStep(time: Time) {
  return convertTransportPositionToStep(
    Tone.Time(time).toBarsBeatsSixteenths()
  );
}
