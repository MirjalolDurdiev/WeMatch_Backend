import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class CustomMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordResetEmail(email: string, otp: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Your OTP Code',
      text: `Hi there, \n\nHere is your OTP code for resetting your password: ${otp}. Please use it to proceed with the password reset. \n\nIf you didn’t request this, please ignore this message. \n\nBest regards, \nYour Team`,
    });

    return { message: 'Password reset email sent successfully.' };
  }

  async sendOtpEmail(email: string, otp: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Your Registration OTP Code',
      text: `Hi there, \n\nHere is your OTP code for registration: ${otp}. Please use it to complete your signup. \n\nIf you didn’t request this, please ignore this message. \n\nBest regards, \nYour Team`,
    });

    return { message: 'OTP email sent successfully.' };
  }
}
