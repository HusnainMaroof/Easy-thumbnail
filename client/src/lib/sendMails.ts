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
      error: false,
      message: "otp Email Sneded Successfully",
      data: res,
    };
  } catch (error) {
    console.log("otp EmaiL Error :", error);

    return {
      success: false,
      error: true,
      message: "Otp Email Error",
      data: error,
    };
  }
};

export const sendResetPassEmail = async (
  email: string,
  link: string,
  subject: string,
): Promise<ServiceResponse> => {
  let templet = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - EasyThumbnail</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@700;900&display=swap');

        body {
            margin: 0;
            padding: 0;
            background-color: #FDFDFF;
            font-family: 'Lexend', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #000000;
        }

        /* Mobile Optimization */
        @media screen and (max-width: 600px) {
            .container { width: 100% !important; border-width: 3px !important; }
            .header-padding { padding: 30px 10px !important; }
            .reset-btn { width: 100% !important; padding: 15px !important; font-size: 16px !important; }
            .logo-text { font-size: 26px !important; }
            .logo-box-text { font-size: 22px !important; }
        }
    </style>
</head>
<body style="background-color: #FDFDFF; padding: 20px;">
    
    <!-- Preheader -->
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
        Click the link to securely reset your EasyThumbnail password.
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
            <td align="center">
                
                <!-- Main Card Container -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="550" class="container" 
                    style="width:550px; background:#FFFFFF; border:5px solid #000000; box-shadow: 12px 12px 0px 0px #000000;">
                    
                    <!-- BRAND HEADER (Blue Section) -->
                    <tr>
                        <td align="center" style="padding: 50px 20px; background-color: #88AAEE; border-bottom: 5px solid #000000;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <!-- "EASY" Text -->
                                    <td style="padding-right: 12px; vertical-align: middle;">
                                        <span class="logo-text" style="color: #000000; font-size: 36px; font-weight: 900; text-transform: uppercase; letter-spacing: -2px;">
                                            Easy
                                        </span>
                                    </td>
                                    <!-- "THUMBNAIL" Yellow Box with Simulated Shadow -->
                                    <td style="vertical-align: middle;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td style="padding: 4px 0 0 4px; background-color: #000000;">
                                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td style="background-color: #F4E041; border: 3px solid #000000; padding: 6px 15px; margin: -4px 0 0 -4px;">
                                                                <span class="logo-box-text" style="color: #000000; font-size: 30px; font-weight: 900; text-transform: uppercase; font-style: italic; letter-spacing: -1px; display: block; transform: rotate(-1deg);">
                                                                    Thumbnail
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- CONTENT SECTION -->
                    <tr>
                        <td style="padding: 60px 40px; text-align: center;">
                            <h2 style="font-size: 32px; font-weight: 900; text-transform: uppercase; margin: 0 0 20px 0; letter-spacing: -1px; color: #000000;">
                                Reset Password
                            </h2>
                            <p style="font-size: 16px; font-weight: 700; color: #555555; margin-bottom: 40px; line-height: 1.4;">
                                We received a request to reset your password. <br>Click the button below to secure your account.
                            </p>

                            <!-- ACTION BUTTON (Safety Yellow with Simulated Shadow) -->
                            <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 40px;">
                                <tr>
                                    <td style="padding: 6px 0 0 6px; background-color: #000000;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td align="center" style="background-color: #F4E041; border: 4px solid #000000; padding: 0;">
                                                    <a href="${link}" target="_blank" class="reset-btn" style="display: block; padding: 18px 40px; color: #000000; text-decoration: none; font-size: 18px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">
                                                        Set New Password
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size: 14px; font-weight: 700; color: #888888; margin-bottom: 50px;">
                                For your security, this link will expire in <span style="color: #FF6B6B;">30 minutes</span>.<br>
                                If you didn’t request this, your password will remain unchanged.
                            </p>

                            <!-- TROUBLE BOX (Mint Green Section) -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center" style="background-color: #A7F3D0; border: 4px solid #000000; padding: 20px;">
                                        <p style="font-size: 13px; font-weight: 900; text-transform: uppercase; margin: 0 0 5px 0; color: #000000;">
                                            Button not working?
                                        </p>
                                        <a href="${link}" style="color: #000000; font-size: 13px; font-weight: 700; word-break: break-all; text-decoration: underline;">
                                            ${link}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td style="padding: 25px; background-color: #000000; text-align: center;">
                            <p style="color: #FFFFFF; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; margin: 0;">
                                EasyThumbnail — Stay Secure.
                            </p>
                        </td>
                    </tr>

                </table>
                <!-- /Card Container -->

                <p style="margin-top: 30px; font-size: 11px; font-weight: 900; color: #CCCCCC; text-transform: uppercase; letter-spacing: 1px;">
                    © 2025 EasyThumbnail Studio
                </p>

            </td>
        </tr>
    </table>
</body>
</html>`;

  try {
    const res = await sendEmail({ to: email, subject, templet });
    console.log(" Reset password Email Sneded Successfully");

    return {
      success: true,
      error: false,
      message: "Reset password Email Sneded Successfully",
      data: {},
    };
  } catch (error) {
    console.log("otp EmaiL Error :", error);

    return {
      success: false,
      error: true,
      message: "reset Password Email Error",
      data: error,
    };
  }
};
