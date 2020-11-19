import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { withTheme } from "react-native-paper";
import { Themed, ThemeExt } from "../../../common-tools/themes/types/Themed";
import { Styles } from "../../../common-tools/ts-tools/Styles";
import { User } from "../../../api/typings/User";
import { NavigationScreenProp, NavigationContainerProps } from "@react-navigation/stack";
import ProfileCard from "../../common/ProfileCard/ProfileCard";
import ButtonBack from "../../common/ButtonBack/ButtonBack";

export interface Props extends Themed, NavigationContainerProps {}
export interface State {}

class ProfilePage extends Component<Props, State> {
   static defaultProps: Partial<Props> = {};

   render(): JSX.Element {
      const { colors }: ThemeExt = (this.props.theme as unknown) as ThemeExt;
      const { getParam }: StackNavigationProp<Record<string, {}>> = this.props.navigation;
      const user: User = getParam("user");
      const editMode: boolean = getParam("editMode");

      return (
         <>
            <ButtonBack />
            <ProfileCard user={user} editMode={editMode} statusBarPadding />
         </>
      );
   }
}

const styles: Styles = StyleSheet.create({});

export default withTheme(ProfilePage);
