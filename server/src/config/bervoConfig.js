import * as sib from "@getbrevo/brevo";
import dotenv from "dotenv";
import { envConfig } from "./envConfig.js";
dotenv.config();

const apiInstance = new sib.TransactionalEmailsApi();
 
const apikey = apiInstance.authentications["apiKey"];
apikey.apiKey = envConfig.EMAIL_CONFIG.BREVO_SMTP_SDK_KEY;


// console.log(
//   "is email config vrevo is coming ",
//   envConfig.EMAIL_CONFIG.BREVO_SMTP_SDK_KEY,
// );

export const sendEmail = async ({ to, subject, templet }) => {
  const mail = new sib.SendSmtpEmail();

  mail.subject = subject;
  mail.to = [{ email: to }];
  mail.htmlContent = templet;
  mail.sender = {
    email: envConfig.EMAIL_CONFIG.EMAIL_FROM,
    name: "Easy Thumbnail",
  };

  try {
    const data = await apiInstance.sendTransacEmail(mail);
    return { success: true, messageId: data.body.messageId };
  } catch (error) {
    console.error("Brevo API Error Details:", error);
    return { success: true, message: "error while sending email" };
  }
};
