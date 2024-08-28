import { Injectable, UnauthorizedException } from '@nestjs/common'
import crypto from 'crypto'
import { AuthDataValidator } from '@telegram-auth/server';
import { urlStrToAuthDataMap } from '@telegram-auth/server/utils';

@Injectable()
export class AuthService {

    // constructor(
        // private usersService: UsersService,
        // private campService: CampsService
    // )

    async login(authData: any){

        const validator = new AuthDataValidator({ botToken: process.env.BOT_TOKEN })

        delete authData['hash']
        const dataCheck: any = []
        for (const key in authData) {
            dataCheck.push(key + '=' + authData[key])
        }
        dataCheck.sort()
        dataCheck.join("\n")
        console.log(dataCheck)
        const data = urlStrToAuthDataMap(dataCheck[0])

        try {
            const user = await validator.validate(data);

            // The data is now valid and you can sign in the user.

            console.log(user);
            return 'ok'
        } catch (error) {
            console.error(error);
            return 'ne ok'
        }

        // const checkHash = authData.hash
        // delete authData['hash']

        // const dataCheck = []

        // for (const key in authData) {
        //     dataCheck.push(key + '=' + authData[key])
        // }
        // dataCheck.sort()
        // dataCheck.join('\n')

        // const secretKey = crypto.createHash('sha256').update(process.env.BOT_TOKEN)

        // const hash = crypto.createHmac('sha256', dataCheck.toString(), secretKey)

        // console.log(hash)
        // console.log(checkHash)

        // if (hash === checkHash) {


        // }

        // const data_check_string = data
        // const secret_key = SHA256(process.env.BOT_TOKEN)
        // if (hex(HMAC_SHA256(data_check_string, secret_key)) == hash) {
        // // data is from Telegram
        // }
    }
}




// var key = 'the shared secret key here';
// var message = 'the message to hash here';

// var hash = crypto.createHmac('sha256', key).update(message);

// // to lowercase hexits
// hash.digest('hex');

// // to base64
// hash.digest('base64');