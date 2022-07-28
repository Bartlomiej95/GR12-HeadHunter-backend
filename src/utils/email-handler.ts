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

export const sendActivationLink = async (link: string, userMail: string, role: string): Promise<void> => {

    const mail = {
        from: emailConfiguration.mailCli,
        to: `<${userMail}>`,
        subject: 'Rejestracja konta w aplikacji Head_hunt',
        text: `Twoje konto zostało dodane do aplikacji Head_hunt przez administratora, w celu aktywacji konta oraz rejestracji
        prosimy kilknąć w link poniżej

        link: ${frontConfiguration.registerLinkPath}${role}/${link}`
    };

    try {
        await transporter.sendMail(mail)
    } catch (err) {
        console.log(err);
        throw new Error('error during mail sending')
    }
}

export const sendResetLink = async (link: string, userMail: string): Promise<void> => {

    const mail = {
        from: emailConfiguration.mailCli,
        to: `<${userMail}>`,
        subject: 'Reset hasła w aplikacji Head_hunt',
        text: `Przesyłamy link do resetu hasła, jeśli to nie ty wysłałeś prośbę o reset, prosimy o usunięcie tej wiadomości.

        link: ${frontConfiguration.resetLinkPath}${link}`
    };

    try {
        await transporter.sendMail(mail)
    } catch (err) {
        console.log(err);
        throw new Error('error during mail sending')
    }
}