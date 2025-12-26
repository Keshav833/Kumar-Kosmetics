import nodemailer from "nodemailer";
import { ORDER_CONFIRMATION_TEMPLATE, OTP_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "./emailTemplates.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: `"Kumar Kosmetics" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export const sendVerificationEmail = async (email, otp) => {
    try {
        await sendEmail(
            email,
            "Verify your email",
            OTP_TEMPLATE.replace("{otp}", otp)
        );
        console.log("Verification email sent successfully");
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Error sending verification email");
    }
};

export const sendPasswordResetEmail = async (email, otp) => {
    try {
        await sendEmail(
            email,
            "Reset your password",
            PASSWORD_RESET_TEMPLATE.replace("{otp}", otp)
        );
        console.log("Password reset email sent successfully");
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw new Error("Error sending password reset email");
    }
};

export const sendOrderConfirmationEmail = async (order, user) => {
    try {
        const receiptUrl = `${process.env.CLIENT_URL}/order/success/${order._id}`;

        await sendEmail(
            user.email,
            "Order Confirmation - Kumar Kosmetics",
            ORDER_CONFIRMATION_TEMPLATE
                .replace("{name}", user.name)
                .replace("{orderId}", order._id)
                .replace("{orderDate}", new Date(order.createdAt).toLocaleDateString())
                .replace("{paymentMethod}", order.paymentMethod)
                .replace("{totalAmount}", order.totalAmount)
                .replace("{receiptUrl}", receiptUrl)
        );

        console.log("Order confirmation email sent successfully");
    } catch (error) {
        console.error("Error sending order confirmation email:", error);
        // Don't throw here to avoid failing the order creation process
    }
};
