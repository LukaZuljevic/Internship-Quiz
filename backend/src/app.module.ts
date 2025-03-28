import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { CategoryModule } from './category/category.module';
import { QuizQuestionModule } from './quiz-question/quiz-question.module';
import { UserQuizAnswersModule } from './user-quiz-answers/user-quiz-answers.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    UserModule,
    QuizModule,
    QuestionModule,
    CategoryModule,
    QuizQuestionModule,
    UserQuizAnswersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
