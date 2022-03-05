import React, { FC, useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import color from "color";
import { Styles } from "../../../common-tools/ts-tools/Styles";
import { ScreensStepper } from "../../common/ScreensStepper/ScreensStepper";
import { useTheme } from "../../../common-tools/themes/useTheme/useTheme";
import BackgroundArtistic from "../../common/BackgroundArtistic/BackgroundArtistic";
import { currentTheme } from "../../../config";
import ButtonStyled from "../../common/ButtonStyled/ButtonStyled";
import { useNavigation } from "../../../common-tools/navigation/useNavigation";
import { useWelcomeShowed } from "./tools/useWelcomeShowed";
import Svg from "../../../common-tools/svg-tools/Svg";
import screen1PortalSvg from "../../../assets/welcome_images/screen1-portal.svg";
import screen2HeartSvg from "../../../assets/welcome_images/screen2-heart.svg";
import screen3HeadSvg from "../../../assets/welcome_images/screen3-head.svg";
import screen4PoolSvg from "../../../assets/welcome_images/screen4-pool.svg";
import screen5PrimitivesSvg from "../../../assets/welcome_images/screen5-primitives.svg";
import screen5PrimitivesOverlayLeftSvg from "../../../assets/welcome_images/screen5-primitives-overlay-left.svg";
import screen5PrimitivesOverlayRightSvg from "../../../assets/welcome_images/screen5-primitives-overlay-right.svg";
import screen5PrimitivesOverlayTopSvg from "../../../assets/welcome_images/screen5-primitives-overlay-top.svg";
import screen6Heart2Svg from "../../../assets/welcome_images/screen6-heart2.svg";
import TitleText from "../../common/TitleText/TitleText";

const WelcomeTourPage: FC = () => {
   const { setAsShowed } = useWelcomeShowed();
   const { navigateWithoutHistory } = useNavigation();
   const [currentStep, setCurrentStep] = useState<number>(0);
   const [amountToRender, setAmountToRender] = useState<number>(2);
   const { colors } = useTheme();
   const totalSteps = 6;

   const handleContinuePress = useCallback(() => {
      if (currentStep + 1 < totalSteps) {
         setCurrentStep(currentStep + 1);
         setAmountToRender(amountToRender + 1);
      } else {
         navigateWithoutHistory("Login");
      }
   }, [currentStep]);

   useEffect(() => {
      setAsShowed();
   }, []);

   const topColor = color(colors.background).lightness(82).toString();

   const renderButtonContinue = (props?: { color?: string }) => {
      const { color = colors.textLogin } = props ?? {};

      return (
         <View style={styles.buttonContainer}>
            <ButtonStyled
               color={color}
               onPress={handleContinuePress}
               style={[styles.button, { borderColor: color }]}
               contentStyle={styles.buttonContent}
            >
               <Text style={[styles.buttonText, { color }]}>Entendido</Text>
            </ButtonStyled>
         </View>
      );
   };

   return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
         <ScreensStepper
            currentScreen={currentStep}
            onScreenChange={newStep => setCurrentStep(newStep)}
            swipeEnabled
         >
            {amountToRender >= 1 && (
               <BackgroundArtistic
                  gradientColor1="#9A55FF"
                  gradientColor2="#6D94FF"
                  gradientStart={0}
                  gradientEnd={1}
               >
                  <View style={styles.mainContainer}>
                     <View style={styles.imageContainer}>
                        <Svg
                           src={screen1PortalSvg}
                           style={{ transform: [{ scale: 1.5 }, { translateX: -10 }] }}
                        />
                     </View>
                     <View style={styles.textContainer}>
                        <TitleText style={styles.title} adjustsFontSizeToFit>
                           BIENVENIDX!
                        </TitleText>
                        <Text style={styles.text}>
                           GroupDate es la primera app de citas grupales. Cuando se gustan entre
                           muchxs se habilita un chat grupal.
                        </Text>
                        {renderButtonContinue()}
                     </View>
                  </View>
               </BackgroundArtistic>
            )}
            {amountToRender >= 2 && (
               <View style={[styles.mainContainer, { backgroundColor: colors.specialBackground3 }]}>
                  <View style={styles.imageContainer}>
                     <Svg
                        src={screen2HeartSvg}
                        style={{ transform: [{ scale: 0.9 }, { translateX: -6 }] }}
                     />
                  </View>
                  <View style={styles.textContainer}>
                     <TitleText style={[styles.title, { color: "#502E92" }]}>
                        Es para todxs
                     </TitleText>
                     <Text style={[styles.text, { color: "#502E92" }]}>
                        Todas las orientaciones y tipos de vínculos pueden ser parte de una cita
                        grupal.
                     </Text>
                     {renderButtonContinue({ color: "#502E92" })}
                  </View>
               </View>
            )}
            {amountToRender >= 3 && (
               <View style={[styles.mainContainer, { backgroundColor: colors.specialBackground4 }]}>
                  <View style={styles.imageContainer}>
                     <Svg
                        src={screen3HeadSvg}
                        style={{
                           transform: [{ scale: 2.15 }, { translateX: 15 }, { translateY: 36 }]
                        }}
                     />
                  </View>
                  <View style={styles.textContainer}>
                     <TitleText style={[styles.title, { color: "#502E92" }]}>
                        SIN PRECONCEPTOS
                     </TitleText>
                     <Text style={[styles.text, { color: "#502E92" }]}>
                        No hace falta que se gusten todxs entre sí al 100% ni que cumplas un rol o
                        una expectativa en particular.
                     </Text>
                     {renderButtonContinue({ color: "#502E92" })}
                  </View>
               </View>
            )}
            {amountToRender >= 4 && (
               <BackgroundArtistic
                  gradientColor1="#9A55FF"
                  gradientColor2="#6D94FF"
                  gradientStart={0}
                  gradientEnd={1}
               >
                  <View style={styles.mainContainer}>
                     <View style={styles.imageContainer}>
                        <Svg
                           src={screen4PoolSvg}
                           style={{
                              transform: [{ scale: 0.9 }, { translateY: 0 }]
                           }}
                        />
                     </View>
                     <View style={styles.textContainer}>
                        <TitleText style={styles.title}>COMPARTIR Y DIVERTIRNOS</TitleText>
                        <Text style={styles.text}>
                           Es para conocernos todxs a la vez, probar que pasa cuando no formamos
                           parejas, probar una forma de pensar en grupo
                        </Text>
                        {renderButtonContinue()}
                     </View>
                  </View>
               </BackgroundArtistic>
            )}
            {amountToRender >= 5 && (
               <BackgroundArtistic
                  gradientColor1="#9A55FF"
                  gradientColor2="#6D94FF"
                  gradientStart={0}
                  gradientEnd={1}
               >
                  <View style={styles.mainContainer}>
                     <View style={styles.imageContainer}>
                        <Svg
                           src={screen5PrimitivesSvg}
                           style={{
                              transform: [{ scale: 0.95 }, { translateY: -25 }]
                           }}
                        />
                        <Svg
                           src={screen5PrimitivesOverlayLeftSvg}
                           style={{ position: "absolute", left: -15 }}
                           width={"40%"}
                        />
                        <Svg
                           src={screen5PrimitivesOverlayRightSvg}
                           style={{ position: "absolute", right: -15, top: 10 }}
                           width={"40%"}
                        />
                        <Svg
                           src={screen5PrimitivesOverlayTopSvg}
                           style={{ position: "absolute", top: 20 }}
                           height={"25%"}
                        />
                     </View>
                     <View style={styles.textContainer}>
                        <TitleText style={styles.title}>ACERCARNOS{"\n"}A LO NATURAL</TitleText>
                        <Text style={styles.text}>
                           El poliamor (no-monogamia) en grupo fue lo más común hasta un cambio en
                           la forma de pensar hace 10 mil años.
                        </Text>
                        {renderButtonContinue()}
                     </View>
                  </View>
               </BackgroundArtistic>
            )}
            {amountToRender >= 6 && (
               <BackgroundArtistic
                  gradientColor1="#9A55FF"
                  gradientColor2="#6D94FF"
                  gradientStart={0}
                  gradientEnd={1}
               >
                  <View style={styles.mainContainer}>
                     <View style={styles.imageContainer}>
                        <Svg
                           src={screen6Heart2Svg}
                           style={{
                              transform: [{ scale: 2.3 }, { translateX: -17 }, { translateY: 10 }]
                           }}
                        />
                     </View>
                     <View style={styles.textContainer}>
                        <TitleText style={styles.title}>GRATIS Y ÉTICA</TitleText>
                        <Text style={styles.text}>
                           Esta app siempre será gratis y ética. Si te gusta, no olvides mencionarla
                           en las redes o dónde lo creas oportuno.
                        </Text>
                        {renderButtonContinue()}
                     </View>
                  </View>
               </BackgroundArtistic>
            )}
         </ScreensStepper>
      </View>
   );
};

