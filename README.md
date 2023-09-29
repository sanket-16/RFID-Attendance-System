## RFID Attendance System With Dashboard

### Components Used -

- Raspberry Pi Pico W
- RFID Reader
- RFID Tags
- LED Screen (16\*2)
- Jumper Cables

## Software Used -

- Python
- Node JS
- Typescript
- Next JS
- Next Auth
- Tailwind CSS
- Tanstack React Query
- Prisma
- Shadcn UI
- React Email
- Nodemailer

## Steps to Run the Website -

1.  Install pnpm

        npm install -g pnpm

2.  Clone the repository

        git clone https://github.com/sanket-16/RFID-Attendance-System

3.  Install dependencies

        cd RFID-Attendance-System/web
        pnpm install

4.  Create .env file and put in variables from .env.example .

5.  Create db.sqlite file inside prisma directory.

6.  Run the migration commands for database.

        pnpm dlx prisma migrate dev
        pnpm dlx prisma

7.  Run the application.

        pnpm run dev

## Important Commands

- Check out the database.

        pnpm dlx prisma studio

- After changing schema in any way run the below command.

        pnpm dlx prisma migrate dev

- Add any shadcn ui component.

        pnpm dlx shadcn-ui@latest <component-name>
