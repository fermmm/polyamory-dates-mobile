import { QuestionData } from "./interfaces/questions";

const genderQuestion: QuestionData = {
   text: "¿Cual es tu género?",
   extraText: 'Cis singnifica: "no transexual"',
   multipleAnswersAllowed: false,
   answers: [
      {
         id: "0",
         text: "Mujer",
         extraText: "(cis)"
      },
      {
         id: "1",
         text: "Varon",
         extraText: "(cis)"
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
         text: "Mujer cis y también varon transexual",
      },
      {
         id: "5",
         text: "Varon cis y también mujer transexual",
      },
      {
         id: "6",
         text: "Otro",
      },
   ]
};

const genderLikeQuestion: QuestionData = {
   text: "¿Qué géneros te atraen y te gustaría ver en la aplicación?",
   multipleAnswersAllowed: true,
   answers: [
      {
         id: "0",
         text: "Mujer",
         extraText: "(cis)"
      },
      {
         id: "1",
         text: "Varon",
         extraText: "(cis)"
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
         text: "Otro",
      },
   ]
};

const dateWeekendQuestion: QuestionData = {
   text: "¿Los fines de semana es probable que puedas ir a una cita?",
   multipleAnswersAllowed: false,
   answers: [
      {
         id: "0",
         text: "No",
      },
      {
         id: "1",
         text: "Si, a cualquier hora",
      },
      {
         id: "2",
         text: "Si, de la tarde en adelante",
      },
      {
         id: "3",
         text: "Si, a la noche",
      }
   ]
};

const dateWeekQuestion: QuestionData = {
   text: "¿Los días de semana es probable que puedas ir a una cita?",
   multipleAnswersAllowed: false,
   answers: [
      {
         id: "0",
         text: "No",
      },
      {
         id: "1",
         text: "Si, a cualquier hora",
      },
      {
         id: "2",
         text: "Si, de las 19 en adelante",
      },
      {
         id: "3",
         text: "Si, a la noche",
      }
   ]
};

const bodyQuestion: QuestionData = {
   text: "¿Cuál es tu tipo de cuerpo?",
   multipleAnswersAllowed: false,
   answers: [
      {
         id: "0",
         text: "Delgade",
         extraText: "o mas o menos delgade"
      },
      {
         id: "1",
         text: "Un poco rellenite",
      },
      {
         id: "2",
         text: "Gordite",
      },
      {
         id: "3",
         text: "Gorde",
      },
      {
         id: "4",
         text: "Atletique",
      },
   ]
};

const bodyLikeQuestion: QuestionData = {
   text: "¿Que tipo de cuerpos te atraen?",
   multipleAnswersAllowed: true,
   answers: [
      {
         id: "0",
         text: "Delgade",
         extraText: "o mas o menos delgade"
      },
      {
         id: "1",
         text: "Un poco rellenite",
      },
      {
         id: "2",
         text: "Gordite",
      },
      {
         id: "3",
         text: "Gorde",
      },
      {
         id: "4",
         text: "Atletique",
      },
   ]
};

export const fakeProfileQuestionsPart1: QuestionData[] = [
   genderQuestion,
   genderLikeQuestion,
   dateWeekendQuestion,
   dateWeekQuestion
];

export const fakeProfileQuestionsPart2: QuestionData[] = [
   bodyQuestion,
   bodyLikeQuestion
];