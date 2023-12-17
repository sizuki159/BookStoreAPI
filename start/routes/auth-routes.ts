import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
    Route.post('register', 'AuthController.register')
    Route.post('login', 'AuthController.login')
    Route.post('refresh_token', 'AuthController.refreshToken')

    // Verify Email
    Route.get('/verify/email/:token', 'VerifyEmailController.verify')
    Route.post('/request-verify', 'AuthController.requestEmailVerify')
    Route.get('/check/is-verified', 'VerifyEmailController.checkEmailVerified')

    // Recovery password Email
    Route.post('/verify/email/reset_password', 'VerifyEmailController.verifyResetPassword')

    Route.post('request-recovery', 'AuthController.requestRecovery')
}).prefix('auth')