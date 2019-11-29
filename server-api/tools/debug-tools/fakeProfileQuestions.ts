import { QuestionData } from "./interfaces/questions";

const genderQuestion: QuestionData = {
   text: "¿Cual es tu género?",
   shortVersion: "Su género",
   answers: [
      {
         id: "0",
         text: "Mujer",
      },
      {
         id: "1",
         text: "Varon",
      },
      {
         id: "2",
         text: "Mujer transexual",
      },
      {
         id: "3",
         text: "Varon transexual",
      },
      {
         id: "4",
         text: "Otre / No binarie",
      },
   ]
};

const genderLikeQuestion: QuestionData = {
   text: "¿Qué géneros te atraen?",
   shortVersion: "Le atraen",
   multipleAnswersAllowed: true,
   answers: [
      {
         id: "0",
         text: "Mujeres",
      },
      {
         id: "1",
         text: "Varones",
      },
      {
         id: "2",
         text: "Mujeres transexuales",
      },
      {
         id: "3",
         text: "Varones transexuales",
      },
      {
         id: "4",
         text: "Otres / No binaries",
      },
   ]
};

const intentionsQuestion: QuestionData = {
   text: "¿Qué te gustaría encontrar en las citas grupales que organiza esta app?",
   shortVersion: "Vinculos aceptados",
   answers: [
      {
         id: "0",
         text: "Vinculos de cualquier tipo incluido sexuales",
         shortVersion: "De cualquier tipo incluido sexuales",
      },
      {
         id: "1",
         text: "Vinculos no sexuales",
      }
   ],
   incompatibilitiesBetweenAnswers: {
      "0": ["1"],
      "1": ["0"]
   },
};

const companyQuestion: QuestionData = {
   text: "¿Iriías acompañade a las citas grupales de esta app?",
   shortVersion: "Iria a la cita con",
   answers: [
      {
         id: "0",
         text: "Sole",
      },
      {
         id: "1",
         text: "Con mi pareja",
      },
      {
         id: "2",
         text: "Con une amige",
      },
      {
         id: "3",
         text: "Con 2 o más personas",
      }
   ]
};

export const fakeProfileQuestionsPart: QuestionData[] = [
   genderQuestion,
   genderLikeQuestion,
   intentionsQuestion,
   companyQuestion,
];