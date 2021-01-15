import React, { FC, useState } from "react";
import {
   ImageProps,
   Image,
   StatusBar,
   StyleSheet,
   View,
   Dimensions,
   Platform,
   ImageBackground
} from "react-native";
import { Card, Paragraph } from "react-native-paper";
import ImagesScroll from "../ImagesScroll/ImagesScroll";
import ImagesModal from "../ImagesModal/ImagesModal";
import { Styles } from "../../../common-tools/ts-tools/Styles";
import LikeDislikeButtons from "./LikeDislikeButtons/LikeDislikeButtons";
import ScrollViewExtended from "../ScrollViewExtended/ScrollViewExtended";
import ThemeInProfileCard from "./QuestionInProfileCard/QuestionInProfileCard";
import EditButton from "./EditButton/EditButton";
import { Gender, User } from "../../../api/server/shared-tools/endpoints-interfaces/user";
import { Theme } from "../../../api/server/shared-tools/endpoints-interfaces/themes";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../../api/server/user";
import { useThemes } from "../../../api/server/themes";
import { useTheme } from "../../../common-tools/themes/useTheme/useTheme";
import { fromBirthDateToAge } from "../../../api/tools/date-tools";
import BasicScreenContainer from "../BasicScreenContainer/BasicScreenContainer";
import { CenteredMethod, LoadingAnimation } from "../LoadingAnimation/LoadingAnimation";
import { prepareUrl } from "../../../api/tools/reactQueryTools";
import { useServerInfo } from "../../../api/server/server-info";
import { toFirstUpperCase } from "../../../common-tools/js-tools/js-tools";
import { currentTheme } from "../../../config";

export interface ProfileCardProps {
   user: User;
   showLikeDislikeButtons?: boolean;
   editMode?: boolean;
   statusBarPadding?: boolean;
   onLikeClick?: () => void;
   onDislikeClick?: () => void;
}

