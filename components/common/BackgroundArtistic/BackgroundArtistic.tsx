import React, { FC, ReactNode } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../../common-tools/themes/useTheme/useTheme";
import { Styles } from "../../../common-tools/ts-tools/Styles";

interface PropsBackgroundArtistic {
   children?: ReactNode;
   useImageBackground?: boolean;
}

const BackgroundArtistic: FC<PropsBackgroundArtistic> = props => {
   const { backgroundImage, colors } = useTheme();

   if (props.useImageBackground) {
      return (
         <ImageBackground source={backgroundImage} style={styles.background}>
            {props.children}
         </ImageBackground>
      );
   } else {
      return (
         <LinearGradient
            colors={[colors.specialBackground1, colors.specialBackground2]}
            style={styles.background}
            start={[0, 0.5]}
            end={[0, 1.3]}
         >
            {props.children}
         </LinearGradient>
      );
   }
};

const styles: Styles = StyleSheet.create({
   background: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-end"
   }
});

export default BackgroundArtistic;
