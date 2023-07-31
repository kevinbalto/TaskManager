import nodemailer from "nodemailer";

export const registerEmail = async(data) => {
    const { email, name, token } = data;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    const info = await transport.sendMail({
        from: '"Task Manager" - <account@taskmanager.com>',
        to: email,
        subject: "Task Manager - Confirm your account",
        text: "Confirm your account",
        html: `<p>Hello ${name}, please confirm your account.</p>
        <p>Your are almost ready! Please confirm your account in the following link:</p>
        <a href="${process.env.FRONTEND_URL}/confirm-account/${token}">Confirm Account</a>
        <p>If you did not create this account, please ignore this message.</p>
        `,
    });
}

export const forgotPassEmail = async(data) => {
    const { email, name, token } = data;
    
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "aa10fa034e69c8",
            pass: "6518c4cc983a74"
        },
    });

    const info = await transport.sendMail({
        from: '"Task Manager" - <account@taskmanager.com>',
        to: email,
        subject: "Task Manager - Reset your password",
        text: "Reset your password",
        html: `<p>Hello ${name}, please reset your password.</p>
        <p>Reset your password by click on the next link:</p>
        <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Reset password</a>
        <p>If you did not request this action, please ignore this message.</p>
        `,
    });
}