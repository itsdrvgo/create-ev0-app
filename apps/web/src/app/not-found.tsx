import { GoBackButton } from "@/components/global/buttons";
import { EmptyPlaceholder } from "@/components/ui/empty-placeholder";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page not found",
    description: "The page you are looking for does not exist.",
};

function Page() {
    return (
        <section className="flex h-full min-h-screen items-center justify-center bg-background p-5">
            <EmptyPlaceholder
                title="Page not found"
                description="The page you are looking for does not exist. Please check the URL or go back to the previous page."
                icon="construction"
                endContent={<GoBackButton />}
            />
        </section>
    );
}

export default Page;
