const allSymptoms = [
   "good",
   "no health issue",
   " fever",
   "dry cough",
   "tiredness",
   "aches and pains",
   "sore throat",
   "diarrhoea",
   "conjunctivitis",
   "headache",
   "loss of taste or smell",
   "a rash on skin, or discolouration of fingers or toes",
   " difficulty breathing or shortness of breath",
   "chest pain or pressure",
   "loss of speech or movement",
];
const symptoms = allSymptoms.map((symptom) => ({
   value: symptom,
   label: symptom,
}));

export { symptoms };
