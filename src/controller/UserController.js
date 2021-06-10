import signupValidation from "../validations/singupValidation.js"
import JWT from "../modules/jwt.js"
import  nodemailer from  'nodemailer'


class UserController {
    static async signUp(req, res) {
        try {
            const data = await signupValidation.validateAsync(req.body)
            const user = await req.postgres.users.create({
                name: data.name,
                bdate: data.bdate,
                phone: data.phone,
                gender: data.gender == 1 ? "female" : "male",
                email:data.email,
                password:data.password
            })
            let message = await main(data.email,`http://localhost:8075/users/confirm/${user.dataValues.user_id}`)
            if(!message.messageId) throw new Error('Message not send')
            res.status(201).json({
                ok: true,
                message: 'Successfully registered',
                data: user.dataValues
            })
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + " "
            })
        }
    }

    static async confirmGmail(req, res) {
        try {

            await req.postgres.users.update({
                isApproved:true,
            },{
                where:{
                    user_id:req.params.id
                }
            })
            res.status(201).json({
                ok: true,
                message: "Confirmed Successfully",
            })
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + " "
            })
        }
    }
    static async login(req, res) {
        try {
            const user = await req.postgres.users.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!user) {
                throw new Error('User not found!')
            }
            if(!user.dataValues.isApproved) throw new Error('Gmail is not approved!')
            if(!user.dataValues.password==req.body.password) throw new Error('Password is incorrect!')
            const token = JWT.generateToken({
                id:user.dataValues.user_id
            })
            await res.status(201).json({
                ok: true,
                messages: "Logged in",
                token
            })
        } catch (e) {
            res.status(401).json({
                ok: false,
                message: e + " "
            })
        }
    }
}


async function main(to,text){
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'samandarobidovfrd@gmail.com',
            pass: 'rersamandar'
        }
      })
    let info = await transporter.sendMail({
        from: "samandarobidovfrd@gmail.com", // sender address
        to: to, // list of receivers
        subject: "Confirm Email", // Subject line
        text: text, // plain text body
    });
    return info

}


export default UserController
