import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: '1',
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'Admin@gmail.com',
        password: await bcrypt.hash('admin', 10),
        role: Role.Admin,
      },
      {
        id: '2',
        firstName: 'Ante',
        lastName: 'Antic',
        email: 'Ante@gmail.com',
        password: await bcrypt.hash('ante', 10),
      },

      {
        id: '3',
        firstName: 'Mate',
        lastName: 'Matic',
        email: 'Mate@gmail.com',
        password: await bcrypt.hash('mate', 10),
      },

      {
        id: '4',
        firstName: 'Marko',
        lastName: 'Markic',
        email: 'Marko@gmail.com',
        password: await bcrypt.hash('marko', 10),
      },

      {
        id: '5',
        firstName: 'Jure',
        lastName: 'Juric',
        email: 'Jure@gmail.com',
        password: await bcrypt.hash('jure', 10),
      },
    ],
  });

  await prisma.category.createMany({
    data: [
      {
        id: 'Geography',
        title: 'Geography',
        imageUrl:
          'https://thumbs.dreamstime.com/b/placez-des-symboles-de-g%C3%A9ographie-%C3%A9quipements-pour-banni%C3%A8res-web-croquis-d-ensemble-cru-gribouillez-le-type-%C3%A9ducation-136641079.jpg',
      },

      {
        id: 'History',
        title: 'History',
        imageUrl:
          'data:image/jpeg;base64,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jXjPPfPL88cr4vzenrXm54VCDGrQM2WIyRcqZV5gQaUJIiIUljr2222ORz4dwaFufoeW25aMymORkwQXARtSjU2FDZU439MnXVU6I9Ht5brUmuKELk6yszsQPDSDENR8wSMVH7YXCLZypI6qJVaIFnVN3Ug4LbZAyfpU7g7lreFickxoSTuSSoJya+cS4eJtOZJUxn8lK8ec466Tv0/nrfeOXliOCcfhtjKQ0TcxtRzdQDG5P3vzqjdnuKQ2jsyvG+VC4NzbjGNIz8X5tae8soY2CG4u2kYMVjS5lZ20jJwNWB4bkgZI33qTacDDIrNJdoSASjXUhKnyJViM/I1iSunViynBb+Bb4TGWMF2fb2iFsGRnbYK2Tu+K9AtrNEZ2VQGkOpz4sQABk+gAGKrj2dX9nuv41L/aq4iTSoG5wAMk5O3mfE1rGaYyu3KlKVpkpSlApSlApSlApSlApSlApSlApSlArpu7RJUKSIrqeqsAQfoa7qUFX+CmQ5hmdBqUlW94mACCqhjlAR90jGB6gyrLm6TztGrJxy9WCvhkNuD6ZPzqVSg8jn7Oy6i8tuxaW5eHcSMVVmyszFWxp3IxsNhv5xZuGRorsbdSI5vZyMONchDaXBOcJkL3dzud+ley4r4Vrn7cdPdrxy64XHH7Rm3V/ZmVHChwZS5IUp90AaSQdXU+ldt12Wf36JblngVWBCyqs5k07J38AoC3QncDPiK9e019xT24vu1WgziJFRELcsZMjkAONIwQoJP2umOg89vh4dK5PNnbGVIWL3QGM5BYHWwJPmOg9c2lK6OW0aysI4VKxxqgJJIUAZJ6k+ZPnUjFfaUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUH/9k=',
      },

      {
        id: 'Sports',
        title: 'Sports',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbIV0C8SUM7hWYAPGpIMRpxd8DQUudpCu4eg&s',
      },

      {
        id: 'Politics',
        title: 'Politics',
        imageUrl:
          'data:image/jpeg;base64,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',
      },
    ],
  });

  await prisma.quiz.createMany({
    data: [
      {
        id: '1',
        title: 'Geography Quiz',
        categoryId: 'Geography',
      },
      {
        id: '2',
        title: 'History Quiz',
        categoryId: 'History',
      },
      {
        id: '3',
        title: 'Sports trivia',
        categoryId: 'Sports',
      },
      {
        id: '4',
        title: 'Politics Quiz',
        categoryId: 'Politics',
      },
      {
        id: '5',
        title: 'General Quiz 2',
        categoryId: 'Geography',
      },
    ],
  });

  await prisma.question.createMany({
    data: [
      {
        id: '1',
        title: 'What is the capital of France?',
        options: ['Paris', 'Berlin', 'Rome', 'Madrid'],
        type: 'Select',
        categoryId: 'Geography',
        correctAnswer: JSON.stringify({ value: 'Paris' }),
      },
      {
        id: '2',
        title: 'Match the following countries with their continents:',
        options: JSON.stringify({
          firstArray: ['Brazil', 'Egypt', 'Australia', 'Japan'],
          secondArray: ['South America', 'Africa', 'Oceania', 'Asia'],
        }),
        type: 'Match',
        categoryId: 'Geography',
        correctAnswer: JSON.stringify({
          Brazil: 'South America',
          Egypt: 'Africa',
          Australia: 'Oceania',
          Japan: 'Asia',
        }),
      },
      {
        id: '3',
        title: 'Which of these rivers is the longest?',
        options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
        type: 'Select',
        categoryId: 'Geography',
        correctAnswer: JSON.stringify({ value: 'Nile' }),
      },
      {
        id: '4',
        title:
          'Fill in the blank: The ______ Desert is the largest hot desert in the world.',
        type: 'Field',
        categoryId: 'Geography',
        correctAnswer: JSON.stringify({ value: 'Sahara' }),
      },
      {
        id: '5',
        title: 'Order these mountain ranges from shortest to tallest:',
        options: JSON.stringify({
          array: ['Andes', 'Himalayas', 'Alps', 'Rocky Mountains'],
        }),
        type: 'Order',
        categoryId: 'Geography',
        correctAnswer: JSON.stringify({
          order: ['Alps', 'Andes', 'Rocky Mountains', 'Himalayas'],
        }),
      },

      {
        id: '6',
        title: 'Who won the Battle of Waterloo?',
        options: ['Napoleon', 'Wellington', 'Bismarck', 'Nelson'],
        type: 'Select',
        categoryId: 'History',
        correctAnswer: JSON.stringify({ value: 'Wellington' }),
      },
      {
        id: '7',
        title: 'Match the historical figures with their achievements:',
        options: JSON.stringify({
          firstArray: ['Einstein', 'Marie Curie', 'Wright Brothers'],
          secondArray: [
            'Theory of Relativity',
            'Radioactivity Research',
            'First Powered Flight',
          ],
        }),
        type: 'Match',
        categoryId: 'History',
        correctAnswer: JSON.stringify({
          Einstein: 'Theory of Relativity',
          'Marie Curie': 'Radioactivity Research',
          'Wright Brothers': 'First Powered Flight',
        }),
      },
      {
        id: '8',
        title: 'In what year did World War II end?',
        type: 'Number',
        categoryId: 'History',
        correctAnswer: JSON.stringify({ value: 1945 }),
      },
      {
        id: '9',
        title: 'Order these ancient civilizations from oldest to youngest:',
        options: JSON.stringify({
          array: ['Egyptian', 'Greek', 'Roman', 'Mesopotamian'],
        }),
        type: 'Order',
        categoryId: 'History',
        correctAnswer: JSON.stringify({
          order: ['Mesopotamian', 'Egyptian', 'Greek', 'Roman'],
        }),
      },
      {
        id: '10',
        title: 'Select the correct period of the Renaissance:',
        options: [
          '14th-17th Century',
          '18th-19th Century',
          '20th Century',
          '11th-13th Century',
        ],
        type: 'Select',
        categoryId: 'History',
        correctAnswer: JSON.stringify({ value: '14th-17th Century' }),
      },

      {
        id: '11',
        title: 'Which country hosted the 2016 Summer Olympics?',
        options: ['Brazil', 'China', 'USA', 'Australia'],
        type: 'Select',
        categoryId: 'Sports',
        correctAnswer: JSON.stringify({ value: 'Brazil' }),
      },
      {
        id: '12',
        title: 'Match the sports with their countries of origin:',
        options: JSON.stringify({
          firstArray: ['Baseball', 'Cricket', 'Basketball'],
          secondArray: ['USA', 'England', 'USA'],
        }),
        type: 'Match',
        categoryId: 'Sports',
        correctAnswer: JSON.stringify({
          Baseball: 'USA',
          Cricket: 'England',
          Basketball: 'USA',
        }),
      },
      {
        id: '13',
        title: 'Marko Livaja is the ______ player in history.',
        type: 'Field',
        categoryId: 'Sports',
        correctAnswer: JSON.stringify({ value: 'greatest' }),
      },
      {
        id: '14',
        title: 'Order these Olympic sports by their typical event duration:',
        options: JSON.stringify({
          array: [
            'Marathon',
            '100m Sprint',
            'Football Match',
            'Gymnastics Routine',
          ],
        }),
        type: 'Order',
        categoryId: 'Sports',
        correctAnswer: JSON.stringify({
          order: [
            '100m Sprint',
            'Gymnastics Routine',
            'Football Match',
            'Marathon',
          ],
        }),
      },
      {
        id: '15',
        title: 'How many players are on the football field?',
        type: 'Number',
        categoryId: 'Sports',
        correctAnswer: JSON.stringify({ value: 22 }),
      },

      {
        id: '16',
        title: 'Who was the first president of the USA?',
        options: ['Washington', 'Lincoln', 'Jefferson', 'Roosevelt'],
        type: 'Select',
        categoryId: 'Politics',
        correctAnswer: JSON.stringify({ value: 'Washington' }),
      },
      {
        id: '17',
        title: 'Match these political systems with their descriptions:',
        options: JSON.stringify({
          firstArray: ['Democracy', 'Monarchy', 'Dictatorship'],
          secondArray: [
            'Rule by the people',
            'Rule by a king or queen',
            'Rule by a single leader',
          ],
        }),
        type: 'Match',
        categoryId: 'Politics',
        correctAnswer: JSON.stringify({
          Democracy: 'Rule by the people',
          Monarchy: 'Rule by a king or queen',
          Dictatorship: 'Rule by a single leader',
        }),
      },
      {
        id: '18',
        title: 'Fill in the blank: The United Nations was founded in ____.',
        type: 'Number',
        categoryId: 'Politics',
        correctAnswer: JSON.stringify({ value: 1945 }),
      },
      {
        id: '19',
        title:
          'Order these political documents by their historical significance:',
        options: JSON.stringify({
          array: [
            'Magna Carta',
            'US Constitution',
            'UN Charter',
            'Declaration of Independence',
          ],
        }),
        type: 'Order',
        categoryId: 'Politics',
        correctAnswer: JSON.stringify({
          order: [
            'Magna Carta',
            'Declaration of Independence',
            'US Constitution',
            'UN Charter',
          ],
        }),
      },
      {
        id: '20',
        title:
          'Which political ideology emphasizes individual rights and free market economy?',
        options: ['Liberalism', 'Socialism', 'Communism', 'Fascism'],
        type: 'Select',
        categoryId: 'Politics',
        correctAnswer: JSON.stringify({ value: 'Liberalism' }),
      },
    ],
  });
  await prisma.quizQuestion.createMany({
    data: [
      { quizId: '1', questionId: '1' },
      { quizId: '1', questionId: '2' },
      { quizId: '1', questionId: '3' },
      { quizId: '1', questionId: '4' },
      { quizId: '1', questionId: '5' },

      { quizId: '2', questionId: '6' },
      { quizId: '2', questionId: '7' },
      { quizId: '2', questionId: '8' },
      { quizId: '2', questionId: '9' },
      { quizId: '2', questionId: '10' },

      { quizId: '3', questionId: '11' },
      { quizId: '3', questionId: '12' },
      { quizId: '3', questionId: '13' },
      { quizId: '3', questionId: '14' },
      { quizId: '3', questionId: '15' },

      { quizId: '4', questionId: '16' },
      { quizId: '4', questionId: '17' },
      { quizId: '4', questionId: '18' },
      { quizId: '4', questionId: '19' },
      { quizId: '4', questionId: '20' },

      { quizId: '5', questionId: '1' },
      { quizId: '5', questionId: '2' },
      { quizId: '5', questionId: '3' },
      { quizId: '5', questionId: '4' },
      { quizId: '5', questionId: '5' },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
