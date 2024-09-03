import { Telegraf } from 'telegraf'

export const testBot = async (token) => {
    try{
        let check = false
        const bot = new Telegraf(token)

        bot.on('message', () => {
            console.log('work')
        })

        bot.launch({dropPendingUpdates: true}).catch(() => {
            check = true
            return false
        })

        setTimeout(() => {
            console.log('stop')
            if(check){
               bot.stop() 
            }
        }, 5000)
        return true
    }
    catch(error){
        console.log(error)
    }
}