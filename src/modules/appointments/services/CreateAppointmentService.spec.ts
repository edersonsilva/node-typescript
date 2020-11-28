import Error from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const CreateAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointment = await CreateAppointment.execute({
      date: new Date(),
      provider_id: '12121212',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12121212');
  });

  it('should not be able to create two appointments on them same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const CreateAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await CreateAppointment.execute({
      date: appointmentDate,
      provider_id: '12121212',
    });

    expect(
      CreateAppointment.execute({
        date: appointmentDate,
        provider_id: '12121212',
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
