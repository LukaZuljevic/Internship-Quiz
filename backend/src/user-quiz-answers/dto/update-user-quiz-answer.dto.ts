import { PartialType } from '@nestjs/mapped-types';
import { CreateUserQuizAnswerDto } from './create-user-quiz-answer.dto';

export class UpdateUserQuizAnswerDto extends PartialType(CreateUserQuizAnswerDto) {}
