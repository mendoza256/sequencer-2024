export type Scale = { name: string; value: string[] };
type Scales = Scale[];

export const CMajor = {
  name: "CMaj",
  value: ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"],
};
export const DMajor = {
  name: "DMaj",
  value: ["D5", "C#5", "B4", "A4", "G4", "F#4", "E4", "D4"],
};
export const Cminor = {
  name: "Cmin",
  value: ["C5", "Bb4", "Ab4", "G4", "F4", "Eb4", "D4", "C4"],
};

const scales: Scales = [CMajor, DMajor, Cminor];

export default scales;
