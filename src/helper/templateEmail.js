export function templateEmailOTP(name, otp) {
  return `Dear ${name}
  <br>,

  Please find below your One Time Password (OTP) to access your account.
  <br>,
  
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
          <td bgcolor="#ffffff" style="border:1px solid #eaeaea; padding:20px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                  <tr>
                      <td style="font-family: Arial, sans-serif; font-size: 16px; color: #333333; text-align:center; padding:10px;">
                          <strong>Your OTP is:</strong>
                      </td>
                  </tr>
                  <tr>
                      <td style="font-family: Arial, sans-serif; font-size: 32px; color: #333333; text-align:center; padding:10px;">
                          <strong>${otp}</strong>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>
  <br>,
  Please note that this OTP is valid only for a limited time and should be used immediately to access your account. Do not share your OTP with anyone else.
    <br>
  If you have any questions or concerns, please do not hesitate to contact us.

    <br>
  Best regards,
  <br>
  
  [VMC Team]`;
}

export function templateEmailResetPassword(name, password) {
  return `
  Dear ${name},
  <br>
  As per your request, we are sending you a new password for your account. Please use the following password to log in to your account:
  <br>
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr>
          <td bgcolor="#ffffff" style="border:1px solid #eaeaea; padding:20px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                  <tr>
                      <td style="font-family: Arial, sans-serif; font-size: 16px; color: #333333; text-align:center; padding:10px;">
                          <strong>Your New Password:</strong>
                      </td>
                  </tr>
                  <tr>
                      <td style="font-family: Arial, sans-serif; font-size: 32px; color: #333333; text-align:center; padding:10px;">
                          <strong>${password}</strong>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>
  <br>
  Please note that for security purposes, we recommend that you change your password immediately after logging in to your account using this new password.
  <br>
  If you have any questions or concerns, please do not hesitate to contact us.
  <br>
  Best regards,
  <br>
  [VMC Team]
  `;
}
