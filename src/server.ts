import { app } from './app';
import { env } from './env';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();


app.listen({
	host: '0.0.0.0',
	port: env.PORT
}).then(async ()=>{
	// const user = await prisma.user.create({
	// 	data:{
	// 		name: 'joana',
	// 		email: 'joana@email.com'
	// 	}
	// });
	
	// console.log(user);
	console.log('🆙 Server UP...');
});