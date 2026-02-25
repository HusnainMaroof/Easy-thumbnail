import { sendEmail } from "../config/bervoConfig.js";

export const sendOtpEmail = async (email, otp, subject) => {
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
            background-color: #FDFDFF;
            font-family: 'Lexend', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #000000;
        }

        /* Mobile Adjustments */
        @media screen and (max-width: 600px) {
            .container { width: 100% !important; border-width: 3px !important; }
            .header-padding { padding: 30px 10px !important; }
            .otp-box { font-size: 32px !important; letter-spacing: 6px !important; }
            .logo-text { font-size: 24px !important; }
            .logo-box-text { font-size: 20px !important; }
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
                    style="width:550px; background:#FFFFFF; border:5px solid #000000; box-shadow: 12px 12px 0px 0px #000000;">
                    
                    <!-- BRAND HEADER (Blue Section with Logo) -->
                    <tr>
                        <td align="center" style="padding: 50px 20px; background-color: #88AAEE; border-bottom: 5px solid #000000;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <!-- "EASY" Text -->
                                    <td style="padding-right: 12px;">
                                        <span class="logo-text" style="color: #000000; font-size: 36px; font-weight: 900; text-transform: uppercase; letter-spacing: -2px;">
                                            Easy
                                        </span>
                                    </td>
                                    <!-- "THUMBNAIL" Tilted Box -->
                                    <td>
                                        <div style="display: inline-block; transform: rotate(-2deg); -ms-transform: rotate(-2deg); -webkit-transform: rotate(-2deg);">
                                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                    <td style="background-color: #F4E041; border: 4px solid #000000; padding: 8px 20px; box-shadow: 4px 4px 0px 0px #000000;">
                                                        <span class="logo-box-text" style="color: #000000; font-size: 30px; font-weight: 900; text-transform: uppercase; font-style: italic; letter-spacing: -1px;">
                                                            Thumbnail
                                                        </span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- CONTENT SECTION -->
                    <tr>
                        <td style="padding: 60px 40px; text-align: center;">
                            <h2 style="font-size: 32px; font-weight: 900; text-transform: uppercase; margin: 0 0 20px 0; letter-spacing: -1px; color: #000000;">
                                Verify Your Email
                            </h2>
                            <p style="font-size: 16px; font-weight: 700; color: #555555; margin-bottom: 40px; line-height: 1.4;">
                                Use the code below to complete your sign-up process.
                            </p>

                            <!-- OTP CODE BOX -->
                            <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 40px;">
                                <tr>
                                    <td align="center" style="background-color: #F4E041; border: 5px solid #000000; padding: 25px 50px; box-shadow: 10px 10px 0px 0px #000000;">
                                        <span class="otp-box" style="font-family: 'Courier New', Courier, monospace; font-size: 48px; font-weight: 900; letter-spacing: 12px; color: #000000;">
                                            ${otp}
                                        </span>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size: 14px; font-weight: 700; color: #888888; margin-bottom: 50px;">
                                This code expires in <span style="color: #FF6B6B;">10 minutes</span>.<br>
                                If you didn’t request this, you can safely ignore this email.
                            </p>

                            <!-- TROUBLE BOX (Mint Green Section) -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center" style="background-color: #A7F3D0; border: 4px solid #000000; padding: 20px;">
                                        <p style="font-size: 13px; font-weight: 900; text-transform: uppercase; margin: 0 0 5px 0; color: #000000;">
                                            Trouble with the code?
                                        </p>
                                        <a href="{{VERIFY_URL}}" style="color: #000000; font-size: 13px; font-weight: 700; word-break: break-all; text-decoration: underline;">
                                            {{VERIFY_URL}}
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
                                EasyThumbnail Studio — Don’t share your code.
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
    const res = await sendEmail({
      to: email,
      subject: subject,
      templet: templet,
    });
    console.log(" otp Email Sneded Successfully", res);
    return res;
  } catch (error) {
    console.log("otp EmaiL Error :", error);

    return "OTP email failed";
  }
};

