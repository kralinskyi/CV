import sgMail from "@sendgrid/mail";
import "dotenv/config";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, verifyToken) => {
  try {
    return await sgMail.send({
      to: email,
      from: process.env.EMAIL_SENDER,
      subject: "Welcome to Contacts Book!",
      html: `To confirm your email please click on the <a href="http://localhost:8080/api/users/verify/${verifyToken}">link</a>`,
      text: `To confirm your email please open the link http://localhost:8080/api/users/verify/${verifyToken}`,
    });
  } catch (error) {
    throw error;
  }
};

export default sendEmail;
