import { program } from "commander";
import inquirer from "inquirer";
import pkg from "../package.json";
import { DEFAULT_PROJECT_NAME, EV0 } from "./config/const";
import { createEmptyProject, createProject } from "./lib/ev0";
import { showIntro } from "./lib/ev0/helpers";
import { answerSchema } from "./lib/validation/answer";
import { flagsSchema, type FlagsData } from "./lib/validation/flags";
import type { InstallerData } from "./lib/validation/installer";

program
    .name(EV0)
    .description("The best stack for a Full Stack Web Developer")
    .version(pkg.version)
    .option("-d, --default", "use default options")
    .option("-e, --empty", "create an empty project")
    .option("-n, --name <name>", "project name")
    .option("-sba, --supabase-auth", "use Supabase (Auth)")
    .option("-cla, --clerk", "use Clerk (Auth)")
    .option("-sbdb, --supabase-db", "use Supabase (Database)")
    .option("-mongo, --mongodb", "use MongoDB")
    .option("-trpc, --trpc", "use tRPC")
    .option("-ut, --uploadthing", "use UploadThing (File Uploads)")
    .action(async (flags: FlagsData) => {
        showIntro();

        const isFlagsEmpty = Object.keys(flags).length === 0;
        if (isFlagsEmpty) return program.help();

        const { data, error } = flagsSchema.safeParse(flags);

        if (error)
            return console.error(error.issues.map((i) => i.message).join("\n"));

        const {
            default: isDefault,
            empty: isEmpty,
            name,
            // Auth options
            supabaseAuth,
            clerk,
            // Database options
            supabaseDb,
            mongodb,
            // Feature options
            trpc,
            uploadthing,
        } = data;

        if (isDefault) {
            if (Object.keys(flags).length > 1) {
                console.error("You can't use --default flag with other flags");
                return;
            }

            await createProject({
                name: DEFAULT_PROJECT_NAME,
                auth: "supabase",
                db: "supabase",
                features: [],
                git: true,
                install: true,
            });

            return;
        }

        if (isEmpty) {
            await createEmptyProject(name || DEFAULT_PROJECT_NAME);
            return;
        }

        await createProject({
            name: name || DEFAULT_PROJECT_NAME,
            auth: supabaseAuth ? "supabase" : clerk ? "clerk" : "none",
            db: supabaseDb ? "supabase" : mongodb ? "mongodb" : "none",
            features: [
                ...(trpc ? ["trpc"] : []),
                ...(uploadthing ? ["uploadthing"] : []),
            ] as InstallerData["features"],
            git: true,
            install: true,
        });
    });

program
    .command("init")
    .description("Initialize a new project")
    .action(async () => {
        showIntro();

        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Project name:",
                default: DEFAULT_PROJECT_NAME,
            },
            {
                type: "list",
                name: "auth",
                message: "Choose your authentication provider:",
                choices: [
                    { name: "Supabase", value: "supabase" },
                    { name: "Clerk", value: "clerk" },
                    { name: "None", value: "none" },
                ],
                default: "supabase",
            },
            {
                type: "list",
                name: "db",
                message: "Choose your database provider:",
                choices: [
                    { name: "Supabase (Postgres)", value: "supabase" },
                    { name: "MongoDB", value: "mongodb" },
                    { name: "None", value: "none" },
                ],
                default: "supabase",
            },
            {
                type: "checkbox",
                name: "features",
                message: "Select additional features:",
                choices: [
                    { name: "tRPC", value: "trpc" },
                    {
                        name: "UploadThing (File Uploads)",
                        value: "uploadthing",
                    },
                ],
                default: ["tailwind", "shadcn"],
            },
            {
                type: "confirm",
                name: "git",
                message: "Initialize a git repository?",
                default: true,
            },
            {
                type: "confirm",
                name: "install",
                message: "Install dependencies?",
                default: true,
            },
        ]);

        const parsedAnswers = answerSchema.parse(answers);

        await createProject({
            name: parsedAnswers.name,
            auth: parsedAnswers.auth,
            db: parsedAnswers.db,
            features: parsedAnswers.features,
            git: parsedAnswers.git,
            install: parsedAnswers.install,
        });
    });

program.parse(process.argv);
