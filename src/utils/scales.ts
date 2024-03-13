export type Scale = { name: string; value: string[] };
type Scales = Scale[];

export const CMajor = {
  name: "CMaj",
  value: ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"],
};
export const Cminor = {
  name: "Cmin",
  value: ["C5", "Bb4", "Ab4", "G4", "F4", "Eb4", "D4", "C4"],
};
export const DMajor = {
  name: "DMaj",
  value: ["D5", "C#5", "B4", "A4", "G4", "F#4", "E4", "D4"],
};
export const Dminor = {
  name: "Dmin",
  value: ["D5", "C5", "Bb4", "A4", "G4", "F4", "Eb4", "D4"],
};

export const Emajor = {
  name: "EMaj",
  value: ["E5", "D#5", "C#5", "B4", "A4", "G#4", "F#4", "E4"],
};

export const Fmajor = {
  name: "FMaj",
  value: ["F5", "E5", "D5", "C5", "B4", "A4", "G4", "F4"],
};

export const Fminor = {
  name: "Fmin",
  value: ["F5", "E5", "Db5", "C5", "B4", "Ab4", "G4", "F4"],
};

export const GMajor = {
  name: "GMaj",
  value: ["G5", "F#5", "E5", "D5", "C5", "B4", "A4", "G4"],
};

export const Gminor = {
  name: "Gmin",
  value: ["G5", "F5", "Eb5", "D5", "C5", "Bb4", "Ab4", "G4"],
};

export const AMajor = {
  name: "AMaj",
  value: ["A5", "G#5", "F#5", "E5", "D5", "C#5", "B4", "A4"],
};

export const Aminor = {
  name: "Amin",
  value: ["A5", "G5", "F5", "E5", "D5", "C5", "Bb4", "A4"],
};

export const BMajor = {
  name: "BMaj",
  value: ["B5", "A#5", "G#5", "F#5", "E5", "D#5", "C#5", "B4"],
};

export const Bminor = {
  name: "Bmin",
  value: ["B5", "A5", "G5", "F#5", "E5", "D5", "C5", "B4"],
};

const scales: Scales = [
  CMajor,
  Cminor,
  DMajor,
  Dminor,
  Emajor,
  Fmajor,
  Fminor,
  GMajor,
  Gminor,
  AMajor,
  Aminor,
  BMajor,
  Bminor,
];

export default scales;
