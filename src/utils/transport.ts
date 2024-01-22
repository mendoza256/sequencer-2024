import { Time } from "tone/build/esm/core/type/Units";

export function convertTransportPositionToStep(position: Time) {
  const quarterNotes = parseInt(position.split(":")[0]);
  const sixteenthNotes = parseInt(position.split(":")[1]);
  return quarterNotes * 4 + sixteenthNotes;
}
