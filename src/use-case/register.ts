import { IRepositoryUser } from '@/repositories/user-repositoy-interface';
import { hash } from 'bcryptjs';
import { EmailExistError } from './erros/email-exist-error';
import { User } from '@prisma/client';

interface RegisterUse{
    name: string
    email: string
    password: string
}

interface RegisterResponse{
	user: User
}

export class RegisterUseCase{

	constructor(private _repo: IRepositoryUser){}

	async execute(u: RegisterUse): Promise<RegisterResponse>{
		const _t = await this._repo.findByEmail(u.email)

		if(_t){
			throw new EmailExistError()
		}
    
		const _hash = await hash(u.password, 6);

		const _ret = await this._repo.create({
			name: u.name,
			email: u.email,
			password_hash: _hash
		});

		return {
			user: _ret
		}
	}
}