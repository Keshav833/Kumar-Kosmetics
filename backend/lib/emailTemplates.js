export const ORDER_CONFIRMATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4F46E5, #9333EA); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Order Confirmed!</h1>
  </div>
  <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {name},</p>
    <p>Thank you for shopping with Kumar Kosmetics! Your order has been successfully placed.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4F46E5; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <div style="margin-bottom: 20px;">
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Order Date:</strong> {orderDate}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
        <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
    </div>
    
    <div style="margin-top: 30px; text-align: center;">
        <a href="{receiptUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Receipt & Download PDF</a>
    </div>

    <p style="margin-top: 30px;">
      Best regards,<br>
      Your Kumar Kosmetics Team
    </p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const OTP_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your OTP Code</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4F46E5, #9333EA); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verification Code</h1>
  </div>
  <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Use the following OTP code to verify your action:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4F46E5;">{otp}</span>
    </div>
    <p>This code expires in 5 minutes.</p>
    <p>If you didn't request this code, please ignore this email.</p>
    <p style="margin-top: 30px;">
      Best regards,<br>
      Your Kumar Kosmetics Team
    </p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4F46E5, #9333EA); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. Use the OTP code below to proceed:</p>
    <div style="text-align: center; margin: 30px 0;">
       <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4F46E5;">{otp}</span>
    </div>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't request a password reset, you can safely ignore this email.</p>
    <p style="margin-top: 30px;">
      Best regards,<br>
      Your Kumar Kosmetics Team
    </p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