const padding = 40;

const styles: Styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
   },
   imageContainer: {
      width: "100%",
      height: "60%",
      paddingTop: "20%",
      alignItems: "center",
      justifyContent: "center"
   },
   logoSvg: {
      width: "100%",
      height: 100
   },
   textContainer: {
      width: "100%",
      height: "50%"
   },
   title: {
      textAlign: "center",
      fontFamily: currentTheme.font.semiBold,
      textTransform: "uppercase",
      fontSize: 32,
      color: currentTheme.colors.textLogin,
      marginBottom: 30,
      width: "100%",
      paddingLeft: 10,
      paddingRight: 10
   },
   text: {
      textAlign: Platform.OS === "ios" ? "justify" : "center",
      fontFamily: currentTheme.font.medium,
      fontSize: 17,
      lineHeight: 25,
      color: currentTheme.colors.textLogin,
      paddingLeft: padding,
      paddingRight: padding
   },
   textBold: {
      textAlign: "center",
      fontFamily: currentTheme.font.semiBold,
      fontSize: 18,
      lineHeight: 25,
      color: currentTheme.colors.textLogin
   },
   bigText: {
      textAlign: Platform.OS === "ios" ? "justify" : "center",
      fontFamily: currentTheme.font.medium,
      fontSize: 40
   },
   buttonContainer: {
      position: "absolute",
      bottom: 60,
      width: "100%",
      paddingLeft: padding,
      paddingRight: padding
   },
   button: {
      borderWidth: 1
   },
   buttonContent: {
      height: 34,
      alignItems: "center",
      justifyContent: "center"
   },
   buttonText: {
      fontSize: 15,
      letterSpacing: 0.5,
      lineHeight: 15
   }
});

export default WelcomeTourPage;
