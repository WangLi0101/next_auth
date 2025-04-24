import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactoryEmail = async (email: string, token: string) => {
  const data = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA Code:${token} <p/>`,
  });
  return data;
};
