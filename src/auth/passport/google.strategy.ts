import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { UserDto } from '../../users/dto/user.dto';
import { UsersService } from '../../users/user.service';

const CLIENT_ID = '32078188478-467qmu7rurm96q4q2k9r0hbhqter6uvo.apps.googleusercontent.com';
const CLIENT_SECRET = 'QlBW-C3XYmcuAJR7C0ibddBM';
const CALLBACKURL = process.env.NODE_ENV === 'production' ?
    'https://api.comprartir-staging.tk/auth/google/callback/v1' :
    'http://localhost:3000/api/v1/auth/google/callback';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(private readonly authService: AuthService,  private readonly userService: UsersService) {
        super({
            clientID: CLIENT_ID,     // <- Replace this with your client id
            clientSecret: CLIENT_SECRET, // <- Replace this with your client secret
            callbackURL: CALLBACKURL,
            userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
            passReqToCallback: true,
            scope: ['profile email'],
        });
    }

    // tslint:disable-next-line: ban-types
    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {
        try {
            // tslint:disable-next-line: no-console
            console.log('profile: ', profile);

            let user = await this.authService.findUserByMail(profile.emails[0].value);
            if (!user) { // no se encontro usuario
                try {
                    const userRegistered =  {
                            firstName: profile.name.familyName,
                            lastName: profile.name.givenName,
                            email: profile.emails[0].value,
                           /*  password:  Math.random().toString(36).slice(-8), */ // password aleeatorio
                        } as UserDto;
                    user = await this.userService.register(userRegistered);
                } catch (error) {
                    done(error, false);
                }
            }
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    }
}
