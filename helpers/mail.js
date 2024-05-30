import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (email, verifyToken) => {
  try {
    return await sgMail.send({
      to: email,
      from: process.env.EMAIL_SENDER,
      subject: "Welcome to Contacts Book!",
      html: `To confirm your email please click on the <a href="http://localhost:${process.env.PORT}/api/users/verify/${verifyToken}">link</a>`,
      text: `To confirm your email please open the link http://localhost:${process.env.PORT}/api/users/verify/${verifyToken}`,
    });
  } catch (error) {
    throw error;
  }
};

export default sendMail;
