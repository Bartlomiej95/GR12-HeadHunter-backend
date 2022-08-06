import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";

export = {
  transport: `smtp://admin123:admin456@localhost:2500`,
  defaults: {
    from: "admin@test.example.com"
  },
  template: {
    dir: "./templates/email",
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  }
}