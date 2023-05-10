import { prisma } from "./prisma";
import { FastifyInstance } from "fastify";
import dayjs from "dayjs";

interface habitsPostRequest {
  title: string,
  weekDays: number[]
}

interface dayGetRequest {
  date: string
}

export async function appRoutes(app: FastifyInstance){
  app.post('/habits', async (request) => {
    const { title, weekDays } = <habitsPostRequest>request.body;

    const today = dayjs().startOf('day').toDate();

    await prisma.habit.create({
      data: {
        title,
        createdAt: today,
        HabitWeekDay: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay
            }
          })
        }
      }
    });

    return;
  });

  app.get('/day', async (request) => {
    const { date } = <dayGetRequest>request.query;
    const week_day = dayjs(date).get('day');
    const dayTime = dayjs(date).toDate();

    const possibleHabits = await prisma.habit.findMany({
      where: {
        createdAt: {
          lte: dayTime
        },
        HabitWeekDay:{
          some: {
            week_day
          }
        }
      }
    });

    const day = await prisma.day.findUnique({
      where: {
        date: dayTime
      },
      include: {
        dayHabits: true
      }
    });

    const completedHabits = day?.dayHabits.map((habit) => {
      return habit.habit_id;
    });


    return {
      possibleHabits,
      completedHabits
    }
  });
}