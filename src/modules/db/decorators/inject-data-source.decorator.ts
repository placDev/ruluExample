import { Inject } from '@nestjs/common';

export const InjectDataSource = () => Inject('DATA_SOURCE');