export const sendResetPassLinkEmail = async (email, link, subject) => {
  let templet = `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset - ChatNow</title>
    <style>
      /* Mobile tweaks */
      @media (max-width:600px){
        .container{width:100%!important; max-width:100%!important; border-radius:0!important}
        .p-40{padding:24px!important}
        .p-32{padding:20px!important}
        .btn{padding:14px 18px!important} /* Mobile button padding */
      }
      /* Avoid iOS auto-styling phone numbers, dates, etc. */
      a[x-apple-data-detectors]{color:inherit!important; text-decoration:none!important}
      /* Dark-mode friendly text colors in some clients */
      :root{color-scheme:light dark; supported-color-schemes:light dark}
    </style>
  </head>
  <!-- Main dark background body -->
  <body style="margin:0; padding:0; background:#0F172A; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; color:#E2E8F0;">
    
    <!-- Preheader (hidden) -->
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
      Click the link to securely reset your ChatNow password.
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td align="center" style="padding:32px 16px;">
          
          <!-- Card Container -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="container" 
            style="width:600px; max-width:600px; background:#1E293B; border-radius:16px; box-shadow:0 8px 30px rgba(0,200,255,0.15); overflow:hidden;">
            
            <!-- HERO SECTION (Indigo/Cyan Gradient) -->
            <tr>
              <td class="p-40" 
                style="padding:40px; 
                       background:#06B6D4; 
                       background-image:linear-gradient(135deg, #4F46E5, #06B6D4); 
                       color:#ffffff;">
                <!--[if mso]>
                  <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:auto;">
                    <v:fill color="#4F46E5" />
                    <v:textbox inset="40px,40px,40px,40px">
                <![endif]-->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="left" style="font-weight:900; font-size:28px; letter-spacing:-0.01em;">
                      ChatNow
                    </td>
                  </tr>
                  
                  <tr>
                    <td align="left" style="padding-top:8px; font-size:16px; color:rgba(255,255,255,0.95);">
                      You requested a password reset. Click the button below to continue.
                    </td>
                  </tr>
                </table>
                <!--[if mso]></v:textbox></v:rect><![endif]-->
              </td>
            </tr>

            <!-- MAIN RESET SECTION -->
            <tr>
              <td class="p-32" style="padding:48px 32px; background:#1F2937;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  
                  <tr>
                    <!-- Main text body -->
                    <td align="center" style="font-size:16px; color:#E2E8F0; line-height:1.6; padding-bottom:32px;">
                      If you initiated this password reset request, please click the button below to set a new password for your ChatNow account.
                    </td>
                  </tr>
                  
                  <tr>
                    <td align="center">
                      <!-- RESET BUTTON (VML fallback for Outlook) -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:auto;">
                        <tr>
                          <td style="border-radius:12px; 
                                     background: linear-gradient(135deg, #0EA5E9, #6366F1); 
                                     box-shadow:0 8px 24px rgba(0,200,255,0.20); 
                                     text-align:center;">
                            <!--[if mso]>
                              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{RESET_URL}}" style="height:56px;v-text-anchor:middle;width:240px;" arcsize="20%" stroke="f" fillcolor="#6366F1">
                                <w:anchorlock/>
                                <center style="color:#ffffff;font-family:sans-serif;font-size:18px;font-weight:700;">
                                  Reset Password
                                </center>
                              </v:roundrect>
                            <![endif]-->
                            <a href="${link}" 
                              target="_blank" 
                              style="font-size:18px; 
                                     font-weight:700; 
                                     color:#ffffff; 
                                     text-decoration:none; 
                                     border-radius:12px; 
                                     padding:16px 30px; 
                                     display:inline-block; 
                                     font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
                                     mso-hide:all;">
                              Reset Password
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <tr>
                    <!-- Security Notice -->
                    <td align="center" style="padding-top:40px; font-size:14px; color:#94A3B8;">
                      If you did not request a password reset, please ignore this email. 
                      Your password will remain unchanged.
                    </td>
                  </tr>

                  <!-- Help -->
                  <tr>
                    <td align="center" style="padding-top:32px; font-size:12px; color:#64748B;">
                      <span style="display:block; padding-bottom:8px;">If the button above doesn't work, copy and paste this link into your browser:</span>
                      <span style="word-break:break-all; color:#06B6D4;">{{RESET_URL}}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding:20px; font-size:13px; color:#64748B; background:#1E293B; border-top:1px solid #334155; text-align:center;">
                ChatNow — For your security, this link will expire shortly.
                &nbsp;•&nbsp;
                <a href="{www.google.com}" style="color:#06B6D4; text-decoration:none;">Contact support</a>
              </td>
            </tr>
          </table>
          <!-- /Card Container -->

        </td>
      </tr>
    </table>
  </body>
</html>`;

  try {
    const res = await sendEmail({
      to: email,
      subject: subject,
      templet: templet,
    });

    console.log("Reset Pass Link Email Sended Successfully", res);
    return "email sended";
  } catch (error) {
    console.log("Reset Pass Link Email Error", error);

    return "Reset Pass Link Email Failed";
  }
};
