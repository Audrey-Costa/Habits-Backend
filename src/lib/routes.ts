import { prisma } from "./prisma";
import { FastifyInstance } from "fastify";
import dayjs from "dayjs";

interface habitsPostRequest {
  title: string,
  weekDays: number[]
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
}