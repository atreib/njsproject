import { getCustomRepository } from 'typeorm';
import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/appointments';
import CreateAppointmentService from '../services/CreateAppointment';
import MiddlewareEnsureAuthenticated from '../middleware/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(MiddlewareEnsureAuthenticated);

appointmentsRouter.get('/', async (req: Request, res: Response) => {
	// podemos pegar o user autenticado graças ao nosso middleware
	// console.log('user: ', req.user);
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);
	const appointments = await appointmentsRepository.find();
	return res.json(appointments);
});

appointmentsRouter.post('/', async (req: Request, res: Response) => {
	try {
		const { provider_id, date } = req.body;
		const parsedDate = parseISO(date);

		const createAppointmentService = new CreateAppointmentService();

		const appointment = await createAppointmentService.execute({
			provider_id,
			date: parsedDate,
		});

		return res.json(appointment);
	} catch (err) {
		return res.status(400).json({
			message: err.message,
		});
	}
});

export default appointmentsRouter;
