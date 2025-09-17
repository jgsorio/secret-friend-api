import twillio from "twilio";

class TwilioAdapter
{
  private accoundSid: string;
  private authToken: string;
  constructor() {
    this.accoundSid = process.env.TWILIO_ACCOUNT_SID;
    this.authToken = process.env.TWILIO_AUTH_TOKEN;
  }

  sendSms = async (to: string, body: string) => {
    const client = twillio(this.accoundSid, this.authToken);
    await client.messages.create({
      to: to,
      from: '(667) 446-3521',
      body: body
    });
  }
}

export default new TwilioAdapter();
