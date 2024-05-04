import { BaseProps } from "../../types/base-props";

export default function MainContainer({ children }: BaseProps) {
    return (
        <section className="w-full flex flex-col gap-8 md:gap-12 p-8 md:px-24 md:py-12 bg-neutral-50 min-h-[calc(100vh-4rem)]">
            {children}
        </section>
    );
}
