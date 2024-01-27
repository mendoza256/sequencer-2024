interface Scales {
  [key: string]: string[];
}

export const CMajor = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];
export const DMajor = ["D5", "C#5", "B4", "A4", "G4", "F#4", "E4", "D4"];
export const Cminor = ["C5", "Bb4", "Ab4", "G4", "F4", "Eb4", "D4", "C4"];

const scales: Scales = {
  CMajor,
  DMajor,
  Cminor,
};

export default scales;
