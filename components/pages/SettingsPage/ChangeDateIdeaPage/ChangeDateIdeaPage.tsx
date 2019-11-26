import React, { Component } from "react";
import { withTheme } from "react-native-paper";
import { Themed } from "../../../../common-tools/themes/types/Themed";
import BasicScreenContainer from "../../../common/BasicScreenContainer/BasicScreenContainer";
import { NavigationInjectedProps, NavigationScreenProp, withNavigation } from "react-navigation";
import DialogError from "../../../common/DialogError/DialogError";
import AppBarHeader from "../../../common/AppBarHeader/AppBarHeader";
import DateIdeaForm, { DateIdeaState } from "../../RegistrationFormsPage/DateIdeaForm/DateIdeaForm";

interface ChangeDateIdeaPageProps extends Themed, NavigationInjectedProps { }
interface ChangeDateIdeaPageState {
   dateIdeaFormData: DateIdeaState;
   error: string;
   showError: boolean;
}

class ChangeDateIdeaPage extends Component<ChangeDateIdeaPageProps, ChangeDateIdeaPageState> {
   state: ChangeDateIdeaPageState = {
      dateIdeaFormData: null,
      error: null,
      showError: false
   };

   render(): JSX.Element {
      return (
         <>
            <AppBarHeader title={"Modificar idea de cita"} onBackPress={() => this.onBackPress()} />
            <BasicScreenContainer>
               <DateIdeaForm
                  onChange={(data, error) => this.setState({ dateIdeaFormData: data, error })}
               />
            </BasicScreenContainer>
            <DialogError
               visible={this.state.showError}
               onDismiss={() => this.setState({ showError: false })}
            >
               {this.state.error}
            </DialogError>
         </>
      );
   }

   onBackPress(): void {
      const { goBack }: NavigationScreenProp<{}> = this.props.navigation;
      if (this.state.error == null) {
         // Send changes to server here
         goBack();
      } else {
         this.setState({ showError: true });
      }
   }
}

export default withNavigation(withTheme(ChangeDateIdeaPage));