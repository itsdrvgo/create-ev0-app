export function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getAbsoluteURL(path: string = "/") {
    if (process.env.VERCEL_URL)
        return "https://" + process.env.VERCEL_URL + path;
    return "http://localhost:" + (process.env.PORT ?? 3000) + path;
}
