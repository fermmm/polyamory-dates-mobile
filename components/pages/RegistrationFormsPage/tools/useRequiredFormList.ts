import { useEffect, useState } from "react";
import {
   ProfileStatusServerResponse,
   UserPropAsQuestion
} from "../../../../api/server/shared-tools/endpoints-interfaces/user";
import { EditableUserPropKey } from "../../../../api/server/shared-tools/validators/user";
import { usePropsAsQuestions } from "../../../../api/server/user";
import { mergeArraysAt } from "../../../../common-tools/js-tools/js-tools";
import { ParamsRegistrationFormsPage } from "../RegistrationFormsPage";

/**
 * Get list of registration screens names to show based on a requirements list (requirements source).
 */
export const useRequiredFormList = (
   requirementSource: {
      fromProfileStatus?: ProfileStatusServerResponse;
      fromParams?: ParamsRegistrationFormsPage;
   } = {}
): RequiredScreensResult => {
   /**
    * The list contains the screens name with the user props that each screen is related with (if any).
    * Also this list determines the order in which the screens will be displayed.
    */
   const formsForProps: FormsAndTheirProps = {
      GenderForm: ["gender"],
      TargetGenderForm: [
         "likesWoman",
         "likesMan",
         "likesWomanTrans",
         "likesManTrans",
         "likesOtherGenders"
      ],
      CoupleProfileForm: ["isCoupleProfile"],
      ThemesAsQuestionsForms: [],
      UnknownPropsQuestionForms: [],
      DateIdeaForm: ["dateIdea"],
      BasicInfoForm: [
         "name",
         "birthDate",
         "height",
         "locationLat",
         "locationLon",
         "cityName",
         "country"
      ],
      FiltersForm: ["targetAgeMin", "targetAgeMax", "targetDistance"],
      ProfileImagesForm: ["images"],
      ProfileDescriptionForm: ["profileDescription"]
   };

   const [formsRequired, setFormsRequired] = useState<string[]>([]);
   const { data: allPropsAsQuestions, isLoading } = usePropsAsQuestions({
      config: {
         enabled: requirementSource.fromParams == null
      }
   });
   const [unknownPropsQuestions, setUnknownPropsQuestions] = useState<string[]>([]);
   const [themesAsQuestionsToShow, setThemesAsQuestionsToShow] = useState<string[]>([]);

   useEffect(() => {
      if (
         requirementSource.fromParams != null ||
         requirementSource.fromProfileStatus == null ||
         !allPropsAsQuestions
      ) {
         return;
      }

      /**
       * Only include the required elements (user may have an already started registration
       * process before and not all the forms are required to be rendered)
       */
      let _formsRequired: string[] = getOnlyRequired(
         Object.keys(formsForProps) as RegistrationFormName[],
         formsForProps,
         requirementSource.fromProfileStatus.missingEditableUserProps
      );

      /*
       * The server could return props that are not known by the client but are present in the question list, this means
       * we should show the question and update the required props. Here we filter the unknown props to get only the ones
       * that are questions.
       */
      const unknownProps = getUnknownQuestionsProps(
         requirementSource.fromProfileStatus.missingEditableUserProps,
         formsForProps,
         allPropsAsQuestions
      );

      /**
       * Replace "UnknownPropsQuestionForms" with the list of unknown props, if there are no unknown props then
       * "UnknownPropsQuestionForms" gets removed anyway.
       */
      _formsRequired = mergeArraysAt(
         _formsRequired.indexOf("UnknownPropsQuestionForms"),
         unknownProps,
         _formsRequired,
         { replace: true }
      );

      /**
       * Replace "ThemesAsQuestionsForms" with the list of theme as questions ids, if there are none then
       * "ThemesAsQuestionsForms" gets removed anyway.
       */
      _formsRequired = mergeArraysAt(
         _formsRequired.indexOf("ThemesAsQuestionsForms"),
         requirementSource.fromProfileStatus.notShowedThemeQuestions,
         _formsRequired,
         { replace: true }
      );

      setFormsRequired(_formsRequired);
      setUnknownPropsQuestions(unknownProps);
      setThemesAsQuestionsToShow(requirementSource.fromProfileStatus.notShowedThemeQuestions ?? []);
   }, [requirementSource.fromProfileStatus, allPropsAsQuestions]);

   return {
      isLoading,
      formsRequired:
         requirementSource.fromParams != null
            ? requirementSource.fromParams?.formsToShow
            : formsRequired,
      knownFormsWithPropsTheyChange: formsForProps,
      unknownPropsQuestions,
      themesAsQuestionsToShow
   };
};

export interface RequiredScreensResult {
   isLoading: boolean;
   /**
    * This list contains all form names of the forms that are required to be rendered, in order.
    * For the themes as questions, the theme id is present.
    * For the unknown props that are questions, the prop is present.
    * Also the same information of this list is present divided into the other 3 lists:
    *    knownFormsWithPropsTheyChange
    *    unknownQuestionsProps
    *    themesAsQuestionsToShow
    */
   formsRequired: string[];
   knownFormsWithPropsTheyChange: FormsAndTheirProps;
   unknownPropsQuestions: string[];
   themesAsQuestionsToShow: string[];
}

export type FormsAndTheirProps = Partial<
   Record<RegistrationFormName, Array<EditableUserPropKey | string>>
>;

export type RegistrationFormName =
   | "BasicInfoForm"
   | "FiltersForm"
   | "ProfileImagesForm"
   | "DateIdeaForm"
   | "ProfileDescriptionForm"
   | "ThemeQuestionForm"
   | "TargetGenderForm"
   | "GenderForm"
   | "CoupleProfileForm"
   | "ThemesAsQuestionsForms"
   | "UnknownPropsQuestionForms";

function getUnknownQuestionsProps(
   missingEditableUserProps: string[],
   formsForProps: FormsAndTheirProps,
   allPropsAsQuestions: UserPropAsQuestion[]
): string[] {
   return missingEditableUserProps.filter(missingProp =>
      isUnknownQuestionProp(missingProp, formsForProps, allPropsAsQuestions)
   );
}

function isUnknownQuestionProp(
   prop: string,
   formsForProps: FormsAndTheirProps,
   allPropsAsQuestions: UserPropAsQuestion[]
): boolean {
   const isQuestionProp =
      allPropsAsQuestions.filter(q => q.answers.find(a => a.propName === prop) != null).length > 0;
   return Object.values(formsForProps).filter(p => p.includes(prop)).length === 0 && isQuestionProp;
}

function getOnlyRequired(
   formNames: RegistrationFormName[],
   formsForProps: FormsAndTheirProps,
   missingProps: EditableUserPropKey[]
): RegistrationFormName[] {
   return formNames.filter(formName => {
      // These forms will be included always because are removed in another place
      if (formName === "UnknownPropsQuestionForms" || formName === "ThemesAsQuestionsForms") {
         return true;
      }
      const propsOfForm = formsForProps[formName] as EditableUserPropKey[];
      const formIsRequired = propsOfForm.some(prop => missingProps.includes(prop));
      return formIsRequired;
   });
}