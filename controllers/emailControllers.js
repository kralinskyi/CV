const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, "User not found");
  }

  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<p>Hello, thank you for using our service, please confirm your email </p>
    <a target="_blank" href="${PROJECT_URL}/api/users/verify/${user.verificationToken}">Verify email</a>`,
  };

  await sendEmail(verifyEmail);
  return res.status(201).json({
    message: "Verification email sent",
  });
};

export default {
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
