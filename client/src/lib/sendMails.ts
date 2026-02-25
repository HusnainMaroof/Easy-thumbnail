import nodemailer from "nodemailer";
import { sendEmail } from "../config/brevo";
import { ServiceResponse } from "../service/auth.service";

export const sendOtpEmail = async (
  email: string,
  otp: string,
  subject: string,
): Promise<ServiceResponse> => {
  let templet = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify your email - EasyThumbnail</title>
    <style>
        /* Typography Fallbacks */
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@700;900&display=swap');

        body {
            margin: 0;
            padding: 0;
            background-color: #FDFDFF; /* Canvas White from style guide */
            font-family: 'Lexend', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #000000;
        }

        /* Mobile Adjustments */
        @media screen and (max-width: 600px) {
            .container { width: 100% !important; border-width: 2px !important; }
            .header-text { font-size: 24px !important; }
            .otp-box { font-size: 28px !important; letter-spacing: 6px !important; padding: 12px !important; }
        }

        .brutal-shadow {
            box-shadow: 8px 8px 0px 0px #000000 !important;
        }
    </style>
</head>
<body style="background-color: #FDFDFF; padding: 20px;">
    
    <!-- Preheader -->
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
        Your EasyThumbnail verification code is ${otp}.
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
            <td align="center">
                
                <!-- Main Card Container -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="550" class="container" 
                    style="width:550px; background:#FFFFFF; border:4px solid #000000; box-shadow: 10px 10px 0px 0px #000000;">
                    
                    <!-- BRAND HEADER -->
                    <tr>
                        <td align="center" style="padding: 30px 20px; background-color: #88AAEE; border-bottom: 4px solid #000000;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="background-color: #000000; padding: 8px 15px; transform: rotate(-1deg);">
                                        <span style="color: #F4E041; font-size: 24px; font-weight: 900; text-transform: uppercase; font-style: italic;">
                                            EasyThumbnail
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- CONTENT SECTION -->
                    <tr>
                        <td style="padding: 40px 30px; text-align: center;">
                            <h2 style="font-size: 28px; font-weight: 900; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: -1px;">
                                Verify your email
                            </h2>
                            <p style="font-size: 16px; font-weight: 700; color: #666666; margin-bottom: 30px;">
                                Use the code below to complete your sign-up process.
                            </p>

                            <!-- OTP CODE BOX -->
                            <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td align="center" style="background-color: #F4E041; border: 4px solid #000000; padding: 20px 30px; box-shadow: 5px 5px 0px 0px #000000;">
                                        <span style="font-family: 'Courier New', monospace; font-size: 36px; font-weight: 900; letter-spacing: 10px; color: #000000;">
                                            ${otp}
                                        </span>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size: 13px; font-weight: 700; color: #999999; line-height: 1.5;">
                                This code expires in <span style="color: #FF6B6B;">10 minutes</span>.<br>
                                If you didn’t request this, you can safely ignore this email.
                            </p>
                        </td>
                    </tr>

                    <!-- TROUBLESHOOTING / LINK -->
                    <tr>
                        <td style="padding: 0 30px 40px 30px; text-align: center;">
                            <div style="background-color: #A7F3D0; border: 2px solid #000000; padding: 15px; font-size: 12px; font-weight: 700;">
                                <span style="display:block; margin-bottom: 5px; text-transform: uppercase;">Trouble with the code?</span>
                                <a href="{{VERIFY_URL}}" style="color: #000000; word-break: break-all; text-decoration: underline;">{{VERIFY_URL}}</a>
                            </div>
                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td style="padding: 20px; background-color: #000000; text-align: center;">
                            <p style="color: #FFFFFF; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0;">
                                EasyThumbnail — Don’t share your code.
                            </p>
                            <p style="margin-top: 5px;">
                                <a href="https://www.google.com" style="color: #A7F3D0; font-size: 11px; font-weight: 900; text-decoration: none; text-transform: uppercase;">Contact Support</a>
                            </p>
                        </td>
                    </tr>

                </table>
                <!-- /Card Container -->

                <p style="margin-top: 20px; font-size: 10px; font-weight: 700; color: #CCCCCC; text-transform: uppercase;">
                    &copy; 2025 EasyThumbnail Studio
                </p>

            </td>
        </tr>
    </table>
</body>
</html>`;

  try {
    const res = await sendEmail({ to: email, subject, templet });

    console.log(" otp Email Sneded Successfully");
    return {
      success: true,
      message: "otp Email Sneded Successfully",
      data: res,
    };
  } catch (error) {
    console.log("otp EmaiL Error :", error);

    return { success: false, message: "Otp Email Error", data: error };
  }
};
