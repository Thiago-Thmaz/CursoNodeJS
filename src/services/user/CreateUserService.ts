import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface UseRequest{
    name: string
    email: string
    password: string
}


class CreateUserService{
    async execute({name, email, password}: UseRequest){
        
        // Verificar recebimento de Email..
        if(!email){
            throw new Error("Email incorrect")
        }

        // Verificar se esse Email ja está cadastrado..
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error('User already exists')
        }

        //Entender scripty!!
        const passwordhash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordhash,

            },
            select:{
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}

export { CreateUserService }