const ProfileCard: FC<ProfileCardProps> = props => {
   const {
      showLikeDislikeButtons,
      onLikeClick,
      onDislikeClick,
      statusBarPadding,
      editMode
   }: Partial<ProfileCardProps> = props;

   const {
      name,
      images,
      birthDate,
      cityName,
      height,
      gender,
      likesWoman,
      likesMan,
      likesWomanTrans,
      likesManTrans,
      likesOtherGenders,
      profileDescription,
      isCoupleProfile,
      themesSubscribed,
      themesBlocked
   }: Partial<User> = props.user;

   const [renderImageModal, setRenderImageModal] = useState(false);
   const [imageSelected, setImageSelected] = useState(0);
   const { colors } = useTheme();
   const { navigate } = useNavigation();
   const { data: localUser, isLoading: localUserLoading } = useUser();
   const { data: allThemes, isLoading: themesLoading } = useThemes();
   const { data: serverInfo, isLoading: serverInfoLoading } = useServerInfo();

   if (localUserLoading || themesLoading || serverInfoLoading) {
      return (
         <>
            <BasicScreenContainer />
            <LoadingAnimation centeredMethod={CenteredMethod.Absolute} />
         </>
      );
   }

   const themesSubscribedInCommon: Theme[] = themesSubscribed
      ?.filter(t => localUser.themesSubscribed.find(ut => ut.themeId === t.themeId) != null)
      .map(t => allThemes.find(at => at.themeId === t.themeId))
      .filter(t => t != null);

   const themesBlockedInCommon: Theme[] = themesBlocked
      ?.filter(t => localUser.themesBlocked.find(ut => ut.themeId === t.themeId) != null)
      .map(t => allThemes.find(at => at.themeId === t.themeId))
      .filter(t => t != null);

   const finalImagesUri = images.map(uri => prepareUrl(serverInfo.imagesHost + uri));

   const interestArray: string[] = [];
   if (likesWoman) {
      interestArray.push("Mujeres");
   }
   if (likesMan) {
      interestArray.push("Varones");
   }
   if (likesWomanTrans) {
      interestArray.push("Mujeres trans");
   }
   if (likesManTrans) {
      interestArray.push("Varones trans");
   }
   if (likesOtherGenders) {
      interestArray.push("Otrx / No binarix");
   }

   let genderText: string = "";

   if (gender === Gender.Man) {
      genderText = "Varón";
   }
   if (gender === Gender.Woman) {
      genderText = "Mujer";
   }
   if (gender === Gender.TransgenderMan) {
      genderText = "Varón trans";
   }
   if (gender === Gender.TransgenderWoman) {
      genderText = "Mujer trans";
   }
   if (gender === Gender.Other) {
      genderText = "Otrx / No binarix";
   }

   return (
      <>
         <View
            style={[
               styles.mainContainer,
               { paddingBottom: showLikeDislikeButtons ? styles.mainContainer.paddingBottom : 0 }
            ]}
         >
            <View>
               <ScrollViewExtended
                  style={[styles.scrollView]}
                  showBottomGradient={true}
                  bottomGradientColor={colors.background}
                  indicatorStyle={"white"}
               >
                  <Card style={[styles.card, { backgroundColor: colors.background }]}>
                     <View>
                        <ImagesScroll
                           images={finalImagesUri}
                           style={[
                              styles.galleryScroll,
                              statusBarPadding && { marginTop: StatusBar.currentHeight }
                           ]}
                           onImageClick={(i: number) => {
                              setImageSelected(i);
                              setRenderImageModal(true);
                           }}
                           renderImage={(uri: string, imageProps: ImageProps) => (
                              <ImageBackground
                                 style={{ width: "100%", height: "100%" }}
                                 source={{ uri }}
                                 blurRadius={Platform.OS === "ios" ? 120 : 60}
                              >
                                 <Image
                                    {...imageProps}
                                    resizeMethod={"resize"}
                                    resizeMode={"contain"}
                                    key={uri}
                                 />
                              </ImageBackground>
                           )}
                        />
                        {editMode && (
                           <EditButton
                              showAtBottom
                              style={{ marginBottom: 50, marginRight: -6 }}
                              label={"Modificar fotos"}
                              onPress={() => navigate("ChangePictures")}
                           />
                        )}
                     </View>
                     <View style={styles.titleAreaContainer}>
                        <Card.Title
                           title={`${toFirstUpperCase(name)}${isCoupleProfile ? " (Pareja)" : ""}`}
                           subtitle={`${fromBirthDateToAge(birthDate)} · ${cityName}${
                              height ? " · " + height + "cm" : ""
                           }`}
                           style={{ flex: 1 }}
                           titleStyle={styles.nameText}
                           subtitleStyle={styles.basicInfoText}
                        />
                        {!editMode ? (
                           <View />
                        ) : (
                           // <Text style={[styles.compatibilityPercentage, {
                           //    borderColor: color(colors.statusOk).alpha(0.5).string(),
                           //    backgroundColor: color(colors.statusOk).alpha(0.5).string(),
                           // }]}>
                           //    99%
                           // </Text>
                           <EditButton onPress={() => navigate("ChangeBasicInfo")} />
                        )}
                        <Paragraph style={styles.interestParagraph}>
                           {isCoupleProfile ? "Pareja" : genderText} interesadx en{" "}
                           {interestArray.join(", ")}
                        </Paragraph>
                     </View>
                     <Card.Content>
                        <Paragraph style={styles.descriptionParagraph}>
                           {profileDescription}
                        </Paragraph>
                        {editMode && (
                           <EditButton
                              showAtBottom
                              absolutePosition={false}
                              label={"Modificar texto"}
                              onPress={() => navigate("ChangeProfileText")}
                           />
                        )}
                        <View style={styles.questionsContainer}>
                           {themesSubscribedInCommon?.map(theme => (
                              <ThemeInProfileCard theme={theme} key={theme.themeId} />
                           ))}
                        </View>
                        {/* <View style={styles.questionsContainer}>
                           {themesBlockedInCommon?.map(theme => (
                              <ThemeInProfileCard theme={theme} key={theme.themeId} />
                           ))}
                        </View> */}
                        {editMode && (
                           <EditButton
                              showAtBottom
                              absolutePosition={false}
                              label={"Modificar temáticas"}
                              onPress={() => navigate("ChangeQuestions")}
                           />
                        )}
                     </Card.Content>
                  </Card>
               </ScrollViewExtended>
               {showLikeDislikeButtons && (
                  <LikeDislikeButtons
                     style={styles.likeDislikeButtons}
                     onLikeClick={() => onLikeClick()}
                     onDislikeClick={() => onDislikeClick()}
                  />
               )}
            </View>
         </View>
         {renderImageModal === true && (
            <ImagesModal
               visible={renderImageModal}
               images={finalImagesUri}
               initialPage={imageSelected}
               onClose={() => setRenderImageModal(false)}
            />
         )}
      </>
   );
};

const styles: Styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 47 // The bottom padding under the like-dislike buttons (only applied when buttons are present).
   },
   scrollView: {
      flexGrow: 0
   },
   card: {
      paddingBottom: 90 // Padding in the content when scrolled to bottom to prevent like-dislike buttons from covering text.
   },
   galleryScroll: {
      height: Dimensions.get("window").height * 0.48 // This controls the height of the images area.
   },
   titleAreaContainer: {
      flexDirection: "column",
      alignItems: "flex-start"
   },
   // Not used:
   compatibilityPercentage: {
      marginRight: 30,
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      borderWidth: 0.5,
      textAlign: "center",
      textAlignVertical: "center"
   },
   nameText: {
      color: currentTheme.colors.text,
      fontFamily: currentTheme.font.light
   },
   basicInfoText: {
      color: currentTheme.colors.text,
      fontFamily: currentTheme.font.light
   },
   interestParagraph: {
      color: currentTheme.colors.text,
      fontFamily: currentTheme.font.light,
      fontSize: 11,
      marginBottom: 20,
      marginTop: -7,
      paddingLeft: 16
   },
   descriptionParagraph: {
      color: currentTheme.colors.text,
      fontFamily: currentTheme.font.light,
      marginBottom: 5,
      fontSize: 15
   },
   questionsContainer: {
      paddingTop: 10,
      flexDirection: "row",
      flexWrap: "wrap"
   },
   likeDislikeButtons: {
      alignSelf: "center", // This controls the horizontal position of the buttons.
      bottom: -28 // This controls the vertical position of the buttons.
   }
});

export default ProfileCard;
