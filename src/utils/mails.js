const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const util = require("util");

dotenv.config({
  path: "src/config/mail.env",
});

const queryRec = async (email, name, country, number, role, query) => {
  try {
    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.MAILPASSWORD,
      },
    });

    const options = {
      from: process.env.EMAIL,
      to: email,
      subject: "Web Query From Bharat GPT",
      html: `<div class="container" style="font-family: 'Roboto', sans-serif; margin: 0 auto">
  <div class="head" style="display: flex; justify-content: center">
    <h2 style="margin: 0px 10px; padding: 10px; padding-top: 5px">
      You Receive an Query on Bharat GPT
    </h2>
  </div>
  <div class="row" style="padding: 1rem 0; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; padding-top: 0;">
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <tr>
        <th style="border: 1px solid #e5e5e5; padding: 8px;">Name</th>
        <td style="border: 1px solid #e5e5e5; padding: 8px;">${name}</td>
      </tr>
      <tr>
        <th style="border: 1px solid #e5e5e5; padding: 8px;">Country</th>
        <td style="border: 1px solid #e5e5e5; padding: 8px;">${country}</td>
      </tr>
      <tr>
        <th style="border: 1px solid #e5e5e5; padding: 8px;">Number</th>
        <td style="border: 1px solid #e5e5e5; padding: 8px;">${number}</td>
      </tr>
      <tr>
        <th style="border: 1px solid #e5e5e5; padding: 8px;">Role</th>
        <td style="border: 1px solid #e5e5e5; padding: 8px;">${role}</td>
      </tr>
      <tr>
        <th style="border: 1px solid #e5e5e5; padding: 8px;">Query</th>
        <td style="border: 1px solid #e5e5e5; padding: 8px;">${query}</td>
      </tr>
    </table>
    <p style="padding: 5px; padding-bottom: 0; margin: 0; color: #949090; font-size: 0.8rem;">
      Regards, Team <span style="color: #35B0FC">Bharat GPT</span>
    </p>
  </div>
</div>
`,
    };

    const sendMailPromise = util.promisify(
      smtpTransport.sendMail.bind(smtpTransport)
    );
    await sendMailPromise(options);
    smtpTransport.close();
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { queryRec };
