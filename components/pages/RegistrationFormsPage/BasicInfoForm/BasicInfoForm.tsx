import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { withTheme, TextInput } from "react-native-paper";
import { Themed, ThemeExt } from "../../../../common-tools/themes/types/Themed";
import { Styles } from "../../../../common-tools/ts-tools/Styles";
import TitleText from "../../../common/TitleText/TitleText";
import TitleMediumText from "../../../common/TitleMediumText/TitleMediumText";
import AgeSelector from "../../../common/AgeSelector/AgeSelector";
import { formValidators } from "../../../../common-tools/formValidators/formValidators";

export interface BasicInfoProps extends Themed { }
export interface BasicInfoState {
   nameText: string;
   age: number;
   bodyHeight: number;
   targetAgeMin: number;
   targetAgeMax: number;
   targetAgeModified: boolean;
}

class BasicInfoForm extends Component<BasicInfoProps, BasicInfoState> {
   static defaultProps: Partial<BasicInfoProps> = {};
   state: BasicInfoState = {
      nameText: "",
      age: null,
      bodyHeight: null,
      targetAgeMin: 18,
      targetAgeMax: 28,
      targetAgeModified: false,
   };

   render(): JSX.Element {
      const { colors }: ThemeExt = this.props.theme as unknown as ThemeExt;
      const { nameText, age, bodyHeight, targetAgeModified, targetAgeMin, targetAgeMax }: Partial<BasicInfoState> = this.state;

      return (
         <View style={styles.mainContainer}>
            <TitleText>
               Datos básicos
            </TitleText>
            <TextInput
               label="Tu nombre o apodo"
               mode="outlined"
               value={nameText}
               onChangeText={t => this.setState({ nameText: formValidators.name(t).result.text })}
            />
            <TextInput
               label="Edad"
               mode="outlined"
               keyboardType="number-pad"
               value={age ? age.toString() : ""}
               onChangeText={t => this.setState({ age: Number(formValidators.age(t).result.text) })}
            />
            <TitleMediumText style={styles.label}>
               Tu altura en centímetros (es opcional) ej: 160
               Este dato para algunes es muy importante y a otres no les importa
            </TitleMediumText>
            <TextInput
               label="Altura (opcional)"
               mode="outlined"
               keyboardType="number-pad"
               value={bodyHeight ? bodyHeight.toString() : ""}
               onChangeText={t => this.setState({ bodyHeight: Number(formValidators.bodyHeight(t).result.text) || 0 })}
            />
            <TitleMediumText style={styles.label}>
               ¿Qué edades queres ver en la app?
            </TitleMediumText>
            <AgeSelector
               min={targetAgeModified ? targetAgeMin : age - 6}
               max={targetAgeModified ? targetAgeMax : age + 6}
               onChange={({ min, max }) =>
                  this.setState({
                     targetAgeMin: min,
                     targetAgeMax: max,
                     targetAgeModified: true
                  })
               }
            />
         </View>
      );
   }
}

const styles: Styles = StyleSheet.create({
   mainContainer: {
      padding: 20
   },
   label: {
      marginTop: 30,
      marginBottom: 0
   },
   labelLine2: {
      marginBottom: 0
   }
});

export default withTheme(BasicInfoForm);