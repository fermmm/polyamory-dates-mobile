import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { withTheme } from "react-native-paper";
import { Themed, ThemeExt } from "../../../common-tools/themes/types/Themed";
import { Styles } from "../../../common-tools/ts-tools/Styles";
import AppBarHeader from "../../common/AppBarHeader/AppBarHeader";
import ProfileDescriptionForm from "./ProfileDescriptionForm/ProfileDescriptionForm";
import { ScreensStepper } from "../../common/ScreensStepper/ScreensStepper";
import DialogError from "../../common/DialogError/DialogError";
import BasicScreenContainer from "../../common/BasicScreenContainer/BasicScreenContainer";
import BasicInfoForm, { BasicInfoState } from "./BasicInfoForm/BasicInfoForm";
import { NavigationScreenProp, NavigationContainerProps } from "react-navigation";
import ProfilePicturesForm from "./ProfilePicturesForm/ProfilePicturesForm";

export interface RegistrationFormsProps extends Themed, NavigationContainerProps { }
export interface RegistrationFormsState {
   currentStep: number;
   showIncompleteError: boolean;
   profileDescription: string;
   basicInfoFormData: BasicInfoState;
   pictures: string[];
   errorsBasicInfo: string;
   errorsProfilePictures: string;
}

class RegistrationFormsPage extends Component<RegistrationFormsProps, RegistrationFormsState> {
   static defaultProps: Partial<RegistrationFormsProps> = {};
   formsCompleted: boolean[] = [];

   state: RegistrationFormsState = {
      currentStep: 0,
      showIncompleteError: false,
      profileDescription: null,
      basicInfoFormData: null,
      pictures: null,
      errorsBasicInfo: "Tenés que completar el formulario",
      errorsProfilePictures: null,
   };

   render(): JSX.Element {
      const { colors }: ThemeExt = this.props.theme as unknown as ThemeExt;
      const { navigate }: NavigationScreenProp<{}> = this.props.navigation;
      const { 
         currentStep, 
         showIncompleteError, 
         profileDescription, 
         errorsBasicInfo, 
         errorsProfilePictures 
      }: Partial<RegistrationFormsState> = this.state;

      return (
         <>
            <AppBarHeader title={"Nueva cuenta"} />
            <ScreensStepper
               currentScreen={currentStep}
               swipeEnabled={false}
               onScreenChange={(newStep) => this.setState({ currentStep: newStep })}
            >
               <BasicScreenContainer
                  showBottomGradient={true}
                  bottomGradientColor={colors.background}
                  onContinuePress={() => errorsBasicInfo == null ? this.setState({ currentStep: 1 }) : this.setState({showIncompleteError: true})}
                  showContinueButton
               >
                  <BasicInfoForm 
                     onChange={(formData, error) => this.setState({basicInfoFormData: formData, errorsBasicInfo: error})}
                  />
               </BasicScreenContainer>
               <BasicScreenContainer
                  showBottomGradient={true}
                  bottomGradientColor={colors.background}
                  onBackPress={() => this.setState({ currentStep: 0 })}
                  onContinuePress={() => errorsProfilePictures == null ? this.setState({ currentStep: 2 }) : this.setState({showIncompleteError: true})}
                  showBackButton
                  showContinueButton
               >
                  <ProfilePicturesForm 
                     onChange={(pictures, error) => this.setState({pictures, errorsProfilePictures: error})}
                  />
               </BasicScreenContainer>
               <BasicScreenContainer
                  showBottomGradient={true}
                  bottomGradientColor={colors.background}
                  onBackPress={() => this.setState({ currentStep: 1 })}
                  onContinuePress={() => navigate("Questions")}
                  showBackButton
                  showContinueButton
               >
                  <ProfileDescriptionForm
                     text={profileDescription}
                     onChange={t => this.setState({profileDescription: t})}
                  />
               </BasicScreenContainer>
            </ScreensStepper>
            <DialogError
               visible={showIncompleteError}
               onDismiss={() => this.setState({ showIncompleteError: false })}
            >
               {errorsBasicInfo || errorsProfilePictures}
            </DialogError>
         </>

      );
   }
}

const styles: Styles = StyleSheet.create({

});

export default withTheme(RegistrationFormsPage);