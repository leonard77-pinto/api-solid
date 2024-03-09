import { hash } from 'bcryptjs';

interface RegisterUse{
    name: string
    email: string
    password: string
}


export class RegisterUseCase{

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(private _repo: any){}

	async execute(u: RegisterUse){
   
		if(await this._repo.findbyEmail(u.email)){
			throw new Error('Email in use.');
		}
    
		const _hash = await hash(u.password, 6);

		await this._repo.create({
			name: u.name,
			email: u.email,
			password_hash: _hash
		});
	}
}