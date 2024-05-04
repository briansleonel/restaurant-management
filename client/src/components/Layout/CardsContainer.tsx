import { BaseProps } from "../../types/base-props";

export default function CardsContainer({ children }: BaseProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 md:gap-12">
            {children}
        </div>
    );
}
