import { httpRequest } from "../../../tools/httpRequest";

export async function checkFacebookToken(token: string) {
   const response: { id: string; name: string } = await httpRequest({
      baseURL: `https://graph.facebook.com/me?access_token=${token}`,
      errorResponseSilent: true,
      handleErrors: true
   });

   return { valid: response?.name != null };
}
