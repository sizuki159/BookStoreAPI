import paypal from 'paypal-rest-sdk'
import Env from '@ioc:Adonis/Core/Env'

paypal.configure({
    'mode': Env.get('PAYPAL_MODE'),
    'client_id': Env.get('PAYPAL_CLIENT_KEY'),
    'client_secret': Env.get('PAYPAL_SECRET_KEY')
});


export default paypal
