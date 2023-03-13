export interface MailerOptions {
    to: string;
    from: string;
    subject: string;
    text: string; // plaintext body
    html: string; // HTML body content
}
