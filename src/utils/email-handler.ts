import { createTransport } from 'nodemailer';
import { emailConfiguration, frontConfiguration } from 'config';


const transporter = createTransport({
    service: emailConfiguration.mailService,
    secure: true,
    auth: {
        user: emailConfiguration.mailCli,
        pass: emailConfiguration.mailPass
    }
})

export const sendActivationLink = async (link: string, userMail: string): Promise<void> => {

    const mail = {
        from: emailConfiguration.mailCli,
        to: `<${userMail}>`,
        subject: 'Rejestracja konta w aplikacji Head_hunt',
        text: `Twoje konto zostało dodane do aplikacji Head_hunt przez administratora, w celu aktywacji konta oraz rejestracji
        prosimy kilknąć w link poniżej

        link: ${frontConfiguration.registerLinkPath}/${link}`
    };

    try {
        await transporter.sendMail(mail)
    } catch (err) {
        console.log(err);
        throw new Error('error during mail sending')
    }
}