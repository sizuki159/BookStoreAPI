import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'

export default class VerifyEmail extends BaseMailer {
  constructor(private user: User, private token: string) {
    super()
  }
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  /**
   * The prepare method is invoked automatically when you run
   * "VerifyEmail.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public prepare(message: MessageContract) {
    message.subject('Chào mừng bạn đến với Sách Việt')
      .to(this.user.email)
      .from('verified@sachviet.top', 'Sách Việt')
      .html(`
      <!-- Change values in [brackets] in the template and pass { {variables} } with API call -->
      <!-- Feel free to adjust it to your needs and delete all these comments-->
      <!-- Also adapt TXT version of this email -->
      <!DOCTYPE html>
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <title></title>
          <!--[if !mso]><!-- -->
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <!--<![endif]-->
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style type="text/css">
            #outlook a {
            padding: 0;
            }
            .ReadMsgBody {
            width: 100%;
            }
            .ExternalClass {
            width: 100%;
            }
            .ExternalClass * {
            line-height: 100%;
            }
            body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            }
            table,
            td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            }
          </style>
          <!--[if !mso]><!-->
          <style type="text/css">
            @media only screen and (max-width:480px) {
            @-ms-viewport {
            width: 320px;
            }
            @viewport {
            width: 320px;
            }
            }
          </style>
          <!--<![endif]-->
          <!--[if mso]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
          <!--[if lte mso 11]>
          <style type="text/css">  .outlook-group-fix {    width:100% !important;  }</style>
          <![endif]-->
          <!--[if !mso]><!-->
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
          <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
          </style>
          <!--<![endif]-->
          <style type="text/css">
            @media only screen and (max-width:595px) {
            .container {
            width: 100% !important;
            }
            .button {
            display: block !important;
            width: auto !important;
            }
            }
          </style>
        </head>
        <body style="font-family: 'Inter', sans-serif; background: #E5E5E5;">
          <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
            <tbody>
              <tr>
                <td valign="top" align="center">
                  <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding:48px 0 30px 0; text-align: center; font-size: 24px; color: #4C83EE;">
                          SachViet.Top
                        </td>
                      </tr>
                      <tr>
                        <td class="main-content" style="padding: 48px 30px 40px; color: #000000;" bgcolor="#ffffff">
                          <table width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                              <tr>
                                <td style="padding: 0 0 24px 0; font-size: 18px; line-height: 150%; font-weight: bold; color: #000000; letter-spacing: 0.01em;">
                                  Xin chào,
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 0 0 10px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                                  Chúng tôi nhận được yêu cầu xác minh tài khoản của bạn: <span style="color: #4C83EE;">${this.user.email}</span>.
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 0 0 16px 0; font-size: 14px; line-height: 150%; font-weight: 700; color: #000000; letter-spacing: 0.01em;">
                                  Nhấn vào liên kết dưới để tiến hành xác minh.
                                </td>
                              </tr>
                              <tr>
                                ${Env.get('DOMAIN_SERVER', 'https://api.sachviet.top')}/verify/email/${this.token}
                              </tr>
                              <tr>
                                <td style="padding: 10px 0 10px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                                  Liên kết xác minh sẽ hết hạn sau 72 tiếng.
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 0 0 60px 0; font-size: 14px; line-height: 150%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                                  Nếu bạn có thắc mắc xin vui lòng liên hệ với chúng tôi qua e-mail: <a href="mailto:support@sachviet.top">support@sachviet.top</a>.
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 0 0 16px;">
                                  <span style="display: block; width: 117px; border-bottom: 1px solid #8B949F;"></span>
                                </td>
                              </tr>
                              <tr>
                                <td style="font-size: 14px; line-height: 170%; font-weight: 400; color: #000000; letter-spacing: 0.01em;">
                                  Best regards, <br><strong>SachViet.Top</strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 24px 0 48px; font-size: 0px;">
                          <!--[if mso | IE]>      
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="vertical-align:top;width:300px;">
                                <![endif]-->
                                <div class="outlook-group-fix" style="padding: 0 0 20px 0; vertical-align: top; display: inline-block; text-align: center; width:100%;">
                                  <span style="padding: 0; font-size: 11px; line-height: 15px; font-weight: normal; color: #8B949F;">UTE Team<br/>Power by UTE
                                </div>
                                </div>
                                <!--[if mso | IE]>      
                              </td>
                            </tr>
                          </table>
                          <![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
      `)
  }
}