import fs from "fs";
import path from "path";
import { DEFAULT_PROJECT_NAME } from "@/config/const";
import gs from "gradient-string";
import loading from "loading-cli";
import type { InstallerData } from "../validation/installer";
import {
    constructEnvs,
    generateBaseFiles,
    getPackageManager,
    initializeGit,
    insertBaseFiles,
    insertClerk,
    insertDrizzle,
    insertMongo,
    insertSupabase,
    insertTRPC,
    insertUploadThing,
    installDependencies,
    writeDependencies,
} from "./helpers";

export async function createEmptyProject(name = DEFAULT_PROJECT_NAME) {
    const load = loading(
        "Creating project, please wait until it's done..."
    ).start();

    const dest = process.cwd() + "/" + name;
    fs.mkdirSync(dest);

    await insertBaseFiles(dest);

    load.succeed(
        `Project created successfully! Run 'cd ${name}' to start working on your project.`
    );
}

export async function createProject({
    name,
    auth,
    db,
    features,
    install,
    git,
}: InstallerData) {
    const load1 = loading("Creating project folder...").start();

    const projectPath = path.join(process.cwd(), name);

    const isDirExists = fs.existsSync(projectPath);
    if (isDirExists) {
        load1.fail("A project with the same name already exists!");
        return;
    }

    fs.mkdirSync(projectPath);

    load1.succeed("Project folder created successfully!");

    const load2 = loading("Inserting base files...").start();

    const { foldersToCopy, dependencies, devDependencies } = generateBaseFiles({
        auth,
        db,
        features,
    });

    await insertBaseFiles(projectPath);

    load2.succeed("Base files inserted successfully!");

    const load3 = loading("Writing dependencies...").start();

    const packageJson = await writeDependencies({
        projectPath,
        dependencies,
        devDependencies,
    });

    load3.succeed("Dependencies written successfully!");

    const load4 = loading("Inserting files...").start();

    await insertTRPC(foldersToCopy, projectPath);
    await insertUploadThing(foldersToCopy, projectPath);
    await insertSupabase(foldersToCopy, projectPath);
    await insertClerk(foldersToCopy, projectPath);
    await insertDrizzle(foldersToCopy, projectPath, packageJson);
    await insertMongo(foldersToCopy, projectPath, packageJson);
    await constructEnvs({
        auth,
        db,
        features,
        projectPath,
    });

    load4.succeed("Files inserted successfully!");

    if (git) {
        const load5 = loading("Initializing git repository...").start();

        try {
            await initializeGit(projectPath);
            load5.succeed("Git repository initialized successfully!");
        } catch (error) {
            if (error instanceof Error) {
                if (error.cause === "GIT_NOT_INSTALLED") {
                    load5.fail("Git is not installed on your system!");
                    return;
                } else {
                    load5.fail(
                        "An error occurred while initializing git repository!"
                    );
                    return;
                }
            }
        }
    }

    if (install) {
        const load5 = loading("Installing dependencies...").start();

        const packageManager = getPackageManager();

        await installDependencies({
            packageManager,
            projectPath,
        });

        load5.succeed("Dependencies installed successfully!");
    }

    console.info(
        `${gs("blue", "blue")(">")} Project created successfully! Run 'cd ${name}' to start working on your project.`
    );
}
