import { Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';

@Module({
  providers: [NotificacionesService],
  controllers: [NotificacionesController]
})
export class NotificacionesModule {}
