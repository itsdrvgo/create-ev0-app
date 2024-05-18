import { cn } from "@/lib/utils";
import { SVGProps } from "react";

export function EV0({
    width,
    height,
    className,
    ...props
}: SVGProps<SVGSVGElement>) {
    return (
        <svg
            id="EV0"
            data-name="EV0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2000 2000"
            height={height || 40}
            width={width || 40}
            className={cn(className, "drop-shadow-md")}
            {...props}
        >
            <path
                fill="#fff"
                d="M1936.2,1014.86,999.56,78.22,62.92,1014.86,214.7,1166.64l.62-.62c6.92,191.22,83.36,380.38,229.33,526.35,306.47,306.47,803.35,306.47,1109.82,0,146-146,222.41-335.13,229.33-526.35l.62.62ZM1585.37,1166a584.38,584.38,0,0,1-171.09,386.17c-229,229-600.4,229-829.44,0A584.33,584.33,0,0,1,413.75,1166H215.32L999.56,381.78,1783.8,1166Z"
            />
        </svg>
    );
}